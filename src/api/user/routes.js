const express = require('express'); //import express
const { checkToken } = require("../../middleware/auth.js");

const router  = express.Router(); 

const userController = require('./controller.js');

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Returns a greeting message
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello World!
 */
router.post('/signup', userController.signUp); 
router.post('/login', userController.login);
router.get('/profile', checkToken, userController.profile);

module.exports = router;