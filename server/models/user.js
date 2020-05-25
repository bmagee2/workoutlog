// PIE SERVER EXAMPLE
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        passwordhash: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return User;
}

// MODULES EXAMPLE

// module.exports = function (sequelize, DataTypes) {
//     return sequelize.define('user', {
//         username: DataTypes.STRING,
//         passwordhash: DataTypes.STRING
//     });
// };