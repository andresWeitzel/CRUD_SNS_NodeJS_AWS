"use strict";
//External
const { ListTopicsCommand } = require("@aws-sdk/client-sns");
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

// Map para mantener los tópicos creados en memoria durante la sesión
const topicsMap = new Map();

// Función para agregar un tópico al Map
const addTopic = (topicName) => {
  const topicArn = `arn:aws:sns:us-east-1:123456789012:${topicName}`;
  topicsMap.set(topicName, {
    TopicArn: topicArn,
    TopicName: topicName
  });
};

// Función para obtener todos los tópicos del Map
const getTopics = () => {
  return Array.from(topicsMap.values());
};

module.exports.handler = async (event) => {
  try {
    client = await snsClient();

    data = await client.send(new ListTopicsCommand({}));
  
    // En modo offline, devolvemos los tópicos del Map
    if (process.env.IS_OFFLINE) {
      const offlineTopics = getTopics();
      
      // Si no hay tópicos en el Map, agregamos el tópico por defecto
      if (offlineTopics.length === 0) {
        addTopic(SNS_NAME);
      }
      
      console.log('Offline topics:', offlineTopics);
      return await bodyResponse(statusCode.OK, {
        message: 'Topics retrieved successfully (Offline)',
        topics: getTopics()
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
