const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.post('/createsubscription', async (req, res) => {
    try {
        const {subscriptionJson} = req.body
        if (!subscriptionJson) {
            return res.status(400).json({ error: "SON da assinatura e necessário" })
        }

        const createSubscription = await stripe.subscriptions.create(subscriptionJson)

        res.status(200).json(createSubscription)
    } catch(erro) {
        console.log(`Não foi possivel criar uma assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar uma assinatura" });
    }
})

router.post('/updatesubscription/:id', async (req, res) => {
    try {
        const subscriptionId = req.params.id
        const subscriptionJson = req.body
        if (!subscriptionId || !subscriptionJson) {
            return res.status(400).json({ error: "ID e JSON da assinatura e necessário" })
        }

        const updateSubscription = await stripe.subscriptions.update(subscriptionId, subscriptionJson)

        res.status(200).json(updateSubscription)
    } catch(erro) {
        console.log(`Não foi possivel atualizar uma assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar uma assinatura" });
    }
})

router.get('/retrievesubscription/:id', async (req, res) => {
    try {
        const subscriptionId = req.params.id
        if (!subscriptionId) {
            return res.status(400).json({ error: "ID da assinatura e necessário" })
        }

        const retrieveSubscription = await stripe.subscriptions.retrieve(subscriptionId)

        res.status(200).json(retrieveSubscription)
    } catch(erro) {
        console.log(`Não foi possivel recuperar uma assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar uma assinatura" });
    }
})

router.get('/listsubscription', async (req, res) => {
    try {
        /*const {subscriptionJson} = req.body
        if (!subscriptionJson) {
            return res.status(400).json({ error: "JSON da assinatura e necessário" })
        }*/

        const listSubscription = await stripe.subscriptions.list()

        res.status(200).json(listSubscription)
    } catch(erro) {
        console.log(`Não foi possivel listar uma assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao listar uma assinatura" });
    }
})

router.delete('/cancelsubscription/:id', async (req, res) => {
    try {
        const subscriptionId = req.params.id
        if (!subscriptionId) {
            return res.status(400).json({ error: "ID da assinatura e necessário" })
        }

        const cancelSubscription = await stripe.subscriptions.cancel(subscriptionId)

        res.status(200).json(cancelSubscription)
    } catch(erro) {
        console.log(`Não foi possivel cancelar uma assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao cancelar uma assinatura" });
    }
})

router.post('/resumesubscription/:id', async (req, res) => {
    try {
        const subscriptionId = req.params.id
        const {subscriptionJson} = req.body
        if (!subscriptionId || !subscriptionJson) {
            return res.status(400).json({ error: "ID e JSON da assinatura e necessário" })
        }

        const resumeSubscription = await stripe.subscriptions.resume(subscriptionId, subscriptionJson)

        res.status(200).json(resumeSubscription)
    } catch(erro) {
        console.log(`Não foi possivel resumir uma assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao resumir uma assinatura" });
    }
})

router.get('/searchsubscription', async (req, res) => {
    try {
        const searchsubscriptionQiery = req.query
        if (!searchsubscriptionQiery) {
            return res.status(400).json({ error: "QUERY da assinatura e necessário" })
        }

        const searchSubscription = await stripe.subscriptions.search(searchsubscriptionQiery)

        res.status(200).json(searchSubscription)
    } catch(erro) {
        console.log(`Não foi possivel buscar uma assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao buscar uma assinatura" });
    }
})


module.exports = router;