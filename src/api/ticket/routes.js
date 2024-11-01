const express = require('express'); //import express
const { checkToken } = require("../../middleware/auth.js");

const router  = express.Router();

const ticketController = require('./controller.js');

router.post('/raise', checkToken, ticketController.raise);
router.post('/getAll', checkToken, ticketController.getAll);
router.get('/getById/:id', checkToken, ticketController.getById);
router.delete('/deleteById/:id', checkToken, ticketController.deleteById);
router.post('/update', checkToken, ticketController.update);

module.exports = router;