const express = require('express');
const bookingRouter = express.Router();
const protectRoute2  = require('../middlewares/protectRoute2');
const { createSession } = require('../controllers/paymentController');

bookingRouter.post('../public/index.html', protectRoute2, createSession);
bookingRouter.get('/createSession', async function(req, res) { 
    res.sendFile('../public/checkout.html')
});

module.exports = bookingRouter;