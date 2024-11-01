const jwt = require('jsonwebtoken');


const checkToken = async (req, res, next) => {
    try {

        let token = req.headers.authorization;

        if(token) {
            token = token.replace("Bearer ","");

            jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=> {
                if (err) {
                    res.status(401).send({ success: false, message: "Failed to authenticate user." });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        }
        else {
            res.status(401).send({ success: false, message: "Not authorised!" })
        }
    }
    catch(err) {
        console.log("checkToken ==>>", err);
        res.status(401).send({ success: false, message: "Not authorised!" })
    }
};


module.exports = {
    checkToken
};