const Sequalize = require('sequelize');
const fs = require('fs');
const { resolve } = require('path');

module.exports = (() => {
    let instance;

    function initConnection() {

        const client = new Sequalize('epam', 'user', 'user', {
            host: 'localhost',
            dialect: 'mysql',
            insecureAuth: true
        });
        let models = {};

        function getModels() {
            fs.readdir('./dataBase/models', (err, files) => {
                files.forEach(file => {
                    const [modelName] = file.split('.');
                    models[modelName] = client.import(resolve(`./dataBase/models/${modelName}`))
                });
            });
        }

        return {
            getModel: modelName => models[modelName],
            setModels: () => getModels()
        };
    }

    return {
        getInstance: () => {
            if (!instance) instance = initConnection();
            return instance;
        }
    }
})();