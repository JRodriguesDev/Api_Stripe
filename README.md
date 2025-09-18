# Testando a API do Stripe | Projeto de Aprendizado

Este é um projeto simples, desenvolvido para testar e aprender sobre a API de pagamentos do **Stripe**. Ele serve como um ambiente seguro para explorar as funcionalidades da API, como processamento de pagamentos, sem a complexidade de uma aplicação completa.

---

### Funcionalidades Exploradas

* **Criação de Sessões de Checkout:** Implementa a criação de sessões para processar pagamentos.
* **Processamento de Pagamentos:** Demonstra como a API lida com transações financeiras.
* **Gerenciamento de Itens:** [Opcional: Adicione outras funcionalidades que você testou, como "criação de produtos" ou "gestão de clientes".]

---

### Tecnologias Utilizadas

* **Linguagem:** JavaScript
* **Ambiente de Execução:** Node.js
* **Biblioteca:** Stripe API

---

### Configuração e Execução

Para rodar este projeto, você precisa configurar suas chaves da API do Stripe.

1.  **Crie um arquivo `.env`:** Na raiz do projeto, crie um arquivo chamado `.env` (com o ponto no início).

2.  **Adicione suas chaves:** Cole as seguintes linhas no arquivo `.env`, substituindo os valores pelos seus próprios (você pode encontrá-las no painel do Stripe):

    ```env
    STRIPE_SECRET_KEY=sua_chave_secreta_aqui
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Execute o servidor:**
    ```bash
    src/index.js
    ```
