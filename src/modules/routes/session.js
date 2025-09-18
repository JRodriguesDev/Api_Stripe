const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv')

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.post('/createsession', async (req, res) => {
    try {
        const {SessionJson} = req.body
        if (!SessionJson) {
            return res.status(400).json({ error: "JSON da sessao e necessário" })
        }

        const createSession = await stripe.checkout.sessions.create(SessionJson)

        res.status(200).json(createSession)
    }catch(erro) {
        console.log(`Não foi possivel criar uma sessao devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar sessao" });
    }
})

router.post('/updatesession/:id', async (req, res) => {
    try {
        const sessionId = req.params.id
        const {SessionJson} = req.body
        if (!SessionJson || !sessionId) {
            return res.status(400).json({ error: "ID e JSON da sessao e necessário" })
        }

        const updateSession = await stripe.checkout.sessions.update(sessionId ,SessionJson)

        res.status(200).json(updateSession)
    }catch(erro) {
        console.log(`Não foi possivel atualizar uma sessao devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar sessao" });
    }
})

router.get('/retrievesession/:id', async (req, res) => {
    try {
        const sessionId = req.params.id
        if (!sessionId) {
            return res.status(400).json({ error: "ID da sessao e necessário" })
        }

        const retrieveSession = await stripe.checkout.sessions.retrieve(sessionId)

        res.status(200).json(retrieveSession)
    }catch(erro) {
        console.log(`Não foi possivel recuperar a sessao devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar sessao" });
    }
})

router.get('/retrieveitemsession/:id', async (req, res) => {
    try {
        const sessionId = req.params.id
        if (!sessionId) {
            return res.status(400).json({ error: "ID da sessao e necessário" })
        }

        const retrieveItemSession = await stripe.checkout.sessions.listLineItems(sessionId)

        res.status(200).json(retrieveItemSession)
    }catch(erro) {
        console.log(`Não foi possivel recuperar os items da sessao devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar os items da sessao" });
    }
})

router.get('/listsessions', async (req, res) => {
    try {
        /*
        const {listSessionsJson} = req.body
        if (!listSessionsJson) {
            return res.status(400).json({ error: "JSON da sessao e necessário" })
        }*/

        const listSessions = await stripe.checkout.sessions.list()

        res.status(200).json(listSessions)
    }catch(erro) {
        console.log(`Não foi possivel listar os items da sessao devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao listar os items da sessao" });
    }
})

router.post('/expiresession/:id', async (req, res) => {
    try {
        const sessionId = req.params.id
        if (!sessionId) {
            return res.status(400).json({ error: "ID da sessao e necessário" })
        }

        const expireSession = await stripe.checkout.sessions.expire(sessionId)

        res.status(200).json(expireSession)
    }catch(erro) {
        console.log(`Não foi possivel expirar a sessao devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao expirar a sessao" });
    }
})



module.exports = router;