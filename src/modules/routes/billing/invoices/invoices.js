const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.post('/createinvoice', async (req, res) => {
    try {
        const {invoiceJson} = req.body
        if(!invoiceJson) {
            return res.status(400).json({ error: "JSON da fatura e necessário" })
        }

        const createInvoice = await stripe.invoices.create(invoiceJson)

        res.status(200).json(createInvoice)
    }catch(erro) {
        console.log(`Não foi possivel criar uma fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar uma fatura" });
    }
})

router.post('/createpreviewinvoice', async (req, res) => {
    try {
        const {invoiceJson} = req.body
        if(!invoiceJson) {
            return res.status(400).json({ error: "JSON da fatura e necessário" })
        }

        const createPreviewInvoice = await stripe.invoices.createPreview(invoiceJson)

        res.status(200).json(createPreviewInvoice)
    }catch(erro) {
        console.log(`Não foi possivel criar uma previsualizaçao fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar uma previsualizaçao da fatura" });
    }
})

router.post('/updateinvoice/:id', async (req, res) => {
    try {
        const invoiceId = req.params.id
        const {invoiceJson} = req.body
        if(!invoiceId || !invoiceJson) {
            return res.status(400).json({ error: "ID e JSON da fatura e necessário" })
        }

        const updateInvoice = await stripe.invoices.update(invoiceId, invoiceJson)

        res.status(200).json(updateInvoice)
    }catch(erro) {
        console.log(`Não foi possivel editar uma fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao editar uma fatura" });
    }
})

router.get('/retrieveinvoice/:id', async (req, res) => {
    try {
        const invoiceId = req.params.id
        if(!invoiceId) {
            return res.status(400).json({ error: "ID da fatura e necessário" })
        }

        const retrieveInvoice = await stripe.invoices.retrieve(invoiceId)

        res.status(200).json(retrieveInvoice)
    }catch(erro) {
        console.log(`Não foi possivel recuperar uma fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar uma fatura" });
    }
})

router.get('/retrieveupcominginvoice/', async (req, res) => {
    try {
        const {invoiceJson} = req.body
        if(!invoiceJson) {
            return res.status(400).json({ error: "JSON da fatura e necessário" })
        }

        const retrieveUpcomingInvoice = await stripe.invoices.retrieveUpcoming(invoiceJson)

        res.status(200).json(retrieveUpcomingInvoice)
    }catch(erro) {
        console.log(`Não foi possivel recuperar uma fatura futura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar uma fatura futura" });
    }
})

router.get('/listinvoice/', async (req, res) => {
    try {
        /*const {invoiceJson} = req.body
        if(!invoiceJson) {
            return res.status(400).json({ error: "JSON da fatura e necessário" })
        }*/

        const listInvoice = await stripe.invoices.list()

        res.status(200).json(listInvoice)
    }catch(erro) {
        console.log(`Não foi possivel listar uma fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao listar uma fatura" });
    }
})

router.delete('/deletedraftinvoice/:id', async (req, res) => {
    try {
        const invoiceId = req.params.id
        if(!invoiceId) {
            return res.status(400).json({ error: "ID da fatura e necessário" })
        }

        const deleteDraftInvoice = await stripe.invoices.del(invoiceId)

        res.status(200).json(deleteDraftInvoice)
    }catch(erro) {
        console.log(`Não foi possivel deleta o rascunho da fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao deleta o rascunho da fatura" });
    }
})

router.post('/finalizeinvoice/:id', async (req, res) => {
    try {
        const invoiceId = req.params.id
        if(!invoiceId) {
            return res.status(400).json({ error: "ID da fatura e necessário" })
        }

        const finalizeInvoice = await stripe.invoices.finalizeInvoice(invoiceId)

        res.status(200).json(finalizeInvoice)
    }catch(erro) {
        console.log(`Não foi possivel finaliza a fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao finaliza a fatura" });
    }
})

router.post('/markinvoiceuncollectible/:id', async (req, res) => {
    try {
        const invoiceId = req.params.id
        if(!invoiceId) {
            return res.status(400).json({ error: "ID da fatura e necessário" })
        }

        const markinvoIceUncollectible = await stripe.invoices.markUncollectible(invoiceId)

        res.status(200).json(markinvoIceUncollectible)
    }catch(erro) {
        console.log(`Não foi possivel marca a fatura como incobravel devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao marca a fatura como incobravel" });
    }
})

router.post('/payinvoice/:id', async (req, res) => {
    try {
        const invoiceId = req.params.id
        if(!invoiceId) {
            return res.status(400).json({ error: "ID da fatura e necessário" })
        }

        const payInvoice = await stripe.invoices.pay(invoiceId)

        res.status(200).json(payInvoice)
    }catch(erro) {
        console.log(`Não foi possivel paga a fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao paga a fatura" });
    }
})

router.get('/searchinvoice/', async (req, res) => {
    try {
        const invoiceQuery = req.query
        if(!invoiceQuery) {
            return res.status(400).json({ error: "Query da fatura e necessário" })
        }

        const searchInvoice = await stripe.invoices.search(invoiceQuery)

        res.status(200).json(searchInvoice)
    }catch(erro) {
        console.log(`Não foi possivel buscar a fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao buscar a fatura" });
    }
})

router.post('/sendinvoicemanualpayment/:id', async (req, res) => {
    try {
        const invoiceId = req.params.id
        if(!invoiceId) {
            return res.status(400).json({ error: "ID da fatura e necessário" })
        }

        const sendInvoiceManualPayment = await stripe.invoices.sendInvoice(invoiceId)

        res.status(200).json(sendInvoiceManualPayment)
    }catch(erro) {
        console.log(`Não foi possivel enviar a fatura para pagamento manual devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao enviar a fatura para pagamento manual" });
    }
})

router.post('/voidinvoice/:id', async (req, res) => {
    try {
        const invoiceId = req.params.id
        if(!invoiceId) {
            return res.status(400).json({ error: "ID da fatura e necessário" })
        }

        const voidInvoice = await stripe.invoices.voidInvoice(invoiceId)

        res.status(200).json(voidInvoice)
    }catch(erro) {
        console.log(`Não foi possivel anular a fatura devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao anular a fatura" });
    }
})

module.exports = router;