const express = require('express');
const router = express.Router();
const waitingListAccountController = require('../controllers/waitingListAccountController');

/**
 * @swagger
 * /waiting-list-account:
 *   post:
 *     summary: Add an account to the waiting list
 *     description: Adds a new account to the waiting list with all required information.
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
 *               Status:
 *                 type: string
 *                 description: Current status of the account
 *                 enum: ['Pending', 'Approved', 'Rejected']
 *                 default: 'Pending'
 *               CreatedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Account creation timestamp
 *               UpdatedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Last update timestamp
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
 *                   properties:
 *                     Name:
 *                       type: string
 *                     Phone:
 *                       type: string
 *                     Email:
 *                       type: string
 *                     Status:
 *                       type: string
 *                     CreatedAt:
 *                       type: string
 *                       format: date-time
 *                     UpdatedAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Missing required fields
 */
router.post('/waiting-list-account', waitingListAccountController.create);

module.exports = router;
