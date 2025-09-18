const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const dotenv = require('dotenv')

dotenv.config()

const stripe = Stripe(process.env.STRIPE_SECRETKEY);

router.delete('/deletecustomer/:id', async (req, res) => {
    try {
        const custumerId = req.params.id
        if (!custumerId) {
            return res.status(400).json({ error: "Id do cliente são necessários" });
        }

        const deleteCustomer = await stripe.customers.del(custumerId);

        res.status(200).json(deleteCustomer)
    }catch(erro) {
        console.log(`Não foi possivel excluir o cliente devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao excluir o cliente" });
    }
})

router.get('/listallcustomers', async (req, res) =>{
    try {
        const listAllCustomers = await stripe.customers.list();

        res.status(200).json(listAllCustomers);
    }catch(erro) {
        console.log(`Não foi possivel obter a lista de cliente devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao listar os clientes" });
    }
})

router.get('/retrievecustomer/:id', async (req, res) => {
    try {
        const custumerId = req.params.id;

        if (!custumerId) {
            return res.status(400).json({ error: "Id do cliente são necessários" });
        }

        const retrieveCustomer = await stripe.customers.retrieve(custumerId);

        res.status(200).json(retrieveCustomer)
    }catch(erro) {
        console.log(`Não foi possivel recuperar o cliente devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao recuperar o cliente" });
    }
})

router.post('/updatecustomer/:id', async (req, res) => {
    try{
        const custumerId = req.params.id;
        const {updateCustomerJSON} = req.body;

        if (!custumerId || !updateCustomerJSON) {
            return res.status(400).json({ error: "Dados do cliente são necessários" });
        }

        const updatecustomer = await stripe.customers.update(custumerId, updateCustomerJSON)
        
        res.status(200).json(updatecustomer);
    }catch (erro) {
        console.log(`Não foi possivel atualizar o cliente devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao atualizar o cliente" });
    }
})

router.post('/createcustomer', async (req, res) => {
    try {
        const {createCustomerJSON} = req.body;

        if (!createCustomerJSON) {
            return res.status(400).json({ error: "Dados do cliente são necessários" });
        }

        const createCustomer = await stripe.customers.create(createCustomerJSON);
        res.status(200).json(createCustomer);
    }catch(erro) {
        console.log(`Não foi possivel criar o cliente devido ao erro: ${erro}`);
        res.status(500).json({ error: "Erro interno do servidor ao criar o cliente" });
    }
})

module.exports = router