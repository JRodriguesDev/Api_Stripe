const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.post('/createinvoiceitem', async (req, res) => {
    try {
        const {invoiceItemJson} = req.body
        if (!invoiceItemJson) {
            return res.status(400).json({ error: "JSON de items da fatura e necessário" })
        }

        const createInvoceItem = await stripe.invoiceItems.create(invoiceItemJson)

        res.status(200).json(createInvoceItem)
    } catch(erro) {
        console.log(`Não foi possivel criar uma item na fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar uma item na fatura" });
    }
})

router.post('/updateinvoiceitem/:id', async (req, res) => {
    try {
        const {invoiceItemJson} = req.body
        const invoiceId = req.params.id
        if (!invoiceItemJson || !invoiceId) {
            return res.status(400).json({ error: "JSON e ID de items da fatura e necessário" })
        }

        const updateInvoceItem = await stripe.invoiceItems.update(invoiceId ,invoiceItemJson)

        res.status(200).json(updateInvoceItem)
    } catch(erro) {
        console.log(`Não foi possivel atualizar uma item na fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar uma item na fatura" });
    }
})

router.get('/retrieveinvoiceitem/:id', async (req, res) => {
    try {
        const invoiceItemId = req.params.id
        if (!invoiceItemId) {
            return res.status(400).json({ error: "ID da items da fatura e necessário" })
        }

        const retrieveInvoceItem = await stripe.invoiceItems.retrieve(invoiceItemId)

        res.status(200).json(retrieveInvoceItem)
    } catch(erro) {
        console.log(`Não foi possivel recuperar um item da fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar um item da fatura" });
    }
})


router.get('/listinvoiceitem', async (req, res) => {
    try {
        /*const {invoiceItemJson} = req.body
        if (!invoiceItemJson) {
            return res.status(400).json({ error: "JSON de items da fatura e necessário" })
        }*/

        const listInvoceItem = await stripe.invoiceItems.list()

        res.status(200).json(listInvoceItem)
    } catch(erro) {
        console.log(`Não foi possivel criar uma item na fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar uma item na fatura" });
    }
})

router.delete('/deleteinvoiceitem/:id', async (req, res) => {
    try {
        const invoiceId = req.params.id
        if (!invoiceId) {
            return res.status(400).json({ error: "ID da items da fatura e necessário" })
        }

        const deleteInvoceItem = await stripe.invoiceItems.del(invoiceId)

        res.status(200).json(deleteInvoceItem)
    } catch(erro) {
        console.log(`Não foi possivel deletar um item da fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao deletar um item da fatura" });
    }
})

module.exports = router;