const Sequelize = require('sequelize');
const sequelize = new Sequelize('assignment_workoutlog', 'postgres', 'casas1899DYWafterTHEdance', {
    host: 'localhost',
    dialect: 'postgres'
})

sequelize.authenticate()
    .then(() => console.log('postgres database is connected'))
    .catch(err => console.log(err))

module.exports = sequelize;    