// Configuração da conexão ao server

/* module.exports = {
    rabbitMQ: {
        url : 'http://localhost:15672/',
        exchangeName : 'logExchange'
    }
} */

const rabbitMQ = {
    url : "amqp://localhost",
    exchangeName : "logExchange"
}

export default rabbitMQ;