const dataBase = require('../dataBase').getInstance();

module.exports = {
    async get (req, res, next) {
        const Order = dataBase.getModel('Orders');
        const User = dataBase.getModel('User');
        const Status = dataBase.getModel('OrderStatus');

        const orders = await Order.findAll({
            include: [User]
        });
        res.json(orders);
    }
};
