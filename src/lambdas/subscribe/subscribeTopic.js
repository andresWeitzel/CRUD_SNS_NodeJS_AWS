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
const ENDPOINT = `http://localhost:4000/dev/list-topics`;

module.exports.handler = async (event) => {
  try {
    client = await snsClient();

    params = {
        Protocol: "lambda",
        TopicArn: SNS_NAME,
        //TopicArn: "ss",
        Endpoint: ENDPOINT,
        Attributes: {
          Enabled: 'true'
        }
      };

    data = await client.send(new SubscribeCommand(params));

    if (data != null && data != undefined) {
      console.log(data);
      return await bodyResponse(statusCode.OK, data);
  
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
