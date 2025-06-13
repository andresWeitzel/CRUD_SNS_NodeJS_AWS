'use strict';
//External
const {SNSClient} = require("@aws-sdk/client-sns");
//Environment Vars
const ACCESS_KEY = process.env.AWS_ACCESS_KEY_RANDOM_VALUE;
const SECRET_KEY = process.env.AWS_SECRET_KEY_RANDOM_VALUE;
const REGION = process.env.AWS_REGION;
const SNS_ENDPOINT = process.env.SNS_ENDPOINT;
//Const-vars
let client;

/**
 * @description creating a sns client
 * @returns the client created
 */
const snsClient = async () => {
    try {
        // Configuración para modo offline
        if (process.env.IS_OFFLINE) {
            client = new SNSClient({
                endpoint: SNS_ENDPOINT,
                region: REGION,
                credentials: {
                    accessKeyId: 'LOCAL',
                    secretAccessKey: 'LOCAL'
                }
            });
        } else {
            // Configuración para producción
            client = new SNSClient({
                accessKeyId: ACCESS_KEY,
                secretAccessKey: SECRET_KEY,
                region: REGION
            });
        }

        return client;
    } catch (error) {
        console.error(`ERROR in snsClient() function. Caused by ${error} . Specific stack is ${error.stack} `);
        throw error;
    }
}

module.exports = {
    snsClient
}