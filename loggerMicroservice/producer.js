// Conectar o server RabbitMQ

import amqp from 'amqplib';
import rabbitMQ from './config.js';

class Producer {    // classe produtora de mensagens
    channel;

    async createChannel() {     //cria canal
        const connection = await amqp.connect(rabbitMQ.url);     // associa o canal a configuração
        this.channel = await connection.createChannel();       // estabelece conexão e cria o canal da classe com config especificada
    }

    async publishMessage(routingKey, message) {       // publica as mensagens do logger
        if (!this.channel) {       // verifica SE canal existe
            await this.createChannel();      // cria canal SE não existir
        }

        const exchangeName = rabbitMQ.exchangeName;      // const salva endereço config de conexão com logExchange
        await this.channel.assertExchange(exchangeName, 'direct');      // conecta o canal com logExchange

        const logDetails = {    // objeto modelo mensagem
            logType: routingKey,
            message: message,
            dateTime: new Date()
        }
        await this.channel.publish(     // publica a mensagem
            exchangeName,      // logExchange da mensagem publicada
            routingKey,        // chave de rota com API da mensagem publicada
            Buffer.from(
                JSON.stringify(logDetails)
            )      // buffer pega objeto "logDetails" em JSON e publica mensagem como string
        );

        console.log(`A mensagem ${message} foi enviada para o exchange ${exchangeName}.`);     // exibe no console em qual exchange a mensagem foi enviada
    }
}

export default Producer;