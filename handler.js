'use strict';
//External
const { PublishCommand, ListTopicsCommand, CreateTopicCommand } = require("@aws-sdk/client-sns");
//Helpers
const { snsClient } = require("./src/helpers/sns/config/snsClient");
//Environment Vars
const ACCESS_KEY = process.env.AWS_ACCESS_KEY_RANDOM_VALUE;
const SECRET_KEY = process.env.AWS_SECRET_KEY_RANDOM_VALUE;
const REGION = process.env.REGION;
const SNS_ENDPOINT = process.env.SNS_ENDPOINT;
const SNS_ARN = process.env.SNS_DEFAULT_ARN;
//Const-vars
let client;




module.exports.listTopics = async (event) => {
  try{
    
    let snsClient = new SNSClient({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
      endpoint: SNS_ENDPOINT,
      region: REGION,
    });
      
    const data = await snsClient.send(new ListTopicsCommand({}));

    let bodyResponse = JSON.stringify(data, null, 2)
      
      if (data != null) {
        console.log(bodyResponse);
        return {
          statusCode: 200,
          body: bodyResponse
            };
      } else {
        return {
            statusCode: 400,
            body: 'Bad request'
              };
      }


  }catch(e){
console.log(e);
  }
};




module.exports.publishTopic = async (event) => {
  try{
    
    let snsClient = new SNSClient({
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
      endpoint: SNS_ENDPOINT,
      region: REGION,
    });


      let params = {
        Message: "MESSAGE_TEXT",
        TopicArn: SNS_ARN,
      };

      const data = await snsClient.send(new PublishCommand(params));
      
    let bodyResponse = JSON.stringify(data, null, 2)
      
      if (data != null) {
        console.log(bodyResponse);
        return {
          statusCode: 200,
          body: bodyResponse
            };
      } else {
        return {
            statusCode: 400,
            body: 'Bad request'
              };
      }


  }catch(e){
console.log(e);
  }
};