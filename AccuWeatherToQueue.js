#!/usr/bin/env node
var location = require('./readLocationsFromFile');
var apiKeyAccuWeather = 'yjVovDAkqXCH1o53gDhfZdP5d1MxtHz5';
var acuWeatherRequest = require('./AccuWeatherAccess');

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', function(errConnectingToRabbitMQ, connection) {
    if (errConnectingToRabbitMQ) {
        //throw error0;
        console.error("[AMQP]", errConnectingToRabbitMQ.message);
      //  return setTimeout(start, 1000);
    }
    //create a channel on the connection
    connection.createChannel(function(errCreatingChannel, channel) {
        if (errCreatingChannel) {
            //throw error1;
            console.error("[AMQP createChannel]", errCreatingChannel.message);
        }

        var queue = 'weatherData';

        //assert a queue into existence
        channel.assertQueue(queue, {
            durable: false
        });

        //The message to be sent over the queue is the response from acuWeatherRequest.SendAccuWeatherRequest function
        acuWeatherRequest.SendAccuWeatherRequest(location.readLocation(), apiKeyAccuWeather)
        .then((accuWeatherresponse)=> {channel.sendToQueue(queue, Buffer.from(JSON.stringify(accuWeatherresponse)));console.log(" [x] Sent %s", JSON.stringify(accuWeatherresponse));})
        .catch((error) => console.log(error)); //use Then to chain


    });
    setTimeout(function() {
        connection.close();
        process.exit(0);
    }, 500);
});
