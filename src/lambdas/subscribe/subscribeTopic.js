"use strict";
//External
const { SubscribeCommand } = require("@aws-sdk/client-sns");
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

module.exports.handler = async (event) => {
  try {
    client = await snsClient();

    // Get protocol and endpoint from request body
    if (event.body) {
      const body = JSON.parse(event.body);
      protocol = body.protocol || "http";
      endpoint = body.endpoint || `http://127.0.0.1:4567/list-topic-sns`;
    } else {
      protocol = "http";
      endpoint = `http://127.0.0.1:4567/list-topic-sns`;
    }

    params = {
      Protocol: protocol,
      TopicArn: SNS_NAME,
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
