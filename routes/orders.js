const dataBase = require('../dataBase').getInstance();

module.exports = {
    async get (req, res, next) {
        const Order = dataBase.getModel('Orders');
        const orders = await Order.findAll({});
        res.json(orders);
    }
};