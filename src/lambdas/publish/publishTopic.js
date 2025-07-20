"use strict";
//External
const { PublishCommand } = require("@aws-sdk/client-sns");
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
let message;

// Función para verificar si un tópico existe
const topicExists = (topicName) => {
  const topicsFile = path.join(__dirname, '../../../.serverless/offline-topics.json');
  try {
    if (fs.existsSync(topicsFile)) {
      const topics = JSON.parse(fs.readFileSync(topicsFile, 'utf8'));
      return topics.some(topic => topic.TopicName === topicName);
    }
  } catch (error) {
    console.error('Error checking topic existence:', error);
  }
  return false;
};

// Función para simular el envío de notificaciones en modo offline
const simulateNotificationDelivery = async (topicName, message, subject) => {
  const subscriptionsFile = path.join(__dirname, '../../../.serverless/offline-subscriptions.json');
  try {
    if (fs.existsSync(subscriptionsFile)) {
      const subscriptions = JSON.parse(fs.readFileSync(subscriptionsFile, 'utf8'));
      const topicSubscriptions = subscriptions.filter(sub => {
        const subTopicName = sub.TopicArn.split(':').pop();
        return subTopicName === topicName;
      });

      console.log(`Simulating delivery to ${topicSubscriptions.length} subscriptions for topic: ${topicName}`);

      // En un entorno real, aquí se enviarían las notificaciones HTTP
      // Por ahora, solo simulamos el proceso
      for (const subscription of topicSubscriptions) {
        console.log(`Would send notification to: ${subscription.Endpoint}`);
        console.log(`Message: ${message}`);
        console.log(`Subject: ${subject || 'No subject'}`);
      }

      return topicSubscriptions.length;
    }
  } catch (error) {
    console.error('Error simulating notification delivery:', error);
  }
  return 0;
};

module.exports.handler = async (event) => {
  try {
    client = await snsClient();

    // Get topic name and message from request body
    let topicName = SNS_NAME;
    if (event.body) {
      const body = JSON.parse(event.body);
      topicName = body.topicName || body.name || SNS_NAME;
      message = body.message || "Default message";
    } else {
      message = "Default message";
    }

    const topicArn = `arn:aws:sns:us-east-1:123456789012:${topicName}`;
    console.log('Publishing to topic:', { topicName, topicArn, message });

    if (process.env.IS_OFFLINE) {
      // Verificar si el tópico existe
      if (!topicExists(topicName)) {
        return await bodyResponse(statusCode.BAD_REQUEST, {
          message: `Topic '${topicName}' does not exist. Please create it first.`,
          availableTopics: await getAvailableTopics()
        });
      }

      // Simular el envío de notificaciones
      const deliveredCount = await simulateNotificationDelivery(topicName, message, event.body ? JSON.parse(event.body).subject : null);
      
      const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      console.log('Message published (Offline):', { messageId, topicName, deliveredCount });
      
      return await bodyResponse(statusCode.OK, {
        message: "Message published successfully (Offline)",
        messageId: messageId,
        topicName: topicName,
        topicArn: topicArn,
        deliveredToSubscriptions: deliveredCount,
        note: "Notifications were simulated. Check webhook endpoint for actual delivery."
      });
    }

    params = { 
      Message: message,
      TopicArn: topicArn
    };

    data = await client.send(new PublishCommand(params));

    if (data && data.MessageId) {
      console.log(data);
      return await bodyResponse(statusCode.OK, {
        message: "Message published successfully",
        messageId: data.MessageId,
        topicName: topicName,
        topicArn: topicArn
      });
    } else {
      return await bodyResponse(statusCode.BAD_REQUEST, 'Bad request, failed to publish a topic');
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    
    // Handle specific offline SNS error
    if (error.message && error.message.includes('Protocol \'lambda\' is not supported')) {
      msg = 'Warning: Lambda protocol is not supported in offline mode. Message was published but lambda functions will not be triggered.';
      code = statusCode.OK;
    } else {
      msg = `Error in PUBLISH TOPIC lambda. Caused by ${error}`;
    }
    
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
