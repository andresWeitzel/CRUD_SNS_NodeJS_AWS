"use strict";
//External
const { SubscribeCommand } = require("@aws-sdk/client-sns");
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
let protocol;
let endpoint;

// Archivo para persistir suscripciones en modo offline
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

// Función para guardar suscripciones en el archivo
const saveSubscriptionsToFile = (subscriptions) => {
  try {
    const dir = path.dirname(SUBSCRIPTIONS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(SUBSCRIPTIONS_FILE, JSON.stringify(subscriptions, null, 2));
    console.log('Subscriptions saved to file:', SUBSCRIPTIONS_FILE);
  } catch (error) {
    console.error('Error saving subscriptions to file:', error);
  }
};

// Función para verificar si un tópico existe
const topicExists = (topicName) => {
  const topicsFile = path.join(__dirname, '../../../.serverless/offline-topics.json');
  try {
    if (fs.existsSync(topicsFile)) {
      const topics = JSON.parse(fs.readFileSync(topicsFile, 'utf8'));
      console.log('Checking topic existence:', { topicName, availableTopics: topics.map(t => t.TopicName) });
      return topics.some(topic => topic.TopicName === topicName);
    }
  } catch (error) {
    console.error('Error checking topic existence:', error);
  }
  return false;
};

module.exports.handler = async (event) => {
  try {
    client = await snsClient();

    // Get topic name, protocol and endpoint from request body
    let topicName, topicArn;
    if (event.body) {
      const body = JSON.parse(event.body);
      topicName = body.topicName || body.name || SNS_NAME;
      protocol = body.protocol || "http";
      // Usar el nuevo webhook endpoint
      endpoint = body.endpoint || `http://127.0.0.1:4000/dev/webhook/${topicName}`;
    } else {
      topicName = SNS_NAME;
      protocol = "http";
      endpoint = `http://127.0.0.1:4000/dev/webhook/${topicName}`;
    }

    // Construir el ARN del tópico
    topicArn = `arn:aws:sns:us-east-1:123456789012:${topicName}`;

    console.log('Subscribing to topic:', { topicName, topicArn, protocol, endpoint });

    if (process.env.IS_OFFLINE) {
      // Verificar si el tópico existe
      if (!topicExists(topicName)) {
        return await bodyResponse(statusCode.BAD_REQUEST, {
          message: `Topic '${topicName}' does not exist. Please create it first.`,
          availableTopics: await getAvailableTopics()
        });
      }

      // En modo offline, guardamos la suscripción en el archivo
      const subscriptions = loadSubscriptionsFromFile();
      const subscriptionArn = `arn:aws:sns:us-east-1:123456789012:${topicName}:${Date.now()}`;
      
      const newSubscription = {
        SubscriptionArn: subscriptionArn,
        TopicArn: topicArn,
        Protocol: protocol,
        Endpoint: endpoint,
        Attributes: {
          Enabled: 'true'
        },
        createdAt: new Date().toISOString()
      };

      subscriptions.push(newSubscription);
      saveSubscriptionsToFile(subscriptions);

      console.log('Subscription created (Offline):', newSubscription);
      
      return await bodyResponse(statusCode.OK, {
        message: "Successfully subscribed to topic (Offline)",
        subscriptionArn: subscriptionArn,
        topicName: topicName,
        topicArn: topicArn,
        protocol: protocol,
        endpoint: endpoint
      });
    }

    params = {
      Protocol: protocol,
      TopicArn: topicArn,
      Endpoint: endpoint,
      Attributes: {
        Enabled: 'true'
      }
    };

    data = await client.send(new SubscribeCommand(params));

    if (data && data.SubscriptionArn) {
      console.log(data);
      return await bodyResponse(statusCode.OK, {
        message: "Successfully subscribed to topic",
        subscriptionArn: data.SubscriptionArn
      });
    } else {
      return await bodyResponse(statusCode.BAD_REQUEST, 'Bad request, failed to subscribe a topic');
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in SUBSCRIBE TOPIC lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await bodyResponse(code, msg);
  }
};

// Función auxiliar para obtener tópicos disponibles
const getAvailableTopics = async () => {
  const topicsFile = path.join(__dirname, '../../../.serverless/offline-topics.json');
  try {
    if (fs.existsSync(topicsFile)) {
      const topics = JSON.parse(fs.readFileSync(topicsFile, 'utf8'));
      return topics.map(topic => topic.TopicName);
    }
  } catch (error) {
    console.error('Error getting available topics:', error);
  }
  return [];
};
