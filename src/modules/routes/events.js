const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv')

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.get('/retrieveevent/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        if (!eventId) {
            return res.status(400).json({ error: "id do evento e necessário" })
        }

        const retrieveEvent = await stripe.v2.core.events.retrieve(eventId)

        res.status(200).json(retrieveEvent)
    } catch(erro) {
        console.log(`Não foi possivel listar a disputa devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao listar a disputa" });
    }
})

router.get('/listevents/:id', async (req, res) => {
    try {
        const eventId = req.params.id
        if (!eventId) {
            return res.status(400).json({ error: "id do evento e necessário" })
        }

        const listEvents = await stripe.v2.core.events.list(eventId);

    }catch(erro) {
        console.log(`Não foi possivel listar os eventos devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao listar os eventos" });
    }
})


module.exports = router;