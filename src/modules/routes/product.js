const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv')

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.post('/createproduct', async (req, res) => {
    try {
        const {productJson} = req.body
        if (!productJson) {
            return res.status(400).json({ error: "JSON do produto são necessários" });
        }

        const createProduct = await stripe.products.create(productJson);

        res.status(200).json(createProduct)
    }catch(erro) {
        console.log(`Não foi possivel criar o produto devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar o produto" });
    }
})

router.post('/updateproduct/:id', async (req, res) => {
    try {
        const productid = req.params.id
        const {productJson} = req.body
        if (!productJson || !productid) {
            return res.status(400).json({ error: "ID e JSON do produto são necessários" });
        }

        const updateProduct = await stripe.products.update(productid ,productJson);

        res.status(200).json(updateProduct)
    }catch(erro) {
        console.log(`Não foi possivel atualizar o produto devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar o produto" });
    }
})

router.get('/retrieveproduct/:id', async (req, res) => {
    try {
        const productid = req.params.id
        if (!productid) {
            return res.status(400).json({ error: "ID do produto são necessários" });
        }

        const retrieveProduct = await stripe.products.retrieve(productid);

        res.status(200).json(retrieveProduct)
    }catch(erro) {
        console.log(`Não foi possivel atualizar o produto devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar o produto" });
    }
})

router.get('/listproduct', async (req, res) => {
    try {
        /*const {productJson} = req.body
        if (!productJson) {
            return res.status(400).json({ error: "JSON do produto são necessários" });
        }*/

        const listProduct = await stripe.products.list();

        res.status(200).json(listProduct)
    }catch(erro) {
        console.log(`Não foi possivel listar os produto devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao listar os produto" });
    }
})

router.delete('/deleteproduct/:id', async (req, res) => {
    try {
        const productid = req.params.id
        if (!productid) {
            return res.status(400).json({ error: "ID do produto são necessários" });
        }

        const deleteProduct = await stripe.products.del(productid);

        res.status(200).json(deleteProduct)
    }catch(erro) {
        console.log(`Não foi possivel deletar o produto devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao deletar o produto" });
    }
})




module.exports = router