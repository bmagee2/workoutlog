const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

// TEST GET
// router.get('/', (req, res) => {
//     res.send('user test route!!');
// });


// ENDPOINT 1 - USER/REGISTER (POST) - CREATE NEW USER
router.post('/register', (req, res) => {
    let username = req.body.user.username;
    let pass = req.body.user.password;

    User.create({
        username: username,
        passwordhash: bcrypt.hashSync(pass, 10)
    })
        .then(
            function createSuccess(user) {

                let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                
                res.json({
                    user: user,
                    message: 'user created',
                    sesssionToken: token
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});


// ENDPOINT 2 - USER/LOGIN (POST) - EXISTING USER LOGIN
router.post('/signin', (req, res) => {
    User.findOne({
        where: {
            username: req.body.user.username
        }
    })
    .then(
        function(user) {
            if(user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
                    if(matches) {
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: " authenticated success!",
                            sesssionToken: token
                        });
                    } else {
                        res.status(502).send({error: "didn't match. try again."});
                    }
                });
            } else {
                res.status(500).send({error: "who are you? failed to authenticate"});
            }
        },
        function(err) {
            res.status(501).send({error: "sorry, didn't work at all."});
        }
    );
});



module.exports = router;