const express = require('express');
const { WebhookClient, Suggestion, Payload } = require('dialogflow-fulfillment');
//const welcomeCallback = require('../src/callbacks/welcome.callback');
const defaultFallback = require('../src/callbacks/default-fallback.callback');
const folioFunction = require('../src/callbacks/folio');
const fundCategoriesFunction = require('../src/callbacks/fundCategories');
const fundExplorerFunction = require('../src/callbacks/fundExplorer');
const portfolioValuationFunction = require('../src/callbacks/portfolioValuation');
const captureFolioFunction = require('../src/callbacks/captureFolio');
const transationHistoryFunction = require('../src/callbacks/transactionHistory');
const investFunction = require('../src/callbacks/invest');
const investYes = require('../src/callbacks/investYes');
const transactionFunction = require('../src/callbacks/transactions');
const transationAskYearFunction = require('../src/callbacks/transactionAskYear');
const mobileCaptureFunction = require('../src/callbacks/mobileCapture');



// setup PORT 
const PORT = process.env.PORT || 8080;

//setup app & its routes
const app = express();

// const intentMapping = [
//     {
//         intentName: 'Default Welcome Intent',
//         functionName: welcomeCallback
//     },
//     {
//         intentName: 'Default Fallback Intent',
//         functionName: defaultFallback
//     }, {
//         intentName: 'Portfolio Valuation Intent',
//         functionName: portfolioValuationFunction
//     },
//     {
//         intentName: 'Extract Folio Number Intent',
//         functionName: captureFolioFunction
//     },
//     {
//         intentName: 'Transaction History Intent',
//         functionName: transationHistoryFunction
//     },
//     {
//         intentName: 'List of Transaction Intent - yes',
//         functionName: investYes
//     },
//     {
//         intentName: 'List of Transaction Intent',
//         functionName: transactionFunction
//     },
//     {
//         intentName: 'Fund Explorer Intent',
//         functionName: fundExplorerFunction
//     },
//     {
//         intentName: 'Fund Categories Intent',
//         functionName: fundCategoriesFunction
//     },
//     {
//         intentName: 'Invest Intent',
//         functionName: investFunction
//     },
//     {
//         intentName: 'Mobile Number Intent',
//         functionName: mobileCaptureFunction
//     },
//     {
//         intentName: 'Folio Intent',
//         functionName: folioFunction
//     },
//     {
//         intentName: 'Transation History Ask Year Intent',
//         functionName: transationAskYearFunction
//     }
// ];

app.post('/dialogFlowService', express.json(), (request, response) => {
    const agent = new WebhookClient({ request, response });
    let intentMap = new Map();
    try {
        function welcomeCallback(agent) {
            console.log("Log: Welcome callback function"); 
           
            const content = {
                "text": "Hi, Welcome to ABC Mutual Fund services, you can ask about:",
                "reply_markup": {
                    "inline_keyboard": [
                        [
                            {
                                "text": "Portfolio valuation",
                                "callback_data": "portfolio",
                            },
                            {
                                "text": "Fund Explorer",
                                "callback_data": "fundexplorer",
                            },
                            {
                                "text": "Transaction History",
                                "callback_data": "transactionhistory",
                            },
                        ],
                    ],
                },
            }
            agent.add(new Payload(agent.TELEGRAM, content, { rawPayload: false, sendAsMessage: true }));
        }

        intentMap.set('Default Welcome Intent', welcomeCallback);
        agent.handleRequest(intentMap);
    } catch (error) {
        console.error('Webhook error:', error);
        response.status(500).send('Internal server error');
    }
});

app.listen(PORT);
console.log(`Server is up and listening at port: ${PORT}`);
