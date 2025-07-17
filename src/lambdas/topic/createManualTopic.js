"use strict";
//External
const { CreateTopicCommand } = require("@aws-sdk/client-sns");
//Helpers
const { snsClient } = require("../../helpers/sns/config/snsClient");
const { statusCode } = require("../../helpers/enums/http/statusCode");
const { bodyResponse } = require("../../helpers/http/bodyResponse");
const { addTopic } = require("./listTopics");
//Environment vars
const SNS_NAME = process.env.SNS_DEFAULT_NAME;
//Const-vars
let client;
let params;
let data;
let code;
let msg;

module.exports.handler = async (event) => {
  try {
    client = await snsClient();

    // Obtener el nombre del tópico del body
    const body = JSON.parse(event.body || '{}');
    const topicName = body.name || SNS_NAME;

    console.log('Creating topic with name:', topicName);

    if (process.env.IS_OFFLINE) {
      // En modo offline, agregamos el tópico al Map
      addTopic(topicName);
      const topicArn = `arn:aws:sns:us-east-1:123456789012:${topicName}`;
      
      console.log('Topic created (Offline):', { TopicArn: topicArn, TopicName: topicName });
      console.log('Topic added to Map successfully');
      
      return await bodyResponse(statusCode.OK, {
        message: 'Topic created successfully (Offline)',
        topicArn: topicArn,
        topicName: topicName,
        note: 'Topic is now available in the list-topics endpoint'
      });
    }

    params = { Name: topicName };
    data = await client.send(new CreateTopicCommand(params));

    if (data && data.TopicArn) {
      console.log('Topic created:', data);
      return await bodyResponse(statusCode.OK, {
        message: 'Topic created successfully',
        topicArn: data.TopicArn,
        topicName: topicName
      });
    } else {
      return await bodyResponse(statusCode.BAD_REQUEST, 'Bad request, failed to create a manual topic');
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in CREATE MANUAL TOPIC lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await bodyResponse(code, msg);
  }
};
