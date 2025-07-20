"use strict";
//External
const fs = require('fs');
const path = require('path');
//Helpers
const { statusCode } = require("../../helpers/enums/http/statusCode");
const { bodyResponse } = require("../../helpers/http/bodyResponse");

module.exports.handler = async (event) => {
  try {
    // Solo disponible en modo offline
    if (!process.env.IS_OFFLINE) {
      return await bodyResponse(statusCode.BAD_REQUEST, {
        message: 'Debug endpoint only available in offline mode'
      });
    }

    const subscriptionsFile = path.join(__dirname, '../../../.serverless/offline-subscriptions.json');
    const topicsFile = path.join(__dirname, '../../topic/.serverless/offline-topics.json');
    
    let subscriptions = [];
    let topics = [];
    let fileContent = null;
    let fileStats = null;
    
    // Cargar suscripciones
    if (fs.existsSync(subscriptionsFile)) {
      try {
        subscriptions = JSON.parse(fs.readFileSync(subscriptionsFile, 'utf8'));
        fileContent = fs.readFileSync(subscriptionsFile, 'utf8');
        fileStats = fs.statSync(subscriptionsFile);
      } catch (error) {
        console.error('Error reading subscriptions file:', error);
      }
    }
    
    // Cargar tópicos
    if (fs.existsSync(topicsFile)) {
      try {
        topics = JSON.parse(fs.readFileSync(topicsFile, 'utf8'));
      } catch (error) {
        console.error('Error reading topics file:', error);
      }
    }
    
    // Agrupar suscripciones por tópico
    const subscriptionsByTopic = {};
    subscriptions.forEach(sub => {
      const topicName = sub.TopicArn.split(':').pop();
      if (!subscriptionsByTopic[topicName]) {
        subscriptionsByTopic[topicName] = [];
      }
      subscriptionsByTopic[topicName].push(sub);
    });
    
    console.log('Debug Subscriptions:', {
      subscriptionsCount: subscriptions.length,
      topicsCount: topics.length,
      subscriptionsByTopic
    });
    
    return await bodyResponse(statusCode.OK, {
      message: 'Debug information retrieved successfully',
      debug: {
        subscriptionsCount: subscriptions.length,
        topicsCount: topics.length,
        subscriptions: subscriptions,
        topics: topics,
        subscriptionsByTopic: subscriptionsByTopic,
        topicNames: topics.map(t => t.TopicName)
      },
      fileInfo: {
        subscriptionsFile: subscriptionsFile,
        topicsFile: topicsFile,
        subscriptionsFileExists: fs.existsSync(subscriptionsFile),
        topicsFileExists: fs.existsSync(topicsFile),
        subscriptionsFileContent: fileContent,
        subscriptionsFileStats: fileStats ? {
          size: fileStats.size,
          created: fileStats.birthtime,
          modified: fileStats.mtime
        } : null
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    const code = statusCode.INTERNAL_SERVER_ERROR;
    const msg = `Error in DEBUG SUBSCRIPTIONS lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await bodyResponse(code, msg);
  }
}; 