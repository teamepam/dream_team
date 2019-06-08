module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        count: {
            type: DataTypes.INTEGER,
        },
        product: {
            type: DataTypes.STRING
        },
        status_id: {
            type: DataTypes.INTEGER,
            foreignKey: true
        }


    }, {
        tableName: 'order',
        timestamps: false
    });

    const Status = sequelize.import('./OrderStatus.js');
    const User = sequelize.import('./User.js');
    Order.belongsTo(Status, {foreignKey: 'status_id'});
    Order.belongsTo(User, {foreignKey: 'user_id'});
    return Order;
};
