"use strict";
//External
const { ListSubscriptionsByTopicCommand } = require("@aws-sdk/client-sns");
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

module.exports.handler = async (event) => {
  try {
    client = await snsClient();
    params = { TopicArn: SNS_NAME };

    // En modo offline, serverless-offline-sns devuelve los datos en el debug
    if (process.env.IS_OFFLINE) {
      // Simulamos la respuesta que vemos en los logs de debug
      const mockResponse = [{
        SubscriptionArn: `${SNS_NAME}:${Math.floor(Math.random() * 1000000)}`,
        Protocol: "http",
        TopicArn: SNS_NAME,
        Endpoint: "http://127.0.0.1:4567/list-topic-sns",
        Owner: "",
        Attributes: {
          Enabled: "true"
        }
      }];

      console.log('SNS Response (Offline):', JSON.stringify(mockResponse, null, 2));
      return await bodyResponse(statusCode.OK, mockResponse);
    }

    // En producción, usamos el SDK de AWS
    data = await client.send(new ListSubscriptionsByTopicCommand(params));
    console.log('SNS Response (Production):', JSON.stringify(data, null, 2));

    if (data && data.Subscriptions) {
      return await bodyResponse(statusCode.OK, data.Subscriptions);
    }

    return await bodyResponse(statusCode.BAD_REQUEST, 'Bad request, no subscriptions found for the topic');
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in LIST SUBSCRIPTION/S BY TOPIC/S lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await bodyResponse(code, msg);
  }
};
