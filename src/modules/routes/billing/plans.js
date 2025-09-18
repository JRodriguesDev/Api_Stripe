const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.post('/createplan', async (req, res) => {
    try {
        const {planJson} = req.body
        if (!planJson) {
            return res.status(400).json({ error: "JSON do plano e necessário" })
        }

        const createPlan = await stripe.plans.create(planJson)

        res.status(200).json(createPlan)
    } catch(erro) {
        console.log(`Não foi possivel criar plano devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar plano" });
    }
})

router.post('/updateplan/:id', async (req, res) => {
    try {
        const planId = req.params.id
        const {planJson} = req.body
        if (!planJson || !planId) {
            return res.status(400).json({ error: "ID e JSON do plano e necessário" })
        }

        const updatePlan = await stripe.plans.update(planId ,planJson)

        res.status(200).json(updatePlan)
    } catch(erro) {
        console.log(`Não foi possivel atualizar plano devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar plano" });
    }
})

router.get('/retrieveplan/:id', async (req, res) => {
    try {
        const planId = req.params.id
        if (!planId) {
            return res.status(400).json({ error: "ID do plano e necessário" })
        }

        const retrievePlan = await stripe.plans.retrieve(planId)

        res.status(200).json(retrievePlan)
    } catch(erro) {
        console.log(`Não foi possivel recuperar plano devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar plano" });
    }
})

router.get('/listplan', async (req, res) => {
    try {
        //const {planJso} = req.body
        /*if (!planJso) {
            return res.status(400).json({ error: "JSON do plano e necessário" })
        }*/

        const listPlan = await stripe.plans.list()

        res.status(200).json(listPlan)
    } catch(erro) {
        console.log(`Não foi possivel listar os planos devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao listar os planos" });
    }
})

router.delete('/deleteplan/:id', async (req, res) => {
    try {
        const planId = req.params.id
        if (!planId) {
            return res.status(400).json({ error: "ID do plano e necessário" })
        }

        const deletePlan = await stripe.plans.del(planId)

        res.status(200).json(deletePlan)
    } catch(erro) {
        console.log(`Não foi possivel deleta o plano devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao deleta o plano devido" });
    }
})

module.exports = router;