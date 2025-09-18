const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.post('/createpaymentlink', async (req, res) => {
    try {
        const {paymentlinkJson} = req.body
        if (!paymentlinkJson) {
            return res.status(400).json({ error: "JSON do link de pagamento e necessário" })
        }

        const createPaymentLink = await stripe.paymentLinks.create(paymentlinkJson)

        res.status(200).json(createPaymentLink)
    }catch(erro) {
        console.log(`Não foi possivel criar um link de pagamento devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar um link de pagamento" });
    }
})

router.post('/updatepaymentlink/:id', async (req, res) => {
    try {
        const paymentLinkId = req.params.id
        const {paymentlinkJson} = req.body
        if (!paymentLinkId || paymentlinkJson) {
            return res.status(400).json({ error: "JSON e ID do link de pagamento e necessário" })
        }

        const updatePaymentLink = await stripe.paymentLinks.update(paymentLinkId, paymentlinkJson)

        res.status(200).json(updatePaymentLink)
    }catch(erro) {
        console.log(`Não foi possivel editar um link de pagamento devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao editar um link de pagamento" });
    }
})

router.get('/retrievepaymentlinkitems/:id', async (req, res) => {
    try {
        const paymentLinkId = req.params.id
        if (!paymentLinkId) {
            return res.status(400).json({ error: "ID do link de pagamento e necessário" })
        }

        const retrievePaymentLinkItems = await stripe.paymentLinks.listLineItems(paymentLinkId)

        res.status(200).json(retrievePaymentLinkItems)
    }catch(erro) {
        console.log(`Não foi possivel recuperar um link de pagamento devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar um link de pagamento" });
    }
})

router.get('/retrievepaymentlink/:id', async (req, res) => {
    try {
        const paymentLinkId = req.params.id
        if (!paymentLinkId) {
            return res.status(400).json({ error: "ID do link de pagamento e necessário" })
        }

        const retrievePaymentLink = await stripe.paymentLinks.retrieve(paymentLinkId)

        res.status(200).json(retrievePaymentLink)
    }catch(erro) {
        console.log(`Não foi possivel recuperar um link de pagamento devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar um link de pagamento" });
    }
})

router.get('/listpaymentlink', async (req, res) => {
    try {
        const {paymentlinkJson} = req.body
        if (!paymentlinkJson) {
            return res.status(400).json({ error: "JSON do link de pagamento e necessário" })
        }

        const listPaymentLink = await stripe.paymentLinks.list(paymentlinkJson)

        res.status(200).json(listPaymentLink)
    }catch(erro) {
        console.log(`Não foi possivel recuperar uma lista de pagamento devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar uma lista de pagamento" });
    }
})





module.exports = router;