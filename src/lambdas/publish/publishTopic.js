"use strict";
//External
const { PublishCommand } = require("@aws-sdk/client-sns");
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

module.exports.handler = async (event) => {
  try {
    client = await snsClient();

    // Get message from request body
    if (event.body) {
      const body = JSON.parse(event.body);
      message = body.message || "Default message";
    } else {
      message = "Default message";
    }

    params = { 
      Message: message,
      TopicArn: SNS_NAME
    };

    data = await client.send(new PublishCommand(params));

    if (data && data.MessageId) {
      console.log(data);
      return await bodyResponse(statusCode.OK, {
        message: "Message published successfully",
        messageId: data.MessageId
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
