"use strict";
//External
const fs = require('fs');
const path = require('path');
//Helpers
const { statusCode } = require("../../helpers/enums/http/statusCode");
const { bodyResponse } = require("../../helpers/http/bodyResponse");

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

// Función para cargar tópicos desde el archivo
const loadTopicsFromFile = () => {
  const topicsFile = path.join(__dirname, '../../../.serverless/offline-topics.json');
  try {
    if (fs.existsSync(topicsFile)) {
      const data = fs.readFileSync(topicsFile, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading topics from file:', error);
  }
  return [];
};

module.exports.handler = async (event) => {
  try {
    // Solo disponible en modo offline
    if (!process.env.IS_OFFLINE) {
      return await bodyResponse(statusCode.BAD_REQUEST, {
        message: 'List all subscriptions endpoint only available in offline mode'
      });
    }

    // Obtener parámetros de filtrado
    const topicName = event.queryStringParameters?.topicName;
    const protocol = event.queryStringParameters?.protocol;

    console.log('Listing all subscriptions with filters:', { topicName, protocol });

    // Cargar todas las suscripciones
    const allSubscriptions = loadSubscriptionsFromFile();
    const allTopics = loadTopicsFromFile();

    // Aplicar filtros si se especifican
    let filteredSubscriptions = allSubscriptions;

    if (topicName) {
      const topicArn = `arn:aws:sns:us-east-1:123456789012:${topicName}`;
      filteredSubscriptions = filteredSubscriptions.filter(sub => sub.TopicArn === topicArn);
    }

    if (protocol) {
      filteredSubscriptions = filteredSubscriptions.filter(sub => sub.Protocol === protocol);
    }

    // Agrupar suscripciones por tópico
    const subscriptionsByTopic = {};
    filteredSubscriptions.forEach(subscription => {
      const topicNameFromArn = subscription.TopicArn.split(':').pop();
      if (!subscriptionsByTopic[topicNameFromArn]) {
        subscriptionsByTopic[topicNameFromArn] = [];
      }
      subscriptionsByTopic[topicNameFromArn].push(subscription);
    });

    // Agrupar por protocolo
    const subscriptionsByProtocol = {};
    filteredSubscriptions.forEach(subscription => {
      const protocol = subscription.Protocol;
      if (!subscriptionsByProtocol[protocol]) {
        subscriptionsByProtocol[protocol] = [];
      }
      subscriptionsByProtocol[protocol].push(subscription);
    });

    // Estadísticas
    const stats = {
      totalSubscriptions: allSubscriptions.length,
      filteredSubscriptions: filteredSubscriptions.length,
      totalTopics: allTopics.length,
      topicsWithSubscriptions: Object.keys(subscriptionsByTopic).length,
      protocolsUsed: Object.keys(subscriptionsByProtocol),
      subscriptionsByTopicCount: Object.fromEntries(
        Object.entries(subscriptionsByTopic).map(([topic, subs]) => [topic, subs.length])
      ),
      subscriptionsByProtocolCount: Object.fromEntries(
        Object.entries(subscriptionsByProtocol).map(([protocol, subs]) => [protocol, subs.length])
      )
    };

    console.log('All subscriptions retrieved:', {
      total: stats.totalSubscriptions,
      filtered: stats.filteredSubscriptions,
      byTopic: stats.subscriptionsByTopicCount
    });

    return await bodyResponse(statusCode.OK, {
      message: 'All subscriptions retrieved successfully',
      filters: {
        topicName: topicName || 'none',
        protocol: protocol || 'none'
      },
      stats: stats,
      subscriptions: filteredSubscriptions,
      subscriptionsByTopic: subscriptionsByTopic,
      subscriptionsByProtocol: subscriptionsByProtocol,
      allTopics: allTopics.map(topic => ({
        topicName: topic.TopicName,
        topicArn: topic.TopicArn,
        subscriptionCount: subscriptionsByTopic[topic.TopicName]?.length || 0
      })),
      fileInfo: {
        subscriptionsFile: SUBSCRIPTIONS_FILE,
        subscriptionsFileExists: fs.existsSync(SUBSCRIPTIONS_FILE),
        topicsFile: path.join(__dirname, '../../../.serverless/offline-topics.json'),
        topicsFileExists: fs.existsSync(path.join(__dirname, '../../../.serverless/offline-topics.json'))
      }
    });

  } catch (error) {
    const code = statusCode.INTERNAL_SERVER_ERROR;
    const msg = `Error in LIST ALL SUBSCRIPTIONS lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await bodyResponse(code, msg);
  }
}; 