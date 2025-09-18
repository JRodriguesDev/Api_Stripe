const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.post('/createquote', async (req, res) => {
    try {
        const {quoteJson} = req.body
        if (!quoteJson) {
            return res.status(400).json({ error: "JSON da quote e necessário" })
        }

        const createQuote = await stripe.quotes.create(quoteJson)

        res.status(200).json(createQuote)
    } catch(erro) {
        console.log(`Não foi possivel criar uma cota devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar uma cota" });
    }
})


router.post('/createquote/:id', async (req, res) => {
    try {
        const {quoteId} = req.params.id
        const {quoteJson} = req.body
        if (!quoteJson || !quoteId) {
            return res.status(400).json({ error: "JSON e ID da quote e necessário" })
        }

        const updateQuote = await stripe.quotes.update(quoteId, quoteJson)

        res.status(200).json(updateQuote)
    } catch(erro) {
        console.log(`Não foi possivel atualizar uma cota devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar uma cota" });
    }
})

router.get('/retrievequoteslineitems/:id', async (req, res) => {
    try {
        const quoteId = req.params.id
        if (!quoteId) {
            return res.status(400).json({ error: "ID da quote e necessário" })
        }

        const retrieveQuotesLineItems = await stripe.quotes.listLineItems(quoteId)

        res.status(200).json(retrieveQuotesLineItems)
    } catch(erro) {
        console.log(`Não foi possivel recuperar itens de linha de uma cotação ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar itens de linha de uma cotação" });
    }
})


router.get('/retrievequotesupfrontlineitems/:id', async (req, res) => {
    try {
        const quoteId = req.params.id
        if (!quoteId) {
            return res.status(400).json({ error: "ID da quote e necessário" })
        }

        const retrieveQuotesUpfrontLineItems = await stripe.quotes.listComputedUpfrontLineItems(quoteId)

        res.status(200).json(retrieveQuotesUpfrontLineItems)
    } catch(erro) {
        console.log(`Não foi possivel recuperar os itens de linha inicial de uma cotação devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao  recuperar os itens de linha inicial de uma cotação" });
    }
})

router.get('/retrievequotes/:id', async (req, res) => {
    try {
        const quoteId = req.params.id
        if (!quoteId) {
            return res.status(400).json({ error: "ID da quote e necessário" })
        }

        const retrieveQuotes = await stripe.quotes.retrieve(quoteId)

        res.status(200).json(retrieveQuotes)
    } catch(erro) {
        console.log(`Não foi possivel recuperar a cotação devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao  recuperar a cotação" });
    }
})

router.get('/listquotes', async (req, res) => {
    try {
        const {quoteJson} = req.body
        if (!quoteJson) {
            return res.status(400).json({ error: "JSON da quote e necessário" })
        }

        const listQuotes = await stripe.quotes.list(quoteJson)

        res.status(200).json(listQuotes)
    } catch(erro) {
        console.log(`Não foi possivel listar as cotação devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao listar as cotação" });
    }
})

router.post('/acceptquotes/:id', async (req, res) => {
    try {
        const quoteId = req.params.id
        if (!quoteId) {
            return res.status(400).json({ error: "ID da quote e necessário" })
        }

        const acceptQuotes = await stripe.quotes.accept(quoteId)

        res.status(200).json(acceptQuotes)
    } catch(erro) {
        console.log(`Não foi possivel aceitar a cotação devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao aceitar a cotação" });
    }
})

router.post('/cancelquotes/:id', async (req, res) => {
    try {
        const quoteId = req.params.id
        if (!quoteId) {
            return res.status(400).json({ error: "ID da quote e necessário" })
        }

        const cancelQuotes = await stripe.quotes.cancel(quoteId)

        res.status(200).json(cancelQuotes)
    } catch(erro) {
        console.log(`Não foi possivel cancelar a cotação devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao cancelar a cotação" });
    }
})


router.get('/downloadquotes/:id', async (req, res) => {
    try {
        const quoteId = req.params.id
        if (!quoteId) {
            return res.status(400).json({ error: "ID da quote e necessário" })
        }

        const downloadQuotes = await stripe.quotes.pdf(quoteId, (a))

        res.status(200).json(downloadQuotes)
    } catch(erro) {
        console.log(`Não foi possivel baixar a cotação devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao baixar a cotação" });
    }
})

router.get('/finalizequotes/:id', async (req, res) => {
    try {
        const quoteId = req.params.id
        if (!quoteId) {
            return res.status(400).json({ error: "ID da quote e necessário" })
        }

        const finalizeQuotes = await stripe.quotes.finalizeQuote(quoteId)

        res.status(200).json(finalizeQuotes)
    } catch(erro) {
        console.log(`Não foi possivel finalizar a cotação devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao finalizar a cotação" });
    }
})









module.exports = router;