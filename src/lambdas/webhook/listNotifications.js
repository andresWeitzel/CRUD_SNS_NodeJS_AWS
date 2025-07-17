"use strict";
//External
const fs = require('fs');
const path = require('path');
//Helpers
const { statusCode } = require("../../helpers/enums/http/statusCode");
const { bodyResponse } = require("../../helpers/http/bodyResponse");

// Archivo de notificaciones
const NOTIFICATIONS_FILE = path.join(__dirname, '../../../.serverless/offline-notifications.json');

// Función para cargar notificaciones
const loadNotifications = () => {
  try {
    if (fs.existsSync(NOTIFICATIONS_FILE)) {
      const data = fs.readFileSync(NOTIFICATIONS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading notifications:', error);
  }
  return [];
};

module.exports.handler = async (event) => {
  try {
    // Solo disponible en modo offline
    if (!process.env.IS_OFFLINE) {
      return await bodyResponse(statusCode.BAD_REQUEST, {
        message: 'Notifications endpoint only available in offline mode'
      });
    }

    const notifications = loadNotifications();
    
    // Filtrar por tópico si se especifica
    let filteredNotifications = notifications;
    if (event.queryStringParameters && event.queryStringParameters.topicName) {
      const topicName = event.queryStringParameters.topicName;
      filteredNotifications = notifications.filter(n => n.topicName === topicName);
    }

    // Agrupar por tópico
    const notificationsByTopic = {};
    filteredNotifications.forEach(notification => {
      if (!notificationsByTopic[notification.topicName]) {
        notificationsByTopic[notification.topicName] = [];
      }
      notificationsByTopic[notification.topicName].push(notification);
    });

    console.log('Notifications found:', {
      total: notifications.length,
      filtered: filteredNotifications.length,
      byTopic: Object.keys(notificationsByTopic)
    });

    return await bodyResponse(statusCode.OK, {
      message: 'Notifications retrieved successfully',
      totalNotifications: notifications.length,
      filteredNotifications: filteredNotifications.length,
      notifications: filteredNotifications,
      notificationsByTopic: notificationsByTopic,
      filePath: NOTIFICATIONS_FILE,
      fileExists: fs.existsSync(NOTIFICATIONS_FILE)
    });

  } catch (error) {
    const code = statusCode.INTERNAL_SERVER_ERROR;
    const msg = `Error in LIST NOTIFICATIONS lambda. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await bodyResponse(code, msg);
  }
}; 