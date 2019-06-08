const csv = require('csvtojson');

module.exports = (csvFilePath) => {
    return csv()
        .fromFile(csvFilePath)
        .then((jsonObj) => {
            return jsonObj;
        });
};