const express = require('express');
const app = express();

require('dotenv').config();
const dataBase = require('./dataBase').getInstance();
dataBase.setModels();

const swaggerize = require('swaggerize-express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./config/swagger.json');
const {importOrders, importUsers} = require('./helpers/import');



app.use(express.json());
app.use(express.urlencoded({extended: true}));


const program = require('commander');

program
    .version('0.1.0')
    .option('-u, --users', 'Add users to DB')
    .option('-o, --orders', 'Add orders ti db')
    .parse(process.argv);

if (program.users) {
    console.log('  ADD USERS  ....');
    const [,,fileName] = process.argv;
    console.log(fileName);
    importUsers(fileName)
}

if (program.orders) {
    console.log('  ADD ORDERS  ....');
    const [,,fileName] = process.argv;
    console.log(fileName);
    importOrders(fileName)
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(swaggerize({
    api: path.resolve('./config/swagger.json'),
    handlers: path.resolve('./routes')
}));


app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const csvParse = require('./helpers/csvParse');

csvParse('./testdata/orders.csv');

app.listen(3000, err => {
    err ? console.log(err) : console.log('listening 3000...');
});
