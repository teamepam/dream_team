module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        count: {
            type: DataTypes.INTEGER,
        },
        product: {
            type: DataTypes.STRING
        },
        status_id: {
            type: DataTypes.INTEGER
        }
    }, {
        tableName: 'order',
        timestamps: false
    });

    return Order;
};
