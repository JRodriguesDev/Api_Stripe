const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.post('/createportalsession', async (req, res) => {
    try {
        const {customerJson} = req.body
        if (!customerJson) {
            return res.status(400).json({ error: "JSON do ciente e necessário" })
        }

        const createPortalSession = await stripe.billingPortal.sessions.create(customerJson)

        res.status(200).json(createPortalSession)
    }catch(erro) {
        console.log(`Não foi possivel criar o portal do cliente devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar o portal do cliente" });
    }
})


module.exports = router;