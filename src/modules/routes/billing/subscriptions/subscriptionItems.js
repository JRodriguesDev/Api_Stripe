const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.post('/createsubscriptionitem', async (req, res) => {
    try {
        const {subscriptionItemJson} = req.body
        if (!subscriptionItemJson) {
            return res.status(400).json({ error: "JSON do item assinatura e necessário" })
        }

        const createSubscriptionItem = await stripe.subscriptionItems.create(subscriptionItemJson)

        res.status(200).json(createSubscriptionItem)
    } catch(erro) {
        console.log(`Não foi possivel criar um item assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar um item assinatura" });
    }
})

router.post('/createsubscriptionitem/:id', async (req, res) => {
    try {
        const subscriptionItemId = req.params.id
        const {subscriptionItemJson} = req.body
        if (!subscriptionItemJson || !subscriptionItemId) {
            return res.status(400).json({ error: "ID e JSON do item assinatura e necessário" })
        }

        const updateSubscriptionItem = await stripe.subscriptionItems.update(subscriptionItemId ,subscriptionItemJson)

        res.status(200).json(updateSubscriptionItem)
    } catch(erro) {
        console.log(`Não foi possivel atualizar um item assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar um item assinatura" });
    }
})


router.get('/retrievesubscriptionitem/:id', async (req, res) => {
    try {
        const subscriptionItemId = req.params.id
        if (!subscriptionItemId) {
            return res.status(400).json({ error: "ID do item assinatura e necessário" })
        }

        const retrieveSubscriptionItem = await stripe.subscriptionItems.retrieve(subscriptionItemId)

        res.status(200).json(retrieveSubscriptionItem)
    } catch(erro) {
        console.log(`Não foi possivel recuperar um item assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar um item assinatura" });
    }
})

router.get('/listsubscriptionitem', async (req, res) => {
    try {
        const {subscriptionItemJson} = req.body
        if (!subscriptionItemJson) {
            return res.status(400).json({ error: "JSON do item assinatura e necessário" })
        }

        const listSubscriptionItem = await stripe.subscriptionItems.list(subscriptionItemJson)

        res.status(200).json(listSubscriptionItem)
    } catch(erro) {
        console.log(`Não foi possivel listar os items das assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao listar os items das assinatur" });
    }
})


router.delete('/deletesubscriptionitem/:id', async (req, res) => {
    try {
        const subscriptionItemId = req.params.id
        if (!subscriptionItemId) {
            return res.status(400).json({ error: "ID do item assinatura e necessário" })
        }

        const deleteSubscriptionItem = await stripe.subscriptionItems.del(subscriptionItemId)

        res.status(200).json(deleteSubscriptionItem)
    } catch(erro) {
        console.log(`Não foi possivel deletar os items das assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao deletar os items das assinatur" });
    }
})

module.exports = router;