const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    const token = req.headers.authorization;        

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {   
        if(!err && decoded){
            User.findOne({
                where: {
                    id: decoded.id
                }
            }, console.log(decoded))
            .then(user => {
                if(!user) throw 'err'
                req.user = user;

                next();    
            })
            .catch(err => next(err))
        } else {
            req.errors = err;
            return res.status(500).send('not authorized')
        }
    })
}

module.exports = validateSession;

// module.exports = function(req, res, next) {
//     if (req.method == 'OPTIONS') {
//         next()
//     } else {
//         let sessionToken = req.headers.authorization;
//         console.log(sessionToken)
//         if(!sessionToken) return res.status(403).send({auth: false, message: 'no token provided'});
//         else {
//             jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
//                 if(decoded){
//                     User.findOne({
//                         where: {
//                             id: decoded.id
//                         }
//                     })
//                     .then(user => {
//                         req.user = user;
//                         next();
//                     },
//                     function() {
//                         res.status(401).send({error: 'no authorizaiton'});
//                     });
//                 } else {
//                     res.status(400).send({error: 'not authorized'});
//                 }
//             });
//         }
//     }
// }


