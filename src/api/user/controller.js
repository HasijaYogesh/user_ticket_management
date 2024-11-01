const UserModel = require("../../model/user");
const {checkUserExists, checkUserWithId} = require("./service.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signUp = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;

        if(!email || !password || email == "" || password == "") {
            return res.status(400).send({
                status: false,
                message: "Email and password are required!"
            });
        }

        const alreadyExists = await checkUserExists(email);

        if(alreadyExists) {
            return res.status(400).send({
                status: false,
                message: "User already exists!"
            });
        }
        
        const newPassword = await bcrypt.hash(password, 10);
        const saveObj = new UserModel({
            name: name,
            email: email,
            password: newPassword
        });

        await saveObj.save();

        return res.status(200).send({
            status: true, 
            message: "User signup success, please login to continue"
        });
    }
    catch(err) {
        return res.status(500).send({
            status: false, message: err
        });
    }
};


const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        if(!email || !password || email == "" || password == "") {
            return res.status(400).send({
                status: false,
                message: "Email and password are required!"
            });
        }

        const alreadyExists = await checkUserExists(email);

        if(!alreadyExists) {
            return res.status(400).send({
                status: false,
                message: "User doen not exists!"
            });
        }
        
        const comparePassword = await bcrypt.compare(password, alreadyExists.password);

        if(!comparePassword) {
            return res.status(400).send({
                status: false,
                message: "Invalid password, please try again!"
            });
        }

        const token = jwt.sign({ id: alreadyExists._id, name: alreadyExists.name, email: alreadyExists.email }, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE});
        delete alreadyExists.password;

        return res.status(200).send({
            status: true, 
            message: "User login success",
            data: {
                token: token,
                user: alreadyExists
            }
        });
    }
    catch(err) {
        return res.status(500).send({
            status: false, message: err
        });
    }
};

const profile = async (req, res, next) => {
    try {
        const id = req.decoded.id;

        const userData = await checkUserWithId(id);

        if(!userData) {
            return res.status(400).send({
                status: false,
                message: "User does not exists!"
            });
        }
        delete userData.password
        
        return res.status(200).send({
            status: true, 
            message: "User profile success",
            data: {
                user: userData
            }
        });
    }
    catch(err) {
        return res.status(500).send({
            status: false, message: err
        });
    }
};

module.exports = {
    signUp,
    login,
    profile
};