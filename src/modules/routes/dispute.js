const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv')

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.post('/updatedispute/:id', async (req, res) => {
    try {
        const disputeId = req.params.id;
        const {disputeJson} = req.body;

        if (!disputeId || !disputeJson) {
            return res.status(400).json({ error: "Id da disputa e necessário" })
        }

        const updateDispute = await stripe.disputes.update(disputeId, disputeJson);

        res.status(200).json(updateDispute);
    }catch(erro) {
        console.log(`Não foi possivel atualizar a disputa devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar a disputa" });
    }
});

router.get('/retrievedispute/:id', async (req, res) => {
    try {
        const disputeId = req.params.id
        if (!disputeId) {
            return res.status(400).json({ error: "Id da disputa e necessário" })
        }

        const retrieveDispute = await stripe.disputes.retrieve(disputeId);

        res.status(200).json(retrieveDispute);
    }catch(erro) {
        console.log(`Não foi possivel recuperar a disputa devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar a disputa" });
    }
})

router.get('/listdisputes', async (req, res) => {
    try {
        const {disputeJson} = req.body;
        if (!disputeJson) {
            return res.status(400).json({ error: "JSON da disputa e necessário" })
        }

        const listDisputes = await stripe.disputes.list(disputeJson)

        res.status(200).json(listDisputes)
    }catch(erro) {
        console.log(`Não foi possivel listar a disputa devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao listar a disputa" });
    }
})

router.post('/closedispute/:id', async (req, res) => {
    try {
        const disputeId = req.params.id;
        if (!disputeId) {
            if (!disputeJson) {
                return res.status(400).json({ error: "Id da disputa e necessário" })
            }

            const closeDispute = await stripe.disputes.close(disputeId)
        }

    }catch(erro) {
        console.log(`Não foi possivel fechar a disputa devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao fechar a disputa" });
    }
})



module.exports = router;