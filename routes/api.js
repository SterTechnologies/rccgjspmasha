const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/donate', async (req, res) => {
    const { amount, token } = req.body;
    const charge = await stripe.charges.create({
        amount: amount * 100, // Convert to cents
        currency: 'usd',
        source: token,
        description: 'Donation to RCCG Jesus Sanctuary Parish'
    });
    res.json({ success: true, charge });
});

module.exports = router;
