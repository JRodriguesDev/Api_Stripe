const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv')

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.post('/createcustomsession/:id', async (req, res) => {
    try {
        const custumerId = req.params.id;
        const {components} = req.body

        if (!custumerId) {
            return res.status(400).json({ error: "Id do cliente e necessário" });
        }

        const createCostumerSession = await stripe.customerSessions.create({
            customer: custumerId, components
        })

        res.status(200).json(createCostumerSession);
    }catch(erro) {
        console.log(`Não foi possivel criar sessao devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar o sessao" });
    }
})

module.exports = router;