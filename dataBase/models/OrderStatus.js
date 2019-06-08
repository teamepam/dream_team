module.exports = (sequelize, DataTypes) => {
    const OrderStatus = sequelize.define('OrderStatus', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        product: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'status',
        timestamps: false
    });

    return OrderStatus;
};
