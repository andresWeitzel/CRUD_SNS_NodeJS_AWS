"use strict";
//External
const fs = require('fs');
const path = require('path');
//Helpers
const { statusCode } = require("../../helpers/enums/http/statusCode");
const { bodyResponse } = require("../../helpers/http/bodyResponse");
const { debugTopicsMap } = require("./listTopics");

module.exports.handler = async (event) => {
  try {
    // Solo disponible en modo offline
    if (!process.env.IS_OFFLINE) {
      return await bodyResponse(statusCode.BAD_REQUEST, {
        message: 'Debug endpoint only available in offline mode'
      });
    }

    const debugInfo = debugTopicsMap();
    
    // Información adicional del archivo
    const topicsFile = path.join(__dirname, '../../../.serverless/offline-topics.json');
    let fileContent = null;
    let fileStats = null;
    
    if (fs.existsSync(topicsFile)) {
      try {
        fileContent = fs.readFileSync(topicsFile, 'utf8');
        fileStats = fs.statSync(topicsFile);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
    
    console.log('Debug Topics File:', debugInfo);
    
    return await bodyResponse(statusCode.OK, {
      message: 'Debug information retrieved successfully',
      debug: debugInfo,
      fileInfo: {
        content: fileContent,
        stats: fileStats ? {
          size: fileStats.size,
          created: fileStats.birthtime,
          modified: fileStats.mtime
        } : null
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    const code = statusCode.INTERNAL_SERVER_ERROR;
    const msg = `Error in DEBUG TOPICS lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await bodyResponse(code, msg);
  }
}; 