![Index app](../doc/assets/sns-example.png)
<div align="right">
  <img width="25" height="25" src="../doc/assets/icons/devops/png/aws.png" />
  <img width="25" height="25" src="../doc/assets/icons/aws/png/lambda.png" />
  <img width="27" height="27" src="../doc/assets/icons/devops/png/postman.png" />
  <img width="29" height="27" src="../doc/assets/icons/devops/png/git.png" />
  <img width="28" height="27" src="../doc/assets/icons/aws/png/api-gateway.png" />
  <img width="27" height="25" src="../doc/assets/icons/aws/png/parameter-store.png" />
  <img width="27" height="27" src="../doc/assets/icons/backend/javascript-typescript/png/nodejs.png" />
</div>

<br>

<br>


<div align="right"> 
  <a href="./README.es.md">
    <img src="../doc/assets/translation/arg-flag.jpg" width="65" height="40" />
  </a> 
  <a href="../README.md">
    <img src="../doc/assets/translation/eeuu-flag.jpg" width="65" height="40" />
  </a> 
</div>

<br>

<div align="center">

# CRUD SNS Nodejs AWS ![(status-completed)](../doc/assets/icons/badges/status-completed.svg)

</div>  

CRUD serverless para Amazon SNS con Node.js y Serverless Framework. Permite crear, listar, publicar y suscribirse a tópicos SNS, con autenticación por API Key, persistencia local en archivos JSON, endpoints de debugging y simulación de webhooks. Incluye integración con SSM Parameter Store y soporte para desarrollo local con serverless-offline.

*   [Postman Collection](../postman/collections/CRUD_SNS_AWS.postman_collection.json)   
*   [Playlist functionality test](https://www.youtube.com/playlist?list=PLCl11UFjHurDBEKoDX8LBe5PxRlUzkrXO) <a href="https://www.youtube.com/playlist?list=PLCl11UFjHurDBEKoDX8LBe5PxRlUzkrXO" target="_blank"> <img src="../doc/assets/social-networks/yt.png" width="25" /> </a>

<br>

## Índice 📜

<details>
 <summary> Ver </summary>
 
 <br>
 
### Sección 1) Descripción, Tecnologías y Referencias

 - [1.0) Descripción del Proyecto.](#10-descripción-)
 - [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
 - [1.2) Configurar el proyecto serverless desde cero](#12-configurar-el-proyecto-serverless-desde-cero-)
 - [1.3) Tecnologías.](#13-tecnologías-)

### Sección 2) Endpoints y Recursos
 
 - [2.0) EndPoints y recursos.](#20-endpoints-y-recursos-)

### Sección 3) Prueba de funcionalidad y Referencias
 
 - [3.0) Prueba de funcionalidad.](#30-prueba-de-funcionalidad-)
 - [3.1) Referencias.](#31-referencias-)

<br>

</details>


<br>

## Sección 1) Descripción, Tecnologías y Dependencias 


### 1.0) Descripción [🔝](#índice-) 

<details>
  <summary>Ver</summary>
 
 <br>

### 1.0.0) Descripción General

Este proyecto implementa un sistema CRUD completo para Amazon Simple Notification Service (SNS) utilizando Node.js y el Serverless Framework. El sistema permite la gestión completa de tópicos SNS, incluyendo su creación, listado, publicación de mensajes y gestión de suscripciones.

Características principales:
- Implementación de arquitectura serverless utilizando AWS Lambda
- Integración con Amazon SNS para mensajería pub/sub
- API RESTful protegida con API Key
- Gestión de configuración mediante SSM Parameter Store
- Soporte para desarrollo local con serverless-offline
- Manejo de eventos SNS y HTTP
- Implementación de patrones de diseño para mensajería asíncrona
- **Sistema de Webhooks**: Endpoints para recibir notificaciones SNS en modo offline
- **Persistencia de Datos**: Almacenamiento en archivos JSON para tópicos, suscripciones y notificaciones
- **Endpoints de Debug**: Herramientas para troubleshooting y monitoreo del estado del sistema
  - `/debug-topics`: Estado completo de tópicos con estadísticas de archivos
  - `/debug-subscriptions`: Estado completo de suscripciones con agrupación por tópico
  - `/list-notifications`: Notificaciones recibidas con filtrado y agrupación
- **Gestión de Tópicos**: Endpoints para crear y listar tópicos
  - `/create-manual-topic`: Crear nuevos tópicos SNS
  - `/list-topics`: Listar todos los tópicos disponibles
  - `/debug-topics`: Debug completo del estado de tópicos
- **Gestión de Suscripciones**: Endpoints para suscribirse y listar suscripciones
  - `/subscribe-topic`: Suscribirse a un tópico específico
  - `/list-all-subscriptions`: Todas las suscripciones con filtrado y estadísticas
  - `/list-subscription-topic/{topicName}`: Suscripciones de un tópico específico
- **Publicación de Mensajes**: Endpoints para publicar mensajes
  - `/publish-topic`: Publicar mensajes en un tópico específico
- **Webhooks y Notificaciones**: Endpoints para recibir y listar notificaciones
  - `/webhook/{topicName}`: Recibir notificaciones SNS (modo offline)
- **Validaciones Mejoradas**: Verificación de existencia de tópicos y validación de parámetros
- **Simulación Realista**: Comportamiento más cercano al SNS real con persistencia entre reinicios
- **Manejo de Errores Mejorado**: Mensajes más descriptivos y listado de recursos disponibles



<br>

### 1.0.1) Descripción Arquitectura y Funcionamiento

#### Arquitectura del Sistema

El sistema está compuesto por los siguientes componentes principales:

1. **API Gateway**
   - Punto de entrada para todas las peticiones HTTP
   - Implementa autenticación mediante API Key
   - Enruta las peticiones a las funciones Lambda correspondientes

2. **Funciones Lambda**
   - **Gestión de Tópicos**
     - `createManualTopic`: Crea nuevos tópicos SNS
     - `listTopics`: Lista todos los tópicos disponibles
     - `debugTopics`: Debug completo del estado de tópicos (modo offline)
   - **Publicación**
     - `publishTopic`: Publica mensajes en tópicos específicos
   - **Suscripciones**
     - `subscribeTopic`: Gestiona suscripciones a tópicos
     - `listSubscriptionTopic`: Lista suscripciones por tópico
     - `debugSubscriptions`: Debug completo del estado de suscripciones (modo offline)
   - **Webhooks y Notificaciones**
     - `webhookReceiver`: Recibe notificaciones SNS (modo offline)
     - `listNotifications`: Lista notificaciones recibidas con filtrado

3. **Amazon SNS**
   - Servicio de mensajería pub/sub
   - Gestiona tópicos y suscripciones
   - Distribuye mensajes a los suscriptores

4. **SSM Parameter Store**
   - Almacena configuración sensible
   - Gestiona variables de entorno
   - Configuración de endpoints y credenciales

<br>

<br>

#### Flujo de Datos e Implementación

#### Pasos del Flujo
1. **Crear Tópico** → Obtener TopicArn
2. **Listar Tópicos** → Verificar creación
3. **Debug de Tópicos** → Verificar estado completo (opcional)
4. **Suscribirse** → Obtener SubscriptionArn
5. **Debug de Suscripciones** → Verificar estado completo (opcional)
6. **Publicar Mensaje** → Enviar mensaje al tópico
7. **Recibir Notificación** → Webhook procesa la notificación
8. **Listar Notificaciones** → Verificar notificaciones recibidas
9. **Listar Suscripciones** → Verificar suscripciones

#### Configuración Local

El proyecto incluye configuración para desarrollo local:
- Serverless Offline para simular AWS Lambda
- SNS Offline para simular Amazon SNS
- SSM Offline para simular Parameter Store
- Puertos configurables para cada servicio

#### Sistema de Debugging y Monitoreo

El proyecto incluye endpoints especializados para debugging en modo offline:
- **Debug de Tópicos**: `/debug-topics` - Estado completo de tópicos con estadísticas
- **Debug de Suscripciones**: `/debug-subscriptions` - Estado completo de suscripciones con agrupación
- **Persistencia de Datos**: Archivos JSON para mantener estado entre reinicios
- **Webhooks Automáticos**: Endpoints para recibir notificaciones SNS simuladas

#### Seguridad

- Autenticación mediante API Key
- Variables de entorno gestionadas por SSM
- Credenciales AWS configuradas de forma segura
- Endpoints protegidos en API Gateway

#### Desarrollo y Despliegue

- Framework: Serverless v3
- Runtime: Node.js 18.x
- Región: us-east-1
- Memoria Lambda: 512MB
- Timeout: 10 segundos

#### Herramientas de Desarrollo

- **Endpoints de Debug**: Disponibles solo en modo offline para troubleshooting
- **Persistencia Local**: Archivos JSON en `.serverless/` para mantener estado
- **Simulación Realista**: Comportamiento similar al SNS real
- **Validaciones Mejoradas**: Verificación de existencia de recursos
- **Manejo de Errores**: Mensajes descriptivos y debugging facilitado

<br>

</details>


### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver</summary>

<br>

#### [Watch Functional test playlist](https://www.youtube.com/playlist?list=PLCl11UFjHurDBEKoDX8LBe5PxRlUzkrXO)

  <a href="https://www.youtube.com/playlist?list=PLCl11UFjHurDBEKoDX8LBe5PxRlUzkrXO">
    <img src="../doc/assets/sns-example-yt.png" />
  </a> 

<br>

<br>  

* Creamos un entorno de trabajo a través de algún ide, podemos o no crear una carpeta raíz para el proyecto, nos posicionamos sobre la misma
```git
cd 'projectRootName'
```
* Una vez creado un entorno de trabajo a través de algún ide, clonamos el proyecto
```git
git clone https://github.com/andresWeitzel/SNS_NodeJS_AWS
```
* Nos posicionamos sobre el proyecto
```git
cd 'projectName'
```
* Instalamos la versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
* Instalamos el Serverless Framework globalmente si aún no lo hemos hecho. Recomiendo la version tres ya que es gratuita y no nos pide credenciales. Se puede usar la última version (cuatro) sin problemas, aunque es de pago.
```git
npm install -g serverless@3
```
* Verificamos la versión de Serverless instalada
```git
sls -v
```
* Instalamos todos los paquetes necesarios
```git
npm i
```
* Las variables ssm utilizadas en el proyecto se mantienen para simplificar el proceso de configuración del mismo. Es recomendado agregar el archivo correspondiente (serverless_ssm.yml) al .gitignore.
* El siguiente script configurado en el package.json del proyecto es el encargado de
   * Levantar serverless-offline (serverless-offline)
 ```git
  "scripts": {
    "serverless-offline": "sls offline start",
    "start": "npm run serverless-offline"
  },
```
* Ejecutamos la app desde terminal.
```git
npm start
```
* Si se presenta algún mensaje indicando qué el puerto 4567 ya está en uso, podemos terminar todos los procesos dependientes y volver a ejecutar la app
```git
npx kill-port 4567
npm start
```
 
 
<br>

</details>

### 1.2) Configurar el proyecto serverless desde cero [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
 <br>
 
* Creamos un entorno de trabajo a través de algún ide, podemos o no crear una carpeta raíz para el proyecto, nos posicionamos sobre la misma
```git
cd 'projectRootName'
```
* Una vez creado un entorno de trabajo a través de algún ide, clonamos el proyecto
```git
git clone https://github.com/andresWeitzel/SNS_NodeJS_AWS
```
* Nos posicionamos sobre el proyecto
```git
cd 'projectName'
```
* Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
* Instalamos Serverless Framework de forma global si es que aún no lo hemos realizado
```git
npm install -g serverless
```
* Verificamos la versión de Serverless instalada
```git
sls -v
```
* Inicializamos un template de serverles
```git
serverless create --template aws-nodejs
```
* Inicializamos un proyecto npm
```git
npm init -y
```
* Instalamos serverless offline
```git
npm i serverless-offline --save-dev
```
* Agregamos el plugin al .yml
```git
plugins:
  - serverless-offline
```
* Instalamos serverless ssm
```git
npm i serverless-offline-ssm --save-dev
```
* Agregamos el plugin al .yml
```git
plugins:
  - serverless-offline-ssm
  - serverless-offline
```
* Instalamos serverless sns
```git
npm i serverless-offline-sns --save-dev
```
* Agregamos el plugin al .yml
```git
plugins:
  - serverless-offline-sns
  - serverless-offline-ssm
  - serverless-offline
```
* Instalamos serverless, este deberá ser necesario para el uso de SNS
```git
npm i serverless --save-dev
```
* Instalamos el plugin para el uso de sns (aws-sdk-v3)
```git
npm i @aws-sdk/client-sns --save-dev
```
* Para la configuración de puertos, topics, etc, (de este plugin) dirigirse a la [página de serverless, sección plugins](https://www.serverless.com/plugins/serverless-offline-sns) y para los recursos SNS [página de serverless, sección eventos sns](https://www.serverless.com/framework/docs/providers/aws/events/sns/)
* Las variables ssm utilizadas en el proyecto se mantienen para simplificar el proceso de configuración del mismo. Es recomendado agregar el archivo correspondiente (serverless_ssm.yml) al .gitignore.
* Instalamos la dependencia para la ejecución de scripts en paralelo
``` git
npm i concurrently
``` 
* El siguiente script configurado en el package.json del proyecto es el encargado de
   * Levantar serverless-offline (serverless-offline)
 ```git
  "scripts": {
    "serverless-offline": "sls offline start",
    "start": "npm run serverless-offline"
  },
```
* Ejecutamos la app desde terminal.
```git
npm start
```
* Si se presenta algún mensaje indicando qué el puerto 4567 ya está en uso, podemos terminar todos los procesos dependientes y volver a ejecutar la app
```git
npx kill-port 4567
npm start
```
* `Importante: ` Esta es una configuración inicial, se omiten pasos para simplificar la documentación. Para más información al respecto, dirigirse a la [página oficial de serverless, sección plugins](https://www.serverless.com/plugins)


</details>


### 1.3) Tecnologías [🔝](#índice-) 

<details>
  <summary>Ver</summary>
 
 <br>
 
### Tecnologías Implementadas

| **Tecnologías** | **Versión** | **Finalidad** |               
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2  | Inyección Automática de Módulos para Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.23.0 | Core Servicios AWS |
| [Serverless Plugin](https://www.serverless.com/plugins/) | 6.2.2  | Librerías para la Definición Modular |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.0 | Manejo de Variables de Entorno |
| [Amazon Simple Queue Service (SQS)](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html) | 7.0 | Servicio de colas de mensajes distribuidos | 
| [Elastic MQ](https://github.com/softwaremill/elasticmq) | 1.3 | Interfaz compatible con SQS (msg memory) | 
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.0 | Gestor, Autenticación, Control y Procesamiento de la Api | 
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | Librería JS |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | Cliente Http |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Símbolo del Sistema para linea de comandos | 
| [Git](https://git-scm.com/downloads) | 2.29.1  | Control de Versiones |



</br>


### Plugins Implementados.

| **Plugin** | **Descarga** |               
| -------------  | ------------- |
| serverless-offline |  https://www.serverless.com/plugins/serverless-offline |
| serverless-offline-ssm |  https://www.npmjs.com/package/serverless-offline-ssm |
| serverless-offline-sqs | https://www.npmjs.com/package/serverless-offline-sqs |


</br>

### Extensiones VSC Implementados.

| **Extensión** |              
| -------------  | 
| Prettier - Code formatter |
| YAML - Autoformatter .yml (alt+shift+f) |
| DotENV |

<br>

</details>


<br>



## Sección 2) Endpoints y Ejemplos. 


### 2.0) Endpoints y recursos [🔝](#índice-)

<details>
  <summary>Ver</summary>

<br>

### 2.0.0) Descripción de Endpoints

El proyecto implementa un CRUD completo para Amazon SNS con los siguientes endpoints:

#### **Endpoints Principales (CRUD)**

| **Endpoint** | **Método** | **Descripción** | **Autenticación** |
|-------------|------------|----------------|------------------|
| `/create-manual-topic` | POST | Crea un nuevo tópico SNS | Requiere API Key |
| `/list-topics` | GET | Lista todos los tópicos SNS disponibles | Requiere API Key |
| `/publish-topic` | POST | Publica un mensaje en un tópico específico | Requiere API Key |
| `/subscribe-topic` | POST | Suscribe un endpoint a un tópico específico | Requiere API Key |
| `/list-subscription-topic/{topicName}` | GET | Lista todas las suscripciones de un tópico específico | Requiere API Key |
| `/list-all-subscriptions` | GET | Lista todas las suscripciones de todos los tópicos | Requiere API Key |

#### **Endpoints de Webhook y Notificaciones**

| **Endpoint** | **Método** | **Descripción** | **Autenticación** |
|-------------|------------|----------------|------------------|
| `/webhook/{topicName}` | POST | Recibe notificaciones SNS (modo offline) | Público |
| `/list-notifications` | GET | Lista todas las notificaciones recibidas | Requiere API Key |

#### **Endpoints de Debugging y Monitoreo**

| **Endpoint** | **Método** | **Descripción** | **Autenticación** |
|-------------|------------|----------------|------------------|
| `/debug-topics` | GET | Debug completo del estado de tópicos | Requiere API Key |
| `/debug-subscriptions` | GET | Debug completo del estado de suscripciones | Requiere API Key |

### 2.0.1) Detalles de Implementación

#### Create Manual Topic
- **Endpoint**: POST `/create-manual-topic`
- **Descripción**: Crea un nuevo tópico SNS con persistencia
- **Handler**: `src/lambdas/topic/createManualTopic.handler`
- **Funcionalidad**:
  - Guarda tópico en archivo JSON
  - Valida nombre del tópico
  - Retorna ARN simulado

#### List Topics 
- **Endpoint**: GET `/list-topics`
- **Descripción**: Lista tópicos desde archivo JSON
- **Handler**: `src/lambdas/topic/listTopics.handler`
- **Funcionalidad**:
  - Lee desde archivo persistente
  - No incluye tópicos de ejemplo automáticamente
  - Muestra solo tópicos creados por el usuario

#### Publish Topic 
- **Endpoint**: POST `/publish-topic`
- **Descripción**: Publica mensaje con validación de tópico
- **Handler**: `src/lambdas/publish/publishTopic.handler`
- **Funcionalidad**:
  - Valida que el tópico existe
  - Simula envío a suscriptores
  - Retorna información de delivery

#### Subscribe Topic 
- **Endpoint**: POST `/subscribe-topic`
- **Descripción**: Suscribe con validación y webhook automático
- **Handler**: `src/lambdas/subscribe/subscribeTopic.handler`
- **Funcionalidad**:
  - Valida existencia del tópico
  - Usa webhook automático: `http://127.0.0.1:4000/dev/webhook/{topicName}`
  - Guarda suscripción en archivo JSON

#### List Subscription Topic
- **Endpoint**: GET `/list-subscription-topic/{topicName}`
- **Descripción**: Lista suscripciones de un tópico específico
- **Handler**: `src/lambdas/subscribe/listSubscriptionTopic.handler`
- **Características**:
  - **Path Parameter**: El nombre del tópico se especifica en la URL
  - **Validación**: Verifica que el topicName esté presente en la URL
  - **Persistencia**: Lee suscripciones desde archivo JSON
  - **Información Detallada**: Muestra datos completos de cada suscripción
  - **Conteo**: Proporciona el total de suscripciones del tópico

#### List All Subscriptions
- **Endpoint**: GET `/list-all-subscriptions`
- **Descripción**: Lista todas las suscripciones de todos los tópicos
- **Handler**: `src/lambdas/subscribe/listAllSubscriptions.handler`
- **Funcionalidad**:
  - Lista todas las suscripciones del sistema
  - Filtrado opcional por tópico: `?topicName=X`
  - Filtrado opcional por protocolo: `?protocol=Y`
  - Filtrado combinado: `?topicName=X&protocol=Y`
  - Agrupación por tópico y protocolo
  - Estadísticas detalladas del sistema
  - Información de archivos de persistencia

#### Webhook Receiver
- **Endpoint**: POST `/webhook/{topicName}`
- **Descripción**: Recibe notificaciones SNS
- **Handler**: `src/lambdas/webhook/webhookReceiver.handler`
- **Funcionalidad**:
  - Recibe notificaciones HTTP
  - Guarda en archivo JSON
  - Responde 200 OK para evitar reintentos

#### List Notifications 
- **Endpoint**: GET `/list-notifications`
- **Descripción**: Lista notificaciones recibidas
- **Handler**: `src/lambdas/webhook/listNotifications.handler`
- **Funcionalidad**:
  - Filtrado por tópico
  - Agrupación por tópico
  - Información detallada de cada notificación

#### Debug Endpoints 
- **Endpoints**: `/debug-topics`, `/debug-subscriptions`, `/list-all-subscriptions`, `/list-notifications`
- **Descripción**: Herramientas de debugging y monitoreo
- **Características**:
  - Estado actual del sistema
  - Información detallada de archivos
  - Estadísticas de uso
  - Filtrado y agrupación de datos
  - Solo disponible en modo offline


<br>

### 2.0.2) Configuración de Seguridad

Todos los endpoints están protegidos con API Key. La configuración se realiza a través de:
- API Gateway con clave API (`xApiKey`)
- Variables de entorno gestionadas por SSM Parameter Store

</details>


<br>

<br>



## Sección 3) Prueba de funcionalidad y Referencias. 


### 3.0) Prueba de funcionalidad [🔝](#índice-)

<details>
  <summary>Ver</summary>

#### [Watch Functional test playlist](https://www.youtube.com/playlist?list=PLCl11UFjHurDBEKoDX8LBe5PxRlUzkrXO)

  <a href="https://www.youtube.com/playlist?list=PLCl11UFjHurDBEKoDX8LBe5PxRlUzkrXO">
    <img src="../doc/assets/sns-example-yt.png" />
  </a> 

<br>

<br>  

### 3.0.0) Configuración del Entorno de Pruebas

1. **Variables de Entorno en Postman**
   | **Variable** | **Valor** | **Descripción** |
   |-------------|-----------|----------------|
   | `base_url` | `http://localhost:4000/dev` | URL base para las peticiones |
   | `x-api-key` | `f98d8cd98h73s204e3456998ecl9427j` | API Key para autenticación |
   | `bearer_token` | `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` | Token Bearer para autenticación |

2. **Headers Necesarios**
   ```json
   {
     "x-api-key": "{{x-api-key}}",
     "Authorization": "{{bearer_token}}",
     "Content-Type": "application/json"
   }
   ```

### 3.0.1) Ejemplos de Uso

#### 1. Crear un Tópico

##### Request (POST)

```postman
curl --location 'http://localhost:4000/dev/create-manual-topic' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data '{
    "name": "MiTópicoPrueba"
}'
```

##### Response (200 OK)

```json
{
    "statusCode": 200,
    "body": {
        "message": "Topic created successfully (Offline)",
        "topicArn": "arn:aws:sns:us-east-1:123456789012:MiTópicoPrueba",
        "topicName": "MiTópicoPrueba",
        "note": "Topic is now available in the list-topics endpoint"
    }
}
```

##### Response (400 Bad Request)

```json
{
    "statusCode": 400,
    "body": "Bad request, check request body attributes. Missing or incorrect"
}
```

##### Response (401 Unauthorized)

```json
{
    "statusCode": 401,
    "body": "Not authenticated, check x_api_key"
}
```

<br>

#### 2. Listar Tópicos

##### Request (GET)

```postman
curl --location 'http://localhost:4000/dev/list-topics' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
```

##### Response (200 OK)

```json
{
    "statusCode": 200,
    "body": {
        "message": "Topics retrieved successfully (Offline)",
        "topics": [
            {
                "TopicArn": "arn:aws:sns:us-east-1:123456789012:MiTópicoPrueba",
                "TopicName": "MiTópicoPrueba"
            }
        ],
        "totalTopics": 1
    }
}
```

##### Response (401 Unauthorized)

```json
{
    "statusCode": 401,
    "body": "Not authenticated, check x_api_key"
}
```

<br>

#### 3. Debug de Tópicos

##### Request (GET)

```postman
curl --location 'http://localhost:4000/dev/debug-topics' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
```

##### Response (200 OK)

```json
{
    "statusCode": 200,
    "body": {
        "message": "Debug information retrieved successfully",
        "stats": {
            "totalTopics": 2,
            "fileExists": true,
            "fileSize": "1.2 KB",
            "lastModified": "2025-07-16T14:05:12.193Z"
        },
        "topics": [
            {
                "TopicArn": "arn:aws:sns:us-east-1:123456789012:MiTópicoPrueba",
                "TopicName": "MiTópicoPrueba",
                "createdAt": "2025-07-16T14:05:12.193Z"
            },
            {
                "TopicArn": "arn:aws:sns:us-east-1:123456789012:OtroTópico",
                "TopicName": "OtroTópico",
                "createdAt": "2025-07-16T14:05:12.200Z"
            }
        ],
        "fileInfo": {
            "filePath": "/path/to/.serverless/offline-topics.json",
            "fileExists": true,
            "fileSize": "1.2 KB",
            "lastModified": "2025-07-16T14:05:12.193Z"
        }
    }
}
```

##### Response (401 Unauthorized)

```json
{
    "statusCode": 401,
    "body": "Not authenticated, check x_api_key"
}
```

<br>

#### 4. Suscribirse a un Tópico

##### Request (POST)

```postman
curl --location 'http://localhost:4000/dev/subscribe-topic' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data '{
    "topicName": "MiTópicoPrueba",
    "protocol": "http",
    "endpoint": "http://127.0.0.1:4000/dev/webhook/MiTópicoPrueba"
}'
```

##### Response (200 OK)

```json
{
    "statusCode": 200,
    "body": {
        "message": "Successfully subscribed to topic (Offline)",
        "subscriptionArn": "arn:aws:sns:us-east-1:123456789012:MiTópicoPrueba:1752674712193",
        "topicName": "MiTópicoPrueba",
        "topicArn": "arn:aws:sns:us-east-1:123456789012:MiTópicoPrueba",
        "protocol": "http",
        "endpoint": "http://127.0.0.1:4000/dev/webhook/MiTópicoPrueba"
    }
}
```

##### Response (400 Bad Request - Topic Not Found)

```json
{
    "statusCode": 400,
    "body": {
        "message": "Topic does not exist",
        "requestedTopic": "TópicoInexistente",
        "availableTopics": ["MiTópicoPrueba", "OtroTópico"]
    }
}
```

##### Response (400 Bad Request - Missing Parameters)

```json
{
    "statusCode": 400,
    "body": "Bad request, check request body attributes. Missing or incorrect"
}
```

<br>

#### 5. Webhook Receiver

##### Request (POST)

```postman
curl --location 'http://localhost:4000/dev/webhook/Topic1' \
--header 'Content-Type: application/json' \
--data '{
    "Type": "Notification",
    "MessageId": "msg_1752674712193_abc123def",
    "TopicArn": "arn:aws:sns:us-east-1:123456789012:Topic1",
    "Message": "Este es un mensaje de prueba",
    "Subject": "Asunto de Prueba",
    "Timestamp": "2025-07-16T14:05:12.193Z",
    "SignatureVersion": "1",
    "Signature": "example-signature",
    "SigningCertURL": "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-0000000000000000000000.pem"
}'
```

##### Response (200 OK)

```json
{
    "statusCode": 200,
    "body": {
        "message": "Notification received successfully",
        "topicName": "Topic1",
        "messageId": "msg_1752674712193_abc123def",
        "receivedAt": "2025-07-16T14:05:12.200Z"
    }
}
```

##### Response (400 Bad Request)

```json
{
    "statusCode": 400,
    "body": "Invalid notification format"
}
```

<br>

#### 6. Listar Todas las Suscripciones

##### Request (GET)

```postman
curl --location 'http://localhost:4000/dev/list-all-subscriptions' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
```

##### Response (200 OK)

```json
{
    "statusCode": 200,
    "body": {
        "message": "All subscriptions retrieved successfully",
        "filters": {
            "topicName": "none",
            "protocol": "none"
        },
        "stats": {
            "totalSubscriptions": 3,
            "filteredSubscriptions": 3,
            "totalTopics": 2,
            "topicsWithSubscriptions": 2,
            "protocolsUsed": ["http"],
            "subscriptionsByTopicCount": {
                "Topic1": 2,
                "Topic2": 1
            },
            "subscriptionsByProtocolCount": {
                "http": 3
            }
        },
        "subscriptions": [...],
        "subscriptionsByTopic": {...},
        "subscriptionsByProtocol": {...},
        "allTopics": [...]
    }
}
```

<br>

#### 7. Listar Suscripciones de un Tópico Específico

##### Request (GET)

```postman
curl --location 'http://localhost:4000/dev/list-subscription-topic/Topic1' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
```

##### Response (200 OK)

```json
{
    "statusCode": 200,
    "body": {
        "message": "Subscriptions retrieved successfully (Offline)",
        "topicName": "Topic1",
        "topicArn": "arn:aws:sns:us-east-1:123456789012:Topic1",
        "subscriptions": [
            {
                "SubscriptionArn": "arn:aws:sns:us-east-1:123456789012:Topic1:1752674712193",
                "TopicArn": "arn:aws:sns:us-east-1:123456789012:Topic1",
                "Protocol": "http",
                "Endpoint": "http://127.0.0.1:4000/dev/webhook/Topic1",
                "Attributes": {
                    "Enabled": "true"
                },
                "createdAt": "2025-07-16T14:05:12.193Z"
            }
        ],
        "totalSubscriptions": 1
    }
}
```

<br>

#### 8. Debug de Suscripciones

##### Request (GET)

```postman
curl --location 'http://localhost:4000/dev/debug-subscriptions' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
```

##### Response (200 OK)

```json
{
    "statusCode": 200,
    "body": {
        "message": "Debug information retrieved successfully",
        "stats": {
            "totalSubscriptions": 3,
            "totalTopics": 2,
            "fileExists": true,
            "fileSize": "2.1 KB",
            "lastModified": "2025-07-16T14:05:12.193Z"
        },
        "subscriptions": [...],
        "topics": [...],
        "subscriptionsByTopic": {
            "Topic1": [...],
            "Topic2": [...]
        },
        "fileInfo": {
            "filePath": "/path/to/.serverless/offline-subscriptions.json",
            "fileExists": true,
            "fileSize": "2.1 KB",
            "lastModified": "2025-07-16T14:05:12.193Z"
        }
    }
}
```

<br>

#### 9. Publicar Mensaje

##### Request (POST)

```postman
curl --location 'http://localhost:4000/dev/publish-topic' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data '{
    "topicName": "MiTópicoPrueba",
    "message": "Este es un mensaje de prueba",
    "subject": "Asunto de Prueba"
}'
```

##### Response (200 OK)

```json
{
    "statusCode": 200,
    "body": {
        "message": "Message published successfully (Offline)",
        "messageId": "msg_1752674712193_abc123def",
        "topicName": "MiTópicoPrueba",
        "topicArn": "arn:aws:sns:us-east-1:123456789012:MiTópicoPrueba",
        "deliveredToSubscriptions": 1,
        "note": "Notifications were simulated. Check webhook endpoint for actual delivery."
    }
}
```

##### Response (400 Bad Request - Topic Not Found)

```json
{
    "statusCode": 400,
    "body": {
        "message": "Topic does not exist",
        "requestedTopic": "TópicoInexistente",
        "availableTopics": ["MiTópicoPrueba", "OtroTópico"]
    }
}
```

<br>

#### 10. Listar Notificaciones Recibidas

##### Request (GET)

```postman
curl --location 'http://localhost:4000/dev/list-notifications' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
```

##### Request con Filtro por Tópico (GET)

```postman
curl --location 'http://localhost:4000/dev/list-notifications?topicName=Topic1' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
```

##### Response (200 OK)

```json
{
    "statusCode": 200,
    "body": {
        "message": "Notifications retrieved successfully",
        "filters": {
            "topicName": "none"
        },
        "stats": {
            "totalNotifications": 3,
            "filteredNotifications": 3,
            "topicsWithNotifications": 2
        },
        "notifications": [
            {
                "id": "notif_1752674712193_abc123",
                "topicName": "Topic1",
                "topicArn": "arn:aws:sns:us-east-1:123456789012:Topic1",
                "message": "Este es un mensaje de prueba",
                "subject": "Asunto de Prueba",
                "messageId": "msg_1752674712193_abc123def",
                "timestamp": "2025-07-16T14:05:12.193Z",
                "receivedAt": "2025-07-16T14:05:12.200Z"
            }
        ],
        "notificationsByTopic": {...}
    }
}
```

<br>

### 3.0.2) Información de Debugging

#### 📊 **Información que proporcionan los endpoints de debug**

##### **`/debug-topics`**
- Número total de tópicos
- Lista completa de tópicos con ARNs
- Nombres de tópicos disponibles
- Ruta del archivo de persistencia
- Estado del archivo (existe/no existe)
- Contenido del archivo JSON
- Estadísticas del archivo (tamaño, fechas)

##### **`/debug-subscriptions`**
- Número total de suscripciones
- Número total de tópicos
- Lista completa de suscripciones
- Lista completa de tópicos
- Agrupación de suscripciones por tópico
- Nombres de tópicos disponibles
- Información de archivos de persistencia
- Estadísticas detalladas

#### 🔧 **Troubleshooting con Debug Endpoints**

##### **Problema: "Topic does not exist"**
```bash
# Verificar qué tópicos están disponibles
curl -X GET "http://localhost:4000/dev/debug-topics" \
  -H "x-api-key: f98d8cd98h73s204e3456998ecl9427j"
```

##### **Problema: Suscripción no funciona**
```bash
# Verificar estado de suscripciones
curl -X GET "http://localhost:4000/dev/debug-subscriptions" \
  -H "x-api-key: f98d8cd98h73s204e3456998ecl9427j"

# Ver todas las suscripciones
curl -X GET "http://localhost:4000/dev/list-all-subscriptions" \
  -H "x-api-key: f98d8cd98h73s204e3456998ecl9427j"

# Ver suscripciones de un tópico específico
curl -X GET "http://localhost:4000/dev/list-subscription-topic/Topic1" \
  -H "x-api-key: f98d8cd98h73s204e3456998ecl9427j"
```

##### **Problema: No se reciben notificaciones**
```bash
# Verificar notificaciones recibidas
curl -X GET "http://localhost:4000/dev/list-notifications" \
  -H "x-api-key: f98d8cd98h73s204e3456998ecl9427j"
```

##### **Problema: Datos se pierden al reiniciar**
```bash
# Verificar persistencia de archivos
curl -X GET "http://localhost:4000/dev/debug-topics" \
  -H "x-api-key: f98d8cd98h73s204e3456998ecl9427j"
```

#### 📋 **Flujo de Debugging Recomendado**

1. **Crear tópico** → Verificar con `/debug-topics`
2. **Suscribirse** → Verificar con `/debug-subscriptions` o `/list-all-subscriptions`
3. **Publicar mensaje** → Verificar con `/list-notifications`
4. **Si hay problemas** → Usar endpoints de debug para diagnosticar
   - **Suscripciones**: `/list-all-subscriptions` o `/list-subscription-topic/{topicName}`
   - **Tópicos**: `/debug-topics`
   - **Notificaciones**: `/list-notifications`

#### ⚠️ **Limitaciones de los Endpoints de Debug**

- **Solo modo offline**: No funcionan en producción
- **Requieren API Key**: Necesitan autenticación
- **Solo para desarrollo**: No usar en producción
- **Información sensible**: Pueden mostrar rutas de archivos

### 3.0.3) Notas Importantes

1. **Desarrollo Local Mejorado**
   - Asegúrate de que el servidor local esté corriendo (`npm start`)
   - Verifica que los puertos configurados estén disponibles
   - Los mensajes SNS se simulan localmente con persistencia en archivos JSON
   - Los datos persisten entre reinicios del servidor

2. **Sistema de Webhooks**
   - Los webhooks automáticos usan: `http://127.0.0.1:4000/dev/webhook/{topicName}`
   - Las notificaciones se guardan en `.serverless/offline-notifications.json`
   - Puedes ver las notificaciones recibidas con `/list-notifications`

3. **Persistencia de Datos**
   - Tópicos: `.serverless/offline-topics.json`
   - Suscripciones: `.serverless/offline-subscriptions.json`
   - Notificaciones: `.serverless/offline-notifications.json`
   - Los archivos se crean automáticamente al usar los endpoints

4. **Endpoints de Debug y Monitoreo**
   - `/debug-topics`: Estado completo de tópicos con estadísticas
   - `/debug-subscriptions`: Estado completo de suscripciones con agrupación
   - `/list-all-subscriptions`: Todas las suscripciones con filtrado y estadísticas
   - `/list-subscription-topic`: Suscripciones de un tópico específico
   - `/list-notifications`: Notificaciones recibidas con filtrado
   - Solo disponibles en modo offline
   - Útiles para troubleshooting y monitoreo

5. **Manejo de Errores Mejorado**
   - Códigos de error comunes:
     - 400: Bad Request (datos inválidos, tópico no existe)
     - 401: Unauthorized (API Key inválida)
     - 404: Not Found (recurso no encontrado)
     - 500: Internal Server Error
   - Mensajes de error más descriptivos
   - Lista de tópicos disponibles en errores

6. **Validaciones**
   - Verificación de existencia de tópicos antes de suscribirse
   - Validación de parámetros de entrada
   - Prevención de tópicos duplicados

7. **Flujo de Trabajo Recomendado**
   1. Crear tópico con `/create-manual-topic`
   2. Verificar con `/list-topics` o `/debug-topics`
   3. Suscribirse con `/subscribe-topic`
   4. Verificar suscripción con `/list-subscription-topic/{topicName}` o `/list-all-subscriptions`
   5. Publicar mensaje con `/publish-topic`
   6. Ver notificaciones con `/list-notifications`

8. **Limitaciones en Desarrollo Local**
   - Las suscripciones por email no envían correos reales
   - Los ARNs son simulados pero consistentes
   - Las notificaciones se simulan pero se guardan para debugging
   - Los webhooks HTTP funcionan completamente

<br>

</details>



### 3.1) Referencias [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
 <br>

### Documentación Oficial

* [Serverless Framework Documentation](https://www.serverless.com/framework/docs)
* [AWS SNS Documentation](https://docs.aws.amazon.com/sns/)
* [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html)
* [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
* [API Gateway Documentation](https://docs.aws.amazon.com/apigateway/)

### Tutoriales y Ejemplos

* [Tutorial aws-sdk v2](https://unpkg.com/browse/serverless-offline-sns@0.65.0/README.md)
* [Amazon Simple Notification Service (SNS) JavaScript SDK v3 code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/sns)
* [Serverless Framework Examples](https://github.com/serverless/examples)
* [AWS SNS Best Practices](https://docs.aws.amazon.com/sns/latest/dg/sns-best-practices.html)
* [Serverless Offline Plugin](https://github.com/dherault/serverless-offline)

### Herramientas y Recursos

* [Postman Documentation](https://learning.postman.com/docs/getting-started/introduction/)
* [Node.js Documentation](https://nodejs.org/en/docs/)
* [AWS CloudFormation Documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)
* [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)

### Comunidad y Soporte

* [Serverless Framework Forum](https://forum.serverless.com/)
* [AWS Developer Forums](https://forums.aws.amazon.com/)
* [Stack Overflow - Serverless Framework](https://stackoverflow.com/questions/tagged/serverless-framework)
* [GitHub Issues - Serverless Framework](https://github.com/serverless/serverless/issues)

### Videos y Cursos

* [AWS SNS Tutorial](https://www.youtube.com/watch?v=m3hHhPwv1OU)
* [Serverless Framework Crash Course](https://www.youtube.com/watch?v=71cd5XerKss)
* [AWS Lambda & API Gateway Tutorial](https://www.youtube.com/watch?v=71cd5XerKss)

<br>

</details>

