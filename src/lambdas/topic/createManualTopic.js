"use strict";
//External
const { CreateTopicCommand } = require("@aws-sdk/client-sns");
//Helpers
const { snsClient } = require("../../helpers/sns/config/snsClient");
const { statusCode } = require("../../helpers/enums/http/statusCode");
const { bodyResponse } = require("../../helpers/http/bodyResponse");
//Const-vars
let client;
let params = { Name: "ManualTopic" };
let data;
let code;
let msg;

module.exports.handler = async (event) => {
  try {
    client = await snsClient();

    data = await client.send(new CreateTopicCommand(params));

    if (data != null && data != undefined) {
      console.log(data);
      return await bodyResponse(statusCode.OK, data);
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
