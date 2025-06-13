![Index app](./doc/assets/sns-example.png)
# CRUD_SNS_NodeJS_AWS
Modelo CRUD para la comunicación entre lambdas a través de amazon simple notification service (SNS) implementado con Systems Manager Parameter Store, Api-Gateway, Amazon SNS, Serverless-Framework, Lambda, NodeJs, aws sdk-v3, entre otros.

* [Playlist proyecto](https://www.youtube.com/watch?v=sGK_4FQBdP8&list=PLCl11UFjHurCkJNddrHBJ_TUfMlrHuWyb)


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

### Sección 2) Endpoints y Ejemplos 
 
 - [2.0) EndPoints y recursos.](#20-endpoints-y-recursos-)
 - [2.1) Ejemplos](#21-ejemplos-)

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

<br>

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
   - **Publicación**
     - `publishTopic`: Publica mensajes en tópicos específicos
   - **Suscripciones**
     - `subscribeTopic`: Gestiona suscripciones a tópicos
     - `listSubscriptionTopic`: Lista suscripciones por tópico

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

![Flujo de Implementación SNS](./doc/assets/sns-flow.png)

#### Pasos del Flujo
1. **Crear Tópico** → Obtener TopicArn
2. **Listar Tópicos** → Verificar creación
3. **Suscribirse** → Obtener SubscriptionArn
4. **Publicar Mensaje** → Enviar mensaje al tópico
5. **Listar Suscripciones** → Verificar suscripciones

1. **Creación de Tópicos**
   ```
   Cliente -> API Gateway -> Lambda -> SNS -> Tópico Creado
   ```

2. **Publicación de Mensajes**
   ```
   Cliente -> API Gateway -> Lambda -> SNS -> Suscriptores
   ```

3. **Suscripción a Tópicos**
   ```
   Cliente -> API Gateway -> Lambda -> SNS -> Confirmación
   ```

#### Configuración Local

El proyecto incluye configuración para desarrollo local:
- Serverless Offline para simular AWS Lambda
- SNS Offline para simular Amazon SNS
- SSM Offline para simular Parameter Store
- Puertos configurables para cada servicio

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

<br>

</details>


### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver</summary>

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

| **Endpoint** | **Método** | **Descripción** | **Autenticación** |
|-------------|------------|----------------|------------------|
| `/create-manual-topic` | POST | Crea un nuevo tópico SNS | Requiere API Key |
| `/list-topics` | GET | Lista todos los tópicos SNS disponibles | Requiere API Key |
| `/publish-topic` | POST | Publica un mensaje en un tópico específico | Requiere API Key |
| `/subscribe-topic` | POST | Suscribe un endpoint a un tópico específico | Requiere API Key |
| `/list-subscription-topic` | GET | Lista todas las suscripciones de un tópico específico | Requiere API Key |

### 2.0.1) Detalles de Implementación

#### Flujo de Implementación
![Flujo de Implementación SNS](./doc/assets/sns-flow.png)

#### Pasos del Flujo
1. **Crear Tópico** → Obtener TopicArn
2. **Listar Tópicos** → Verificar creación
3. **Suscribirse** → Obtener SubscriptionArn
4. **Publicar Mensaje** → Enviar mensaje al tópico
5. **Listar Suscripciones** → Verificar suscripciones

#### Create Manual Topic
- **Endpoint**: POST `/create-manual-topic`
- **Descripción**: Crea un nuevo tópico SNS
- **Handler**: `src/lambdas/topic/createManualTopic.handler`
- **Función Lambda**: `create-manual-topic-sns`

#### List Topics
- **Endpoint**: GET `/list-topics`
- **Descripción**: Obtiene la lista de todos los tópicos SNS
- **Handler**: `src/lambdas/topic/listTopics.handler`
- **Función Lambda**: `list-topic-sns`
- **Eventos**: 
  - HTTP GET
  - SNS (ARN configurado en SSM)

#### Publish Topic
- **Endpoint**: POST `/publish-topic`
- **Descripción**: Publica un mensaje en un tópico específico
- **Handler**: `src/lambdas/publish/publishTopic.handler`
- **Función Lambda**: `publish-topic-sns`
- **Eventos**:
  - HTTP POST
  - SNS (ARN configurado en SSM)

#### Subscribe Topic
- **Endpoint**: POST `/subscribe-topic`
- **Descripción**: Suscribe un endpoint a un tópico específico
- **Handler**: `src/lambdas/subscribe/subscribeTopic.handler`
- **Función Lambda**: `subscribe-topic-sns`
- **Eventos**:
  - HTTP POST
  - SNS (ARN configurado en SSM)

#### List Subscription Topic
- **Endpoint**: GET `/list-subscription-topic`
- **Descripción**: Lista todas las suscripciones de un tópico específico
- **Handler**: `src/lambdas/subscribe/listSubscriptionTopic.handler`
- **Función Lambda**: `list-subscription-topic-sns`
- **Eventos**:
  - HTTP GET
  - SNS (ARN configurado en SSM)

### 2.0.2) Configuración de Seguridad

Todos los endpoints están protegidos con API Key. La configuración se realiza a través de:
- API Gateway con clave API (`xApiKey`)
- Variables de entorno gestionadas por SSM Parameter Store

### 2.0.3) Recursos SNS

El proyecto incluye un tópico SNS de ejemplo configurado en los recursos:
```yaml
TopicExample:
  Type: AWS::SNS::Topic
  Properties:
    TopicName: TopicExample
```

</details>



### 2.1) Ejemplos [🔝](#índice-)

<details>
  <summary>Ver</summary>

<br>

### 2.1.0) Configuración del Entorno de Pruebas

1. **Variables de Entorno en Postman**
   | **Variable** | **Valor** | **Descripción** |
   |-------------|-----------|----------------|
   | `base_url` | `http://localhost:4000/dev` | URL base para las peticiones |
   | `x-api-key` | `f98d8cd98h73s204e3456998ecl9427j` | API Key para autenticación |

2. **Headers Necesarios**
   ```json
   {
     "x-api-key": "{{x-api-key}}",
     "Content-Type": "application/json"
   }
   ```

### 2.1.1) Ejemplos de Uso

#### 1. Crear un Tópico
- **Endpoint**: `POST {{base_url}}/create-manual-topic`
- **Body**:
  ```json
  {
    "name": "MiTópicoPrueba"
  }
  ```
- **Respuesta Esperada**:
  ```json
  {
    "statusCode": 200,
    "body": {
      "TopicArn": "arn:aws:sns:us-east-1:123456789012:MiTópicoPrueba"
    }
  }
  ```

#### 2. Listar Tópicos
- **Endpoint**: `GET {{base_url}}/list-topics`
- **Respuesta Esperada**:
  ```json
  {
    "statusCode": 200,
    "body": {
      "Topics": [
        {
          "TopicArn": "arn:aws:sns:us-east-1:123456789012:MiTópicoPrueba"
        }
      ]
    }
  }
  ```

#### 3. Suscribirse a un Tópico
- **Endpoint**: `POST {{base_url}}/subscribe-topic`
- **Body**:
  ```json
  {
    "topicArn": "arn:aws:sns:us-east-1:123456789012:MiTópicoPrueba",
    "protocol": "email",
    "endpoint": "usuario@ejemplo.com"
  }
  ```
- **Respuesta Esperada**:
  ```json
  {
    "statusCode": 200,
    "body": {
      "SubscriptionArn": "arn:aws:sns:us-east-1:123456789012:MiTópicoPrueba:1234567890"
    }
  }
  ```

#### 4. Publicar Mensaje
- **Endpoint**: `POST {{base_url}}/publish-topic`
- **Body**:
  ```json
  {
    "topicArn": "arn:aws:sns:us-east-1:123456789012:MiTópicoPrueba",
    "message": "Este es un mensaje de prueba",
    "subject": "Asunto de Prueba"
  }
  ```
- **Respuesta Esperada**:
  ```json
  {
    "statusCode": 200,
    "body": {
      "MessageId": "1234567890"
    }
  }
  ```

#### 5. Listar Suscripciones
- **Endpoint**: `GET {{base_url}}/list-subscription-topic`
- **Query Params**: `?topicArn=arn:aws:sns:us-east-1:123456789012:MiTópicoPrueba`
- **Respuesta Esperada**:
  ```json
  {
    "statusCode": 200,
    "body": {
      "Subscriptions": [
        {
          "SubscriptionArn": "arn:aws:sns:us-east-1:123456789012:MiTópicoPrueba:1234567890",
          "Protocol": "email",
          "Endpoint": "usuario@ejemplo.com"
        }
      ]
    }
  }
  ```


<br>

### 2.1.3) Notas Importantes

1. **Desarrollo Local**
   - Asegúrate de que el servidor local esté corriendo (`npm start`)
   - Verifica que los puertos configurados estén disponibles
   - Los mensajes SNS se simularán localmente

2. **Manejo de Errores**
   - Códigos de error comunes:
     - 400: Bad Request (datos inválidos)
     - 401: Unauthorized (API Key inválida)
     - 404: Not Found (recurso no encontrado)
     - 500: Internal Server Error

3. **Limitaciones en Desarrollo Local**
   - Las suscripciones por email no envían correos reales
   - Los ARNs son simulados
   - Las confirmaciones de suscripción deben ser manejadas manualmente

<br>

</details>




## Sección 3) Prueba de funcionalidad y Referencias. 


## 3.0) Prueba de funcionalidad [🔝](#índice-)

<details>
  <summary>Ver</summary>

<br>


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



