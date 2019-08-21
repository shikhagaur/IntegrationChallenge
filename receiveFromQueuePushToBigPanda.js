#!/usr/bin/env node
var bigPandaRequest = require('./BigPandaAccess');
var appKeybigPanda = 'bb0eb030296150f70753b85e331f9d83'; //API key to access BigPanda REST API
var location = require('./readLocationsFromFile');
var amqp = require('amqplib/callback_api');

//connect to rabbitMQ server running on localhost
amqp.connect('amqp://localhost', function(errConnectingToRabbitMQ, connection) {
    if (errConnectingToRabbitMQ) {
        console.log(errConnectingToRabbitMQ);
    }

    //create a channel on the connection
    connection.createChannel(function(errCreatingChannel, channel) {
        if (errCreatingChannel) {
            console.log(errCreatingChannel);
        }

        var queue = 'weatherData';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        //setup a consumer for the queue
        channel.consume(queue, function(msg) {
          //send the message/alert from the queue to BigPanda
            bigPandaRequest.SendBigPandaRequest(JSON.parse(msg.content), appKeybigPanda, location.readLocation());
            console.log(" [x] Received %s", msg.content);//.toString())[0]);
            channel.ack(msg);
        }, {
            noAck: false
        });
    });
});
