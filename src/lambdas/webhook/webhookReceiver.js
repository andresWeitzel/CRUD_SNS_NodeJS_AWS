"use strict";
//External
const fs = require('fs');
const path = require('path');
//Helpers
const { statusCode } = require("../../helpers/enums/http/statusCode");
const { bodyResponse } = require("../../helpers/http/bodyResponse");

// Archivo para guardar las notificaciones recibidas
const NOTIFICATIONS_FILE = path.join(__dirname, '../../../.serverless/offline-notifications.json');

// Función para guardar notificaciones
const saveNotification = (notification) => {
  try {
    const dir = path.dirname(NOTIFICATIONS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    let notifications = [];
    if (fs.existsSync(NOTIFICATIONS_FILE)) {
      notifications = JSON.parse(fs.readFileSync(NOTIFICATIONS_FILE, 'utf8'));
    }
    
    notifications.push({
      ...notification,
      receivedAt: new Date().toISOString()
    });
    
    fs.writeFileSync(NOTIFICATIONS_FILE, JSON.stringify(notifications, null, 2));
    console.log('Notification saved to file:', NOTIFICATIONS_FILE);
  } catch (error) {
    console.error('Error saving notification:', error);
  }
};

module.exports.handler = async (event) => {
  try {
    // Obtener el nombre del tópico de los path parameters
    const topicName = event.pathParameters?.topicName || 'unknown';
    
    console.log('Webhook received for topic:', topicName);
    console.log('Event body:', event.body);
    console.log('Headers:', event.headers);

    // Parsear el body de la notificación
    let notificationData = {};
    try {
      if (event.body) {
        notificationData = JSON.parse(event.body);
      }
    } catch (error) {
      console.error('Error parsing notification body:', error);
    }

    // Guardar la notificación
    const notification = {
      topicName: topicName,
      messageId: notificationData.MessageId || `msg_${Date.now()}`,
      message: notificationData.Message || 'No message content',
      subject: notificationData.Subject || 'No subject',
      timestamp: notificationData.Timestamp || new Date().toISOString(),
      headers: event.headers,
      rawBody: event.body
    };

    saveNotification(notification);

    // Responder con éxito (SNS espera un 200 OK)
    return await bodyResponse(statusCode.OK, {
      message: 'Notification received successfully',
      topicName: topicName,
      messageId: notification.messageId,
      timestamp: notification.receivedAt
    });

  } catch (error) {
    console.error('Error in webhook receiver:', error);
    
    // Aún así devolver 200 para que SNS no reintente
    return await bodyResponse(statusCode.OK, {
      message: 'Notification processed (with errors)',
      error: error.message
    });
  }
}; 