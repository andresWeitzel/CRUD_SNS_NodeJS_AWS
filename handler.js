'use strict';
//External
const {SNSClient, PublishCommand, ListTopicsCommand } = require("@aws-sdk/client-sns");
//Environment Vars
const ACCESS_KEY = process.env.AWS_ACCESS_KEY_RANDOM_VALUE;
const SECRET_KEY = process.env.AWS_SECRET_KEY_RANDOM_VALUE;
const REGION = process.env.REGION;
const ENDPOINT = process.env.SNS_URL;

module.exports.createTopic = async (event) => {
  try{
    
    let snsClient = new SNSClient({
      region: REGION,
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY,
      //endpoint: ENDPOINT,
    });

      let params = {
        Message: "MESSAGE_TEXT", // MESSAGE_TEXT
        TopicArn: "TopicExample", //TOPIC_ARN
      };

      //const data = await snsClient.send(new PublishCommand(params));
      
    const data = await snsClient.send(new ListTopicsCommand({}));
      console.log("Success.",  data);
      return data; // For unit tests.


  }catch(e){
console.log(e);
  }
};
