const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.get('/retrieveinvoicerenderingtemplate/:id', async (req, res) => {
    try {
        const invoiceId = req.params.id
        if (!invoiceId) {
            return res.status(400).json({ error: "ID da fatura e necessário" })
        }

        const retrieveInvoiceRenderingTemplate = await stripe.invoiceRenderingTemplates.retrieve(invoiceId)

        res.status(200).json(retrieveInvoiceRenderingTemplate)
    } catch(erro) {
        console.log(`Não foi possivel recuperar o modelo da fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar o modelo da fatura" });
    }
})


router.get('/listinvoicerenderingtemplate', async (req, res) => {
    try {
        const {invoiceJson} = req.body
        if (!invoiceJson) {
            return res.status(400).json({ error: "JSON da fatura e necessário" })
        }

        const listInvoiceRenderingTemplate = await stripe.invoiceRenderingTemplates.list(invoiceJson)

        res.status(200).json(listInvoiceRenderingTemplate)
    } catch(erro) {
        console.log(`Não foi possivel listar os modelo da fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao listar os modelo da fatura" });
    }
})


router.post('/archiveinvoicerenderingtemplate/:id', async (req, res) => {
    try {
        const {invoiceId} = req.params.id
        if (!invoiceId) {
            return res.status(400).json({ error: "ID da fatura e necessário" })
        }

        const archiveInvoiceRenderingTemplate = await stripe.invoiceRenderingTemplates.archive(invoiceId)

        res.status(200).json(archiveInvoiceRenderingTemplate)
    } catch(erro) {
        console.log(`Não foi possivel arquiva o modelo da fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao arquiva o modelo da fatura" });
    }
})

router.post('/unarchiveinvoicerenderingtemplate/:id', async (req, res) => {
    try {
        const {invoiceId} = req.params.id
        if (!invoiceId) {
            return res.status(400).json({ error: "ID da fatura e necessário" })
        }

        const unarchiveInvoiceRenderingTemplate = await stripe.invoiceRenderingTemplates.unarchive(invoiceId)

        res.status(200).json(unarchiveInvoiceRenderingTemplate)
    } catch(erro) {
        console.log(`Não foi possivel desarquiva o modelo da fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao desarquiva o modelo da fatura" });
    }
})

module.exports = router;