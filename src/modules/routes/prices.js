const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv')

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);


router.post('/createprice', async (req, res) => {
    try {
        const {priceJson} = req.body
        if (!priceJson) {
            return res.status(400).json({ error: "JSON do preço são necessários" });
        }

        const createPrice = await stripe.prices.create(priceJson);

        res.status(200).json(createPrice)
    }catch(erro) {
        console.log(`Não foi possivel criar o preço devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar preço o produto" });
    }
})

router.post('/updateprice/:id', async (req, res) => {
    try {
        const priceId = req.params.id
        const {priceJson} = req.body
        if (!priceJson || !priceId) {
            return res.status(400).json({ error: "ID e JSON do preço são necessários" });
        }

        const updatePrice = await stripe.prices.update(priceId ,priceJson);

        res.status(200).json(updatePrice)
    }catch(erro) {
        console.log(`Não foi possivel atualizar o preço devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar preço o produto" });
    }
})

router.get('/retrieveprice/:id', async (req, res) => {
    try {
        const priceId = req.params.id
        if (!priceId) {
            return res.status(400).json({ error: "ID do preço são necessários" });
        }

        const retrievePrice = await stripe.prices.retrieve(priceId);

        res.status(200).json(retrievePrice)
    }catch(erro) {
        console.log(`Não foi possivel recuperar o preço devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar preço o produto" });
    }
})

router.get('/|', async (req, res) => {
    try {/*
        const {priceJson} = req.body
        if (!priceJson) {
            return res.status(400).json({ error: "JSON do preço são necessários" });
        }*/

        const retrievePrice = await stripe.prices.list();

        res.status(200).json(retrievePrice)
    }catch(erro) {
        console.log(`Não foi possivel listar o preço devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao listar preço o produto" });
    }
})






module.exports = router