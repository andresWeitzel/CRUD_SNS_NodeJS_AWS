"use strict";
//External
const { ListTopicsCommand } = require("@aws-sdk/client-sns");
const fs = require('fs');
const path = require('path');
//Helpers
const { snsClient } = require("../../helpers/sns/config/snsClient");
const { statusCode } = require("../../helpers/enums/http/statusCode");
const { bodyResponse } = require("../../helpers/http/bodyResponse");
//Environment vars
const SNS_NAME = process.env.SNS_DEFAULT_NAME;
const SNS_DEFAULT_ARN = process.env.SNS_DEFAULT_ARN;
//Const-vars
let client;
let data;
let code;
let msg;

// Archivo para persistir tópicos en modo offline
const TOPICS_FILE = path.join(__dirname, '../../../.serverless/offline-topics.json');

// Función para cargar tópicos desde el archivo
const loadTopicsFromFile = () => {
  try {
    if (fs.existsSync(TOPICS_FILE)) {
      const data = fs.readFileSync(TOPICS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading topics from file:', error);
  }
  return [];
};

// Función para guardar tópicos en el archivo
const saveTopicsToFile = (topics) => {
  try {
    // Asegurar que el directorio existe
    const dir = path.dirname(TOPICS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(TOPICS_FILE, JSON.stringify(topics, null, 2));
    console.log('Topics saved to file:', TOPICS_FILE);
  } catch (error) {
    console.error('Error saving topics to file:', error);
  }
};

// Función para agregar un tópico
const addTopic = (topicName) => {
  const topicArn = `arn:aws:sns:us-east-1:123456789012:${topicName}`;
  const newTopic = {
    TopicArn: topicArn,
    TopicName: topicName
  };
  
  const topics = loadTopicsFromFile();
  
  // Verificar si el tópico ya existe
  const existingIndex = topics.findIndex(topic => topic.TopicName === topicName);
  if (existingIndex >= 0) {
    topics[existingIndex] = newTopic;
  } else {
    topics.push(newTopic);
  }
  
  saveTopicsToFile(topics);
  console.log(`Topic added: ${topicName}`);
  return newTopic;
};

// Función para obtener todos los tópicos
const getTopics = () => {
  return loadTopicsFromFile();
};

// Función para debug - mostrar el estado actual
const debugTopicsMap = () => {
  const topics = getTopics();
  return {
    topicsCount: topics.length,
    topics: topics,
    topicNames: topics.map(t => t.TopicName),
    filePath: TOPICS_FILE,
    fileExists: fs.existsSync(TOPICS_FILE)
  };
};

module.exports.handler = async (event) => {
  try {
    client = await snsClient();

    data = await client.send(new ListTopicsCommand({}));
  
    // En modo offline, devolvemos los tópicos del archivo
    if (process.env.IS_OFFLINE) {
      const offlineTopics = getTopics();
      
      console.log('Current topics from file:', offlineTopics);
      
      return await bodyResponse(statusCode.OK, {
        message: 'Topics retrieved successfully (Offline)',
        topics: offlineTopics,
        totalTopics: offlineTopics.length
      });
    }

    // En producción, usamos la respuesta real
    if (data && data.Topics) {
      console.log('Topics found:', data.Topics);
      return await bodyResponse(statusCode.OK, {
        message: 'Topics retrieved successfully',
        topics: data.Topics
      });
    } else {
      return await bodyResponse(statusCode.BAD_REQUEST, 'Bad request, failed to list all topics');
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in LIST TOPICS lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await bodyResponse(code, msg);
  }
};

// Exportar las funciones para que puedan ser usadas por createManualTopic
module.exports.addTopic = addTopic;
module.exports.getTopics = getTopics;
module.exports.debugTopicsMap = debugTopicsMap;
