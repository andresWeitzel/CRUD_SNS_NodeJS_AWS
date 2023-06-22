'use strict';
//External
const {SNSClient} = require("@aws-sdk/client-sns");
//Environment Vars
const ACCESS_KEY = process.env.AWS_ACCESS_KEY_RANDOM_VALUE;
const SECRET_KEY = process.env.AWS_SECRET_KEY_RANDOM_VALUE;
const REGION = process.env.REGION;
const SNS_ENDPOINT = process.env.SNS_ENDPOINT;
//Const-vars
let client;

/**
 * @description creating a sns client
 * @returns the client created
 */
const snsClient = async () => {
    try {
             
    client = new SNSClient({
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_KEY,
        endpoint: SNS_ENDPOINT,
        region: REGION,
      });

      return client;

    } catch (error) {
        console.error(`ERROR in snsClient() function. Caused by ${error} . Specific stack is ${error.stack} `);
    }
}

module.exports={
    snsClient
}