const csv = require('csvtojson');

module.exports = (csvFilePath) => {
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            return jsonObj;
        });
};