module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.BOOLEAN
        }
    }, {
        tableName: 'users',
        timestamps: false
    });

    return User;
};