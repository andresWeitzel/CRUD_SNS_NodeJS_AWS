"use strict";
//External
const { ListSubscriptionsByTopicCommand } = require("@aws-sdk/client-sns");
const fs = require('fs');
const path = require('path');
//Helpers
const { snsClient } = require("../../helpers/sns/config/snsClient");
const { statusCode } = require("../../helpers/enums/http/statusCode");
const { bodyResponse } = require("../../helpers/http/bodyResponse");
//Environment vars
const SNS_NAME = process.env.SNS_DEFAULT_NAME;
//Const-vars
let client;
let params;
let data;
let code;
let msg;

// Archivo para cargar suscripciones en modo offline
const SUBSCRIPTIONS_FILE = path.join(__dirname, '../../../.serverless/offline-subscriptions.json');

// Función para cargar suscripciones desde el archivo
const loadSubscriptionsFromFile = () => {
  try {
    if (fs.existsSync(SUBSCRIPTIONS_FILE)) {
      const data = fs.readFileSync(SUBSCRIPTIONS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading subscriptions from file:', error);
  }
  return [];
};

module.exports.handler = async (event) => {
  try {
    client = await snsClient();

    // Obtener el nombre del tópico de los query parameters o usar el por defecto
    let topicName = SNS_NAME;
    if (event.queryStringParameters && event.queryStringParameters.topicName) {
      topicName = event.queryStringParameters.topicName;
    }

    const topicArn = `arn:aws:sns:us-east-1:123456789012:${topicName}`;
    console.log('Listing subscriptions for topic:', { topicName, topicArn });

    // En modo offline, leemos desde el archivo
    if (process.env.IS_OFFLINE) {
      const allSubscriptions = loadSubscriptionsFromFile();
      const topicSubscriptions = allSubscriptions.filter(sub => sub.TopicArn === topicArn);

      console.log('Subscriptions found (Offline):', topicSubscriptions);
      
      return await bodyResponse(statusCode.OK, {
        message: 'Subscriptions retrieved successfully (Offline)',
        topicName: topicName,
        topicArn: topicArn,
        subscriptions: topicSubscriptions,
        totalSubscriptions: topicSubscriptions.length
      });
    }

    // En producción, usamos el SDK de AWS
    params = { TopicArn: topicArn };
    data = await client.send(new ListSubscriptionsByTopicCommand(params));
    console.log('SNS Response (Production):', JSON.stringify(data, null, 2));

    if (data && data.Subscriptions) {
      return await bodyResponse(statusCode.OK, {
        message: 'Subscriptions retrieved successfully',
        topicName: topicName,
        topicArn: topicArn,
        subscriptions: data.Subscriptions,
        totalSubscriptions: data.Subscriptions.length
      });
    }

    return await bodyResponse(statusCode.BAD_REQUEST, {
      message: 'Bad request, no subscriptions found for the topic',
      topicName: topicName,
      topicArn: topicArn
    });
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in LIST SUBSCRIPTION/S BY TOPIC/S lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await bodyResponse(code, msg);
  }
};
