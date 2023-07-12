// Cria server API

import express from 'express';
import bodyParser from 'body-parser';
import Producer from './producer.js';

const app = express();
app.use(bodyParser.json('application/json'));      // recebe requisições em JSON 

const producer = new Producer();
app.post('/sendLog', async (req, res, next) => {      // envia requisição de log com método POST
    await producer.publishMessage(req.body.logType, req.body.message);     // método publishMessage da class Producer requer bodyData (logDetails)
    res.send();
});

app.listen(3000, () => {
    console.log(`Servidor na porta http://localhost:3000`);     // define porta de saída do servidor
});
