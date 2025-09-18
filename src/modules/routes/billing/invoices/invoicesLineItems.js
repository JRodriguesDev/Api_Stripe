const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.post('/updateinvoicelineitem/:invoiceId/:lineitemId', async (req, res) => {
    try {
        const invoiceId = req.params.invoiceId
        const lineitemId = req.params.lineitemId
        if (!invoiceId || !lineitemId) {
            return res.status(400).json({ error: "IDs  da fatura e itens de linha e necessário" })
        }

        const updateInvoiceLineItem = await stripe.invoices.updateLineItem(invoiceId, lineitemId)

        res.status(200).json(updateInvoiceLineItem)
    } catch(erro) {
        console.log(`Não foi possivel atualiza item de linha de fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao atualiza item de linha de fatura" });
    }
})

router.get('/retrieveinvoicelineitem/:id', async (req, res) => {
    try {
        const invoiceId = req.params.id
        if (!invoiceId) {
            return res.status(400).json({ error: "ID da fatura e necessário" })
        }

        const retrieveInvoiceLineItem = await stripe.invoices.listLineItems(invoiceId)

        res.status(200).json(retrieveInvoiceLineItem)
    } catch(erro) {
        console.log(`Não foi possivel recuperar item de linha de fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar item de linha de fatura" });
    }
})


router.get('/retrieveupcominginvoicelineitem', async (req, res) => {
    try {
        const invoiceJson = req.body
        if (!invoiceJson) {
            return res.status(400).json({ error: "JSON da fatura e necessário" })
        }

        const retrieveUpcomingInvoiceLineItem = await stripe.invoices.listUpcomingLines(invoiceJson)

        res.status(200).json(retrieveUpcomingInvoiceLineItem)
    } catch(erro) {
        console.log(`Não foi possivel recuperar item de linha de fatura futura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar item de linha de fatura futura" });
    }
})


router.post('/bulkaddinvoicelineitems/:id', async (req, res) => {
    try {
        const invoiceId = req.params.id
        const {invoiceJson} = req.body
        if (!invoiceId || !invoiceJson) {
            return res.status(400).json({ error: "ID e JSON da fatura e necessário" })
        }

        const bulkAddInvoiceLineItems = await stripe.invoices.addLines(invoiceId, invoiceJson)

        res.status(200).json(bulkAddInvoiceLineItems)
    } catch(erro) {
        console.log(`Não foi possivel adicionar itens de linha de fatura em massa devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao adicionar itens de linha de fatura em massa" });
    }
})

router.post('/bulkremoveinvoicelineitems/:id', async (req, res) => {
    try {
        const invoiceId = req.params.id
        const {invoiceJson} = req.body
        if (!invoiceId || !invoiceJson) {
            return res.status(400).json({ error: "ID JSON da fatura e necessário" })
        }

        const bulkRemoveInvoiceLineItems = await stripe.invoices.removeLines(invoiceId, invoiceJson)

        res.status(200).json(bulkRemoveInvoiceLineItems)
    } catch(erro) {
        console.log(`Não foi possivel remover itens de linha de fatura em massa devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao remover itens de linha de fatura em massa" });
    }
})

router.post('/bulkupdateinvoicelineitems/:id', async (req, res) => {
    try {
        const invoiceId = req.params.id
        const {invoiceJson} = req.body
        if (!invoiceId || !invoiceJson) {
            return res.status(400).json({ error: "ID JSON da fatura e necessário" })
        }

        const bulkUpdateInvoiceLineItems = await stripe.invoices.updateLines(invoiceId, invoiceJson)

        res.status(200).json(bulkUpdateInvoiceLineItems)
    } catch(erro) {
        console.log(`Não foi possivel atualizar itens de linha de fatura em massa devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar itens de linha de fatura em massa" });
    }
})



module.exports = router;