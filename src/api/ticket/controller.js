const TicketModel = require("../../model/ticket.js");
const { TicketStatus } = require("../../utils/constant.js");

const raise = async (req, res, next) => {
    try {
        const userId = req.decoded.id
        const { topic, content } = req.body;

        if(!topic || !content) {
            return res.status(400).send({
                status: false,
                message: "Topic and content are required!"
            });
        }

        const saveObj = new TicketModel({
            userId: userId,
            topic: topic,
            content: content,
            status: TicketStatus.PENDING
        });

        await saveObj.save();

        return res.status(200).send({
            status: true, 
            message: "Ticket raised successfully"
        });
    }
    catch(err) {
        return res.status(500).send({
            status: false, message: err
        });
    }
};


const getAll = async (req, res, next) => {
    try {
        const userId = req.decoded.id
        const pageNumber = req.body.pageNumber ? req.body.pageNumber : 1;
        const perPage = req.body.perPage ? req.body.perPage : 10; 
        
        const skipRecord = (pageNumber - 1) * perPage

        const total = await TicketModel.find({userId: userId}).countDocuments();
        const ticket = await TicketModel.find({userId: userId}).skip(skipRecord).limit(perPage).lean();

        return res.status(200).send({
            status: true, 
            message: "Ticket get successfully",
            data: {
                total: total,
                ticket: ticket
            }
        });
    }
    catch(err) {
        return res.status(500).send({
            status: false, message: err
        });
    }
};

const getById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const ticket = await TicketModel.findOne({_id: id}).lean();

        if(!ticket) {
            return res.status(400).send({
                status: false,
                message: "No ticket found with requested id!"
            });
        }

        return res.status(200).send({
            status: true, 
            message: "Ticket get successfully",
            data: {
                ticket: ticket
            }
        });
    }
    catch(err) {
        return res.status(500).send({
            status: false, message: err
        });
    }
};

const deleteById = async (req, res, next) => {
    try {
        const id = req.params.id;

        const ticket = await TicketModel.findOne({_id: id}).lean();

        if(!ticket) {
            return res.status(400).send({
                status: false,
                message: "No ticket found with requested id!"
            });
        }

        await TicketModel.findOneAndDelete({_id: id}).lean();

        return res.status(200).send({
            status: true, 
            message: "Ticket deleted successfully",
            data: {
                ticket: ticket
            }
        });
    }
    catch(err) {
        return res.status(500).send({
            status: false, message: err
        });
    }
};

const update = async (req, res, next) => {
    try {
        const { id, status } = req.body;

        if(!id || !status) {
            return res.status(400).send({
                status: false,
                message: "Ticket id and status are required!"
            });
        }

        let ticket = await TicketModel.findOne({_id: id}).lean();

        if(!ticket) {
            return res.status(400).send({
                status: false,
                message: "No ticket found with requested id!"
            });
        }

        const statusArray = [TicketStatus.PENDING, TicketStatus.RESOLVED, TicketStatus.REJECTED]

        if (!(statusArray.includes(status))) {
            return res.status(400).send({
                status: false,
                message: "Invalid status type!"
            });
        }

        ticket = await TicketModel.findOneAndUpdate({_id: id}, {status: status},{new: true}).lean();

        return res.status(200).send({
            status: true, 
            message: "Ticket updated successfully",
            data: {
                ticket: ticket
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
    raise,
    getAll,
    getById,
    deleteById,
    update
};