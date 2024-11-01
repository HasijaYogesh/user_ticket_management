const mongoose = require('mongoose');
 
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    default: ""
  },
  password: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;