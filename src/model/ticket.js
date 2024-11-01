const mongoose = require('mongoose');
 
const TicketSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    default: null
  },
  topic: {
    type: String,
    default: ""
  },
  content: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: ""
  }
}, { timestamps: true });

const TicketModel = mongoose.model("ticket", TicketSchema);
module.exports = TicketModel;