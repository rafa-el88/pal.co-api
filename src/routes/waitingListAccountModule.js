const express = require('express');
const router = express.Router();
const waitingListAccountController = require('../controllers/waitingListAccountController');

/**
 * @swagger
 * /waiting-list-account:
 *   post:
 *     summary: Add an account to the waiting list
 *     description: Adds a new account to the waiting list with Name, Phone, and Email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 description: Name of the account
 *               Phone:
 *                 type: string
 *                 description: Phone number of the account
 *               Email:
 *                 type: string
 *                 description: Email address of the account
 *     responses:
 *       201:
 *         description: Account added to waiting list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   description: Account data
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
router.post('/waiting-list-account', waitingListAccountController.create);

module.exports = router;
