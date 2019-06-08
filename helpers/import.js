const db = require('../dataBase').getInstance();
const csv = require('./csvParse');

db.setModels();

function importUsers(filename) {
    return csv(filename).then(users => {
        const UserModel = db.getModel('User');
        return UserModel.destroy({
            truncate: { cascade: true }
        }).then(() => {
            return Promise.all(users.map(({ userId: id, name, status }) => {
                return UserModel.create({
                    id,
                    name,
                    status: status === 'active',
                });
            }));
        });
    });
}

function importOrders(fileName) {
    return csv(fileName).then(Orders => {
        const orderModel = db.getModel('Orders');
        const orderStatus = db.getModel('OrderStatus');
        return orderModel.destroy({
            truncate: { cascade: true }
        }).then(() => {
            return Promise.all(Orders.map(({
                userId,
                quantity,
                product,
                status,
            }) => {
                // create if not exists order status]
                const status_id = 1;
                return orderModel.create({
                    user_id: userId,
                    count: quantity,
                    product,
                    status_id,
                });
            }));
        });
    });
}

// importUsers('./testdata/users.csv')
//     .then(() => console.log('Users imported successfully'))
//     .catch(e => console.log(e));

// importOrders('./testdata/orders.csv')
//     .then(() => console.log('Orders imported successfully'))
//     .catch(e => console.log(e));

module.exports = {
    importOrders,
    importUsers,
}