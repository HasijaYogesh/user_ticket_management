const UserModel = require("../../model/user.js");

const checkUserExists = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await UserModel.findOne({email: email}).lean());
        }
        catch(err) {
            console.log("Error in checkUserExists ==>>> ", err);
            return reject(err)
        } 
    });
}

const checkUserWithId = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await UserModel.findOne({_id: id}).lean());
        }
        catch(err) {
            console.log("Error in checkUserWithId ==>>> ", err);
            return reject(err)
        } 
    });
}


module.exports = {
    checkUserExists,
    checkUserWithId
};