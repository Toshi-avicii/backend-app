// This is your test secret API key.
const stripe = require('stripe')(process.env.SK);
const Plan = require('../models/planModel');
const User = require('../models/userModel');


const createSession = async (req, res) => {
    try {
        let userId = req.id;
        let { id } = req.params;

        const user = await User.findById(userId);
        const plan = await Plan.findById(id);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: user.email,
            client_reference_id: plan._id,
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                name: plan.name,
                description: "just a test plan",
                amount: plan.price,
                currency: "inr",
                quantity: 1,
              },
            ],
            mode: 'payment',
            success_url: `${req.protocol}://${req.get("host")}/profile`,
            cancel_url: `${req.protocol}://${req.get("host")}/profile`,
          });

        res.status(200).json({
            status: "success",
            data: session
        })

    } catch(err) {
        return res.status(500).json({
            err: err.message
        })
    }
}

module.exports = {
    createSession
}