const express = require('express');
const app = express();
const swaggerize = require('swaggerize-express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');

require('dotenv').config();
const dataBase = require('./dataBase').getInstance();
dataBase.setModels();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


const program = require('commander');

program
    .version('0.1.0')
    .option('-p, --peppers', 'Add peppers')
    .option('-P, --pineapple', 'Add pineapple')
    .option('-b, --bbq-sauce', 'Add bbq sauce')
    .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
    .parse(process.argv);

console.log('you ordered a pizza with:');
if (program.peppers) console.log('  - peppers');
if (program.pineapple) console.log('  - pineapple');
if (program.bbqSauce) console.log('  - bbq');
console.log('  - %s cheese', program.cheese);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(swaggerize({
    api: path.resolve('./config/swagger.json'),
    handlers: path.resolve('./routes')
}));


const csvParse = require('./helpers/csvParse');

csvParse('./testdata/orders.csv');

app.listen(3000, err => {
    err ? console.log(err) : console.log('listening 3000...');
});
