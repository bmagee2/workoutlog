// ENV
require('dotenv').config();

// EXPRESS
const express = require('express');
const app = express();

// CONTROLLERS
const user = require('./controllers/userController');
const log = require('./controllers/logController');

// DATABASE
const sequelize = require('./db');
sequelize.sync();
app.use(express.json());
app.use(require('./middleware/headers'));

// ROUTES
app.use('/user', user);
app.use(require('./middleware/validate-session'));
app.use('/log', log); // THIS WAS GIVING AN ERROR WHEN LOGCONTROLLER VARIABLES/IMPORTS & module.exports = router; WASN'T IN THERE


// CONSOLE LOG TEST
app.listen(7000, function() {
    console.log('this is working! working on 7000')
});

// POSTMAN TEST
app.use('/api/test', (req, res) => {
    res.send("data from the /api/test endpoint. from the server.");
});