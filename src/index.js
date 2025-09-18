const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();

const custumersRoute = require('./modules/routes/customers');
const custumersSessionRoute = require('./modules/routes/customerSession');
const disputeRoute = require('./modules/routes/dispute')
const eventsRoute = require('./modules/routes/events')
const sessionRoute = require('./modules/routes/session')
const paymentLinkRoute = require('./modules/routes/paymentLinks')
const customerPortalSessionRoute = require ('./modules/routes/billing/customerPortalSession/customerPortalsession')
const invoicesRoute = require('./modules/routes/billing/invoices/invoices')
const invoicesItemsRoute = require('./modules/routes/billing/invoices/invoicesItems')
const invoiceLineItemsRoute = require('./modules/routes/billing/invoices/invoicesLineItems')
const invoiceRenderingTemplatesRoute = require('./modules/routes/billing/invoices/invoicerenderingtemplate')
const plansRoute = require('./modules/routes/billing/plans')
const quoteRoute = require('./modules/routes/billing/quote')
const subscriptionsRoute = require('./modules/routes/billing/subscriptions/subscriptions')
const subscriptionsItemsRoute = require('./modules/routes/billing/subscriptions/subscriptionItems')
const subscriptionsScheduleRoute = require('./modules/routes/billing/subscriptions/subscriptionSchedule')
const productRoute = require('./modules/routes/product')
const priceRoute = require('./modules/routes/prices')

app.use(cors());
app.use(express.json());

dotenv.config();

const PORT = process.env.PORT;

app.use('/customers', custumersRoute);
app.use('/customersession', custumersSessionRoute);
app.use('/dispute', disputeRoute);
app.use('/events', eventsRoute);
app.use('/session', sessionRoute);
app.use('/paymentlink', paymentLinkRoute)
app.use('/customerportalsession', customerPortalSessionRoute)
app.use('/invoices', invoicesRoute)
app.use('/invoicesitems', invoicesItemsRoute)
app.use('/invoiceslineitems', invoiceLineItemsRoute)
app.use('/invoicerenderingtemplates', invoiceRenderingTemplatesRoute)
app.use('/plans', plansRoute)
app.use('/quote', quoteRoute)
app.use('/subscriptions', subscriptionsRoute)
app.use('/subscriptionsItems', subscriptionsItemsRoute)
app.use('/subscriptionsSchedule', subscriptionsScheduleRoute)
app.use('/product', productRoute)
app.use('/price', priceRoute)

app.get('/', (req, res) => res.send('API Funcionando'));

app.listen(PORT, () => console.log("Funcionanod na porta http://localhost:"+PORT));