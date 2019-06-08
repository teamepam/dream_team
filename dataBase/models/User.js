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


    const Sex = sequelize.import('./Sex.js');
    User.belongsTo(Sex, {foreignKey: 'sex_id'});
    return User
};
