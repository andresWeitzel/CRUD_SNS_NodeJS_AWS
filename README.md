# SNS_NodeJS_AWS
Comunicación entre lambdas a través de amazon simple notification service (SNS) implementado con Systems Manager Parameter Store, Api-Gateway, Amazon SNS, Serverless-Framework, Lambda, NodeJs, aws sdk-v3, entre otros.

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


### 1.0.1) Descripción Arquitectura y Funcionamiento
 

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
* Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
* Instalamos Serverless Framework de forma global si es que aún no lo hemos realizado
```git
npm install -g serverless
```
* Verificamos la versión de Serverless instalada
```git
sls -v
```
* Instalamos todos los paquetes necesarios
```git
npm i
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

### 2.0.1) Variables en Postman

| **Variable** | **Initial value** | **Current value** |               
| ------------- | ------------- | ------------- |
| base_url | http://localhost:4000/dev  | http://localhost:4000/dev |
| x-api-key | f98d8cd98h73s204e3456998ecl9427j  | f98d8cd98h73s204e3456998ecl9427j |
| bearer_token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c |

<br>

<br>

### 2.0.2) Listar todas las colas creadas (desde navegador)

<br>

<br>

### 2.0.3) Encolar un mensaje en la cola fifo (desde navegador)

<br>

<br>

### 2.0.4) Encolar un mensaje desde postman

<br>


</details>

<br>


## Sección 3) Prueba de funcionalidad y Referencias. 


### 3.0) Prueba de funcionalidad [🔝](#índice-) 

<details>
  <summary>Ver</summary>
<br>


</details>



### 3.1) Referencias [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
 <br>

#### Conceptos SNS
 * [Descripción aws sns](https://docs.aws.amazon.com/es_es/sns/latest/dg/welcome.html)
 * [Diferencias SQS SNS](https://aws.amazon.com/it/sqs/faqs/)

#### Configuración SNS
* [Eventos SNS](https://www.serverless.com/framework/docs/providers/aws/events/sns/)

#### Plugins SNS
* [serverless-offline-sns](https://www.serverless.com/plugins/serverless-offline-sns)

#### SQS aws-sdk-v3
* [Envío de mensajes a través de colas](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_sqs_code_examples.html)

#### Ejemplos de código
* [serverless-offline-sns-example](https://github.com/mj1618/serverless-offline-sns-example/blob/master/handler.js)
* [Tutotial aws-sdk v2](https://unpkg.com/browse/serverless-offline-sns@0.65.0/README.md)
* [Amazon Simple Notification Service (SNS) JavaScript SDK v3 code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/sns)

<br>

</details>


