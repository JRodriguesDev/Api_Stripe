const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.post('/createsubscriptionschedule', async (req, res) => {
    try {
        const {subscriptionScheduleJson} = req.body
        if (!subscriptionScheduleJson) {
            return res.status(400).json({ error: "JSON do conograma da assinatura e necessário" })
        }

        const createSubscriptionItemSchedule = await stripe.subscriptionSchedules.create(subscriptionScheduleJson)

        res.status(200).json(createSubscriptionItemSchedule)
    } catch(erro) {
        console.log(`Não foi possivel criar um conograma assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar um conograma assinatura" });
    }
})

router.post('/updatesubscriptionschedule/id', async (req, res) => {
    try {
        const subscriptionScheduleId = req.params.id
        const {subscriptionScheduleJson} = req.body
        if (!subscriptionScheduleJson || !subscriptionScheduleId) {
            return res.status(400).json({ error: "JSON e ID do conograma da assinatura e necessário" })
        }

        const updateSubscriptionItemSchedule = await stripe.subscriptionSchedules.update(subscriptionScheduleJson, subscriptionScheduleId)

        res.status(200).json(updateSubscriptionItemSchedule)
    } catch(erro) {
        console.log(`Não foi possivel atualizar um conograma assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar um conograma assinatura" });
    }
})

router.get('/retrievesubscriptionschedule/id', async (req, res) => {
    try {
        const subscriptionScheduleId = req.params.id
        if (!subscriptionScheduleId) {
            return res.status(400).json({ error: "ID do conograma da assinatura e necessário" })
        }

        const retrieveSubscriptionItemSchedule = await stripe.subscriptionSchedules.retrieve(subscriptionScheduleId)

        res.status(200).json(retrieveSubscriptionItemSchedule)
    } catch(erro) {
        console.log(`Não foi possivel recuperar um conograma assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar um conograma assinatura" });
    }
})

router.get('/listsubscriptionschedule', async (req, res) => {
    try {
        const {subscriptionScheduleJson} = req.body
        if (!subscriptionScheduleJson) {
            return res.status(400).json({ error: "JSON do conograma da assinatura e necessário" })
        }

        const listSubscriptionItemSchedule = await stripe.subscriptionSchedules.list(subscriptionScheduleJson)

        res.status(200).json(listSubscriptionItemSchedule)
    } catch(erro) {
        console.log(`Não foi possivel listar um conograma assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao listar um conograma assinatura" });
    }
})

router.post('/cancelsubscriptionschedule/:id', async (req, res) => {
    try {
        const subscriptionScheduleId = req.params.id
        if (!subscriptionScheduleId) {
            return res.status(400).json({ error: "ID do conograma da assinatura e necessário" })
        }

        const cancelSubscriptionItemSchedule = await stripe.subscriptionSchedules.cancel(subscriptionScheduleId)

        res.status(200).json(cancelSubscriptionItemSchedule)
    } catch(erro) {
        console.log(`Não foi possivel cancelar um conograma assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao cancelar um conograma assinatura" });
    }
})


router.post('/releasesubscriptionschedule/:id', async (req, res) => {
    try {
        const subscriptionScheduleId = req.params.id
        if (!subscriptionScheduleId) {
            return res.status(400).json({ error: "ID do conograma da assinatura e necessário" })
        }

        const releaseSubscriptionItemSchedule = await stripe.subscriptionSchedules.release(subscriptionScheduleId)

        res.status(200).json(releaseSubscriptionItemSchedule)
    } catch(erro) {
        console.log(`Não foi possivel liberar um conograma assinatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao liberar um conograma assinatura" });
    }
})


module.exports = router;