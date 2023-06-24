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

module.exports.handler = async (event) => {
  try {
    client = await snsClient();

    params = { 
        Message: "STRING_VALUE",
        TopicArn: SNS_NAME
      };

    data = await client.send(new PublishCommand(params));

    if (data != null && data != undefined) {
      console.log(data);
      return await bodyResponse(statusCode.OK, data);
    } else {
      return await bodyResponse(statusCode.OK, data);
    }
  } catch (error) {
    code = statusCode.INTERNAL_SERVER_ERROR;
    msg = `Error in PUBLISH TOPIC lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await bodyResponse(code, msg);
  }
};
