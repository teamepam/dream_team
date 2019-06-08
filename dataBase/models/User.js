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
        tableName: 'user',
        timestamps: false
    });

    return User;
};
