![Index app](./doc/assets/sns-example.png)
<div align="right">
  <img width="25" height="25" src="./doc/assets/icons/devops/png/aws.png" />
  <img width="25" height="25" src="./doc/assets/icons/aws/png/lambda.png" />
  <img width="27" height="27" src="./doc/assets/icons/devops/png/postman.png" />
  <img width="29" height="27" src="./doc/assets/icons/devops/png/git.png" />
  <img width="28" height="27" src="./doc/assets/icons/aws/png/api-gateway.png" />
  <img width="27" height="25" src="./doc/assets/icons/aws/png/parameter-store.png" />
  <img width="27" height="27" src="./doc/assets/icons/backend/javascript-typescript/png/nodejs.png" />
</div>

<br>

<br>

<div align="right"> 
  <a href="./translations/README.es.md">
    <img src="./doc/assets/translation/arg-flag.jpg" width="65" height="40" />
  </a> 
  <a href="./README.md">
    <img src="./doc/assets/translation/eeuu-flag.jpg" width="65" height="40" />
  </a> 
</div>

<br>

<div align="center">

# CRUD SNS Nodejs AWS ![(status-completed)](./doc/assets/icons/badges/status-completed.svg)

</div>  

Serverless CRUD for Amazon SNS with Node.js and Serverless Framework. Allows you to create, list, publish, and subscribe to SNS topics, with API Key authentication, local persistence in JSON files, debugging endpoints, and webhook simulation. Includes integration with SSM Parameter Store and support for local development with serverless-offline.

*   [Postman Collection](./postman/collections/CRUD_SNS_AWS.postman_collection.json)   
*   [Playlist functionality test](https://www.youtube.com/playlist?list=PLCl11UFjHurDBEKoDX8LBe5PxRlUzkrXO) <a href="https://www.youtube.com/playlist?list=PLCl11UFjHurDBEKoDX8LBe5PxRlUzkrXO" target="_blank"> <img src="./doc/assets/social-networks/yt.png" width="25" /> </a>

<br>

## Index 📜

<details>
 <summary> View </summary>
 
 <br>
 
### Section 1) Description, Technologies and References

 - [1.0) Project Description.](#10-project-description-)
 - [1.1) Project Execution.](#11-project-execution-)
 - [1.2) Configure the serverless project from scratch](#12-configure-the-serverless-project-from-scratch-)
 - [1.3) Technologies.](#13-technologies-)

### Section 2) Endpoints and Resources
 
 - [2.0) EndPoints and resources.](#20-endpoints-and-resources-)

### Section 3) Functionality Testing and References
 
 - [3.0) Functionality testing.](#30-functionality-testing-)
 - [3.1) References.](#31-references-)

<br>

</details>

<br>

## Section 1) Description, Technologies and Dependencies 


### 1.0) Description [🔝](#index-) 

<details>
  <summary>View</summary>
 
 <br>

### 1.0.0) General Description

This project implements a complete CRUD system for Amazon Simple Notification Service (SNS) using Node.js and the Serverless Framework. The system allows you to manage SNS topics, including their creation, listing, message publishing, and subscription management.

Key features:
- Implementation of a serverless architecture using AWS Lambda
- Integration with Amazon SNS for pub/sub messaging
- RESTful API protected with API Key
- Configuration management via SSM Parameter Store
- Support for local development with serverless-offline
- Handling of SNS events and HTTP
- Implementation of design patterns for asynchronous messaging
- **Webhooks System**: Endpoints to receive SNS notifications in offline mode
- **Data Persistence**: Storage in JSON files for topics, subscriptions, and notifications
- **Debugging Endpoints**: Tools for troubleshooting and monitoring system status
  - `/debug-topics`: Full state of topics with file statistics
  - `/debug-subscriptions`: Full state of subscriptions with grouping by topic
  - `/list-notifications`: Received notifications with filtering and grouping
- **Topic Management**: Endpoints to create and list topics
  - `/create-manual-topic`: Create new SNS topics
  - `/list-topics`: List all available topics
  - `/debug-topics`: Full debug state of topics
- **Subscription Management**: Endpoints to subscribe and list subscriptions
  - `/subscribe-topic`: Subscribe to a specific topic
  - `/list-all-subscriptions`: All subscriptions with filtering and statistics
  - `/list-subscription-topic/{topicName}`: Subscriptions for a specific topic
- **Message Publishing**: Endpoints to publish messages
  - `/publish-topic`: Publish messages to a specific topic
- **Webhooks and Notifications**: Endpoints to receive and list notifications
  - `/webhook/{topicName}`: Receive SNS notifications (offline mode)
- **Enhanced Validations**: Topic existence check and parameter validation
- **Realistic Simulation**: Behavior closer to the real SNS with persistence between restarts
- **Improved Error Handling**: More descriptive messages and available resources list



<br>

### 1.0.1) Architecture and Operation

#### System Architecture

The system consists of the following main components:

1. **API Gateway**
   - Entry point for all HTTP requests
   - Implements authentication via API Key
   - Routes requests to corresponding Lambda functions

2. **Lambda Functions**
   - **Topic Management**
     - `createManualTopic`: Creates new SNS topics
     - `listTopics`: Lists all available topics
     - `debugTopics`: Full debug state of topics (offline mode)
   - **Publication**
     - `publishTopic`: Publishes messages to specific topics
   - **Subscriptions**
     - `subscribeTopic`: Manages subscriptions to topics
     - `listSubscriptionTopic`: Lists subscriptions by topic
     - `debugSubscriptions`: Full debug state of subscriptions (offline mode)
   - **Webhooks and Notifications**
     - `webhookReceiver`: Receives SNS notifications (offline mode)
     - `listNotifications`: Lists received notifications with filtering

3. **Amazon SNS**
   - Pub/sub messaging service
   - Manages topics and subscriptions
   - Distributes messages to subscribers

4. **SSM Parameter Store**
   - Stores sensitive configuration
   - Manages environment variables
   - Endpoint and credential configuration

<br>

<br>

#### Data Flow and Implementation

#### Flow Steps
1. **Create Topic** → Get TopicArn
2. **List Topics** → Verify creation
3. **Debug Topics** → Verify full state (optional)
4. **Subscribe** → Get SubscriptionArn
5. **Debug Subscriptions** → Verify full state (optional)
6. **Publish Message** → Send message to topic
7. **Receive Notification** → Webhook processes the notification
8. **List Notifications** → Verify received notifications
9. **List Subscriptions** → Verify subscriptions

#### Local Configuration

The project includes configuration for local development:
- Serverless Offline to simulate AWS Lambda
- SNS Offline to simulate Amazon SNS
- SSM Offline to simulate Parameter Store
- Configurable ports for each service

#### System Debugging and Monitoring

The project includes specialized endpoints for debugging in offline mode:
- **Debug Topics**: `/debug-topics` - Full state of topics with statistics
- **Debug Subscriptions**: `/debug-subscriptions` - Full state of subscriptions with grouping
- **Data Persistence**: JSON files to maintain state between restarts
- **Automatic Webhooks**: Endpoints to receive simulated SNS notifications

#### Security

- Authentication via API Key
- Environment variables managed by SSM
- Secure AWS credentials
- Protected endpoints in API Gateway

#### Development and Deployment

- Framework: Serverless v3
- Runtime: Node.js 18.x
- Region: us-east-1
- Lambda Memory: 512MB
- Timeout: 10 seconds

#### Development Tools

- **Debugging Endpoints**: Only available in offline mode for troubleshooting
- **Local Persistence**: JSON files in `.serverless/` to maintain state
- **Realistic Simulation**: Similar behavior to the real SNS
- **Enhanced Validations**: Resource existence check
- **Error Handling**: More descriptive messages and facilitated debugging

<br>

</details>


### 1.1) Project Execution [🔝](#index-)

<details>
  <summary>View</summary>

<br>

#### [Watch Functional test playlist](https://www.youtube.com/playlist?list=PLCl11UFjHurDBEKoDX8LBe5PxRlUzkrXO)

  <a href="https://www.youtube.com/playlist?list=PLCl11UFjHurDBEKoDX8LBe5PxRlUzkrXO">
    <img src="./doc/assets/sns-example-yt.png" />
  </a> 

<br>

* We create a working environment through some ide, we can or cannot create a root folder for the project, we position ourselves on it
```git
cd 'projectRootName'
```
* Once a working environment is created through some ide, we clone the project
```git
git clone https://github.com/andresWeitzel/SNS_NodeJS_AWS
```
* We position ourselves on the project
```git
cd 'projectName'
```
* We install the LTS version of [Nodejs(v18)](https://nodejs.org/en/download)
* We install the Serverless Framework globally if we haven't done it yet. I recommend version three as it's free and doesn't require credentials. You can use the latest version (four) without problems, although it's paid.
```git
npm install -g serverless@3
```
* We verify the Serverless version installed
```git
sls -v
```
* We install all necessary packages
```git
npm i
```
* The ssm variables used in the project are kept to simplify the configuration process of the same. It is recommended to add the corresponding file (serverless_ssm.yml) to the .gitignore.
* The following script configured in the project's package.json is responsible for
   * Levantar serverless-offline (serverless-offline)
 ```git
  "scripts": {
    "serverless-offline": "sls offline start",
    "start": "npm run serverless-offline"
  },
```
* We execute the app from the terminal.
```git
npm start
```
* If a message indicating that port 4567 is already in use is presented, we can terminate all dependent processes and re-execute the app
```git
npx kill-port 4567
npm start
```
 
 
<br>

</details>

### 1.2) Configure the serverless project from scratch [🔝](#index-)

<details>
  <summary>View</summary>
 
 <br>
 
* We create a working environment through some ide, we can or no create a root folder for the project, we position ourselves on it
```git
cd 'projectRootName'
```
* Once a working environment is created through some ide, we clone the project
```git
git clone https://github.com/andresWeitzel/SNS_NodeJS_AWS
```
* We position ourselves on the project
```git
cd 'projectName'
```
* We install the latest LTS version of [Nodejs(v18)](https://nodejs.org/en/download)
* We install Serverless Framework globally if it hasn't been done yet
```git
npm install -g serverless
```
* We verify the Serverless version installed
```git
sls -v
```
* We initialize a serverles template
```git
serverless create --template aws-nodejs
```
* We initialize an npm project
```git
npm init -y
```
* We install serverless offline
```git
npm i serverless-offline --save-dev
```
* We add the plugin to the .yml
```git
plugins:
  - serverless-offline
```
* We install serverless ssm
```git
npm i serverless-offline-ssm --save-dev
```
* We add the plugin to the .yml
```git
plugins:
  - serverless-offline-ssm
  - serverless-offline
```
* We install serverless sns
```git
npm i serverless-offline-sns --save-dev
```
* We add the plugin to the .yml
```git
plugins:
  - serverless-offline-sns
  - serverless-offline-ssm
  - serverless-offline
```
* We install serverless, this should be necessary for SNS use
```git
npm i serverless --save-dev
```
* We install the plugin for sns use (aws-sdk-v3)
```git
npm i @aws-sdk/client-sns --save-dev
```
* For port configuration, topics, etc., (of this plugin) refer to the [serverless, plugins section](https://www.serverless.com/plugins/serverless-offline-sns) and for SNS resources [serverless, sns events section](https://www.serverless.com/framework/docs/providers/aws/events/sns/)
* The ssm variables used in the project are kept to simplify the configuration process of the same. It is recommended to add the corresponding file (serverless_ssm.yml) to the .gitignore.
* We install the dependency for parallel script execution
``` git
npm i concurrently
``` 
* The following script configured in the project's package.json is responsible for
   * Levantar serverless-offline (serverless-offline)
 ```git
  "scripts": {
    "serverless-offline": "sls offline start",
    "start": "npm run serverless-offline"
  },
```
* We execute the app from the terminal.
```git
npm start
```
* If a message indicating that port 4567 is already in use is presented, we can terminate all dependent processes and re-execute the app
```git
npx kill-port 4567
npm start
```
* `Important: ` This is an initial configuration, steps for simplification are omitted. For more information, refer to the [official serverless, plugins page](https://www.serverless.com/plugins)


</details>


### 1.3) Technologies [🔝](#index-) 

<details>
  <summary>View</summary>
 
 <br>
 
### Implemented Technologies

| **Technologies** | **Version** | **Purpose** |               
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2  | Automatic Module Injection for Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.23.0 | Core AWS Services |
| [Serverless Plugin](https://www.serverless.com/plugins/) | 6.2.2  | Modular Definition Libraries |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.0 | Environment Variable Management |
| [Amazon Simple Queue Service (SQS)](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html) | 7.0 | Distributed Message Queue Service | 
| [Elastic MQ](https://github.com/softwaremill/elasticmq) | 1.3 | Compatible Interface with SQS (msg memory) | 
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.0 | API Manager, Authentication, Control, and Processing | 
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | JS Library |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | HTTP Client |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | System Symbol for Command Line | 
| [Git](https://git-scm.com/downloads) | 2.29.1  | Version Control |



</br>


### Implemented Plugins.

| **Plugin** | **Download** |               
| -------------  | ------------- |
| serverless-offline |  https://www.serverless.com/plugins/serverless-offline |
| serverless-offline-ssm |  https://www.npmjs.com/package/serverless-offline-ssm |
| serverless-offline-sqs | https://www.npmjs.com/package/serverless-offline-sqs |


</br>

### VSC Extensions Implemented.

| **Extension** |              
| -------------  | 
| Prettier - Code formatter |
| YAML - Autoformatter .yml (alt+shift+f) |
| DotENV |

<br>

</details>


<br>



## Section 2) Endpoints and Examples. 


### 2.0) Endpoints and resources [🔝](#index-)

<details>
  <summary>View</summary>

<br>

### 2.0.0) Description of Endpoints

The project implements a complete CRUD for Amazon SNS with the following endpoints:

#### **Main Endpoints (CRUD)**

| **Endpoint** | **Method** | **Description** | **Authentication** |
|-------------|------------|----------------|------------------|
| `/create-manual-topic` | POST | Creates a new SNS topic | Requires API Key |
| `/list-topics` | GET | Lists all available SNS topics | Requires API Key |
| `/publish-topic` | POST | Publishes a message to a specific topic | Requires API Key |
| `/subscribe-topic` | POST | Subscribes an endpoint to a specific topic | Requires API Key |
| `/list-subscription-topic/{topicName}` | GET | Lists all subscriptions for a specific topic | Requires API Key |
| `/list-all-subscriptions` | GET | Lists all subscriptions for all topics | Requires API Key |

#### **Webhook and Notification Endpoints**

| **Endpoint** | **Method** | **Description** | **Authentication** |
|-------------|------------|----------------|------------------|
| `/webhook/{topicName}` | POST | Receives SNS notifications (offline mode) | Public |
| `/list-notifications` | GET | Lists all received notifications | Requires API Key |

#### **Debugging and Monitoring Endpoints**

| **Endpoint** | **Method** | **Description** | **Authentication** |
|-------------|------------|----------------|------------------|
| `/debug-topics` | GET | Full debug state of topics | Requires API Key |
| `/debug-subscriptions` | GET | Full debug state of subscriptions | Requires API Key |

### 2.0.1) Implementation Details

#### Create Manual Topic
- **Endpoint**: POST `/create-manual-topic`
- **Description**: Creates a new SNS topic with persistence
- **Handler**: `src/lambdas/topic/createManualTopic.handler`
- **Functionality**:
  - Saves topic to JSON file
  - Validates topic name
  - Returns simulated ARN

#### List Topics 
- **Endpoint**: GET `/list-topics`
- **Description**: Lists topics from JSON file
- **Handler**: `src/lambdas/topic/listTopics.handler`
- **Functionality**:
  - Reads from persistent file
  - Does not include automatically generated topics
  - Shows only topics created by the user

#### Publish Topic 
- **Endpoint**: POST `/publish-topic`
- **Description**: Publishes a message with topic validation
- **Handler**: `src/lambdas/publish/publishTopic.handler`
- **Functionality**:
  - Validates that the topic exists
  - Simulates delivery to subscribers
  - Returns delivery information

#### Subscribe Topic 
- **Endpoint**: POST `/subscribe-topic`
- **Description**: Subscribes with validation and automatic webhook
- **Handler**: `src/lambdas/subscribe/subscribeTopic.handler`
- **Functionality**:
  - Validates topic existence
  - Uses automatic webhook: `http://127.0.0.1:4000/dev/webhook/{topicName}`
  - Saves subscription to JSON file

#### List Subscription Topic
- **Endpoint**: GET `/list-subscription-topic/{topicName}`
- **Description**: Lists subscriptions for a specific topic
- **Handler**: `src/lambdas/subscribe/listSubscriptionTopic.handler`
- **Characteristics**:
  - **Path Parameter**: The topic name is specified in the URL
  - **Validation**: Verifies that topicName is present in the URL
  - **Persistence**: Reads subscriptions from JSON file
  - **Detailed Information**: Shows complete data for each subscription
  - **Count**: Provides the total number of subscriptions for the topic

#### List All Subscriptions
- **Endpoint**: GET `/list-all-subscriptions`
- **Description**: Lists all subscriptions for all topics
- **Handler**: `src/lambdas/subscribe/listAllSubscriptions.handler`
- **Functionality**:
  - Lists all subscriptions in the system
  - Optional filtering by topic: `?topicName=X`
  - Optional filtering by protocol: `?protocol=Y`
  - Combined filtering: `?topicName=X&protocol=Y`
  - Grouping by topic and protocol
  - Detailed system statistics
  - File persistence information

#### Webhook Receiver
- **Endpoint**: POST `/webhook/{topicName}`
- **Description**: Receives SNS notifications
- **Handler**: `src/lambdas/webhook/webhookReceiver.handler`
- **Functionality**:
  - Receives HTTP notifications
  - Saves to JSON file
  - Responds 200 OK to avoid retries

#### List Notifications 
- **Endpoint**: GET `/list-notifications`
- **Description**: Lists received notifications
- **Handler**: `src/lambdas/webhook/listNotifications.handler`
- **Functionality**:
  - Filtered by topic
  - Grouped by topic
  - Detailed information for each notification

#### Debug Endpoints 
- **Endpoints**: `/debug-topics`, `/debug-subscriptions`, `/list-all-subscriptions`, `/list-notifications`
- **Description**: Debugging and monitoring tools
- **Characteristics**:
  - Current system state
  - Detailed file information
  - Usage statistics
  - Filtered and grouped data
  - Only available in offline mode


<br>

### 2.0.2) Security Configuration

All endpoints are protected with API Key. Configuration is done via:
- API Gateway with API Key (`xApiKey`)
- Environment variables managed by SSM Parameter Store

</details>


<br>


## Section 3) Functionality Testing and References. 


### 3.0) Functionality Testing [🔝](#index-)

<details>
  <summary>View</summary>

<br>

#### [Watch Functional test playlist](https://www.youtube.com/playlist?list=PLCl11UFjHurDBEKoDX8LBe5PxRlUzkrXO)

  <a href="https://www.youtube.com/playlist?list=PLCl11UFjHurDBEKoDX8LBe5PxRlUzkrXO">
    <img src="./doc/assets/sns-example-yt.png" />
  </a> 

<br>

<br>

### 3.0.0) Test Environment Configuration

1. **Environment Variables in Postman**
   | **Variable** | **Value** | **Description** |
   |-------------|-----------|----------------|
   | `base_url` | `http://localhost:4000/dev` | Base URL for requests |
   | `x-api-key` | `f98d8cd98h73s204e3456998ecl9427j` | API Key for authentication |
   | `bearer_token` | `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c` | Bearer Token for authentication |

2. **Required Headers**
   ```json
   {
     "x-api-key": "{{x-api-key}}",
     "Authorization": "{{bearer_token}}",
     "Content-Type": "application/json"
   }
   ```

### 3.0.1) Usage Examples

#### 1. Create a Topic

##### Request (POST)

```postman
curl --location 'http://localhost:4000/dev/create-manual-topic' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data '{
    "name": "MyTestTopic"
}'
```

##### Response (200 OK)

```json
{
    "statusCode": 200,
    "body": {
        "message": "Topic created successfully (Offline)",
        "topicArn": "arn:aws:sns:us-east-1:123456789012:MyTestTopic",
        "topicName": "MyTestTopic",
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

#### 2. List Topics

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
                "TopicArn": "arn:aws:sns:us-east-1:123456789012:MyTestTopic",
                "TopicName": "MyTestTopic"
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

#### 3. Debug Topics

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
                "TopicArn": "arn:aws:sns:us-east-1:123456789012:MyTestTopic",
                "TopicName": "MyTestTopic",
                "createdAt": "2025-07-16T14:05:12.193Z"
            },
            {
                "TopicArn": "arn:aws:sns:us-east-1:123456789012:AnotherTopic",
                "TopicName": "AnotherTopic",
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

#### 4. Subscribe to a Topic

##### Request (POST)

```postman
curl --location 'http://localhost:4000/dev/subscribe-topic' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data '{
    "topicName": "MyTestTopic",
    "protocol": "http",
    "endpoint": "http://127.0.0.1:4000/dev/webhook/MyTestTopic"
}'
```

##### Response (200 OK)

```json
{
    "statusCode": 200,
    "body": {
        "message": "Successfully subscribed to topic (Offline)",
        "subscriptionArn": "arn:aws:sns:us-east-1:123456789012:MyTestTopic:1752674712193",
        "topicName": "MyTestTopic",
        "topicArn": "arn:aws:sns:us-east-1:123456789012:MyTestTopic",
        "protocol": "http",
        "endpoint": "http://127.0.0.1:4000/dev/webhook/MyTestTopic"
    }
}
```

##### Response (400 Bad Request - Topic Not Found)

```json
{
    "statusCode": 400,
    "body": {
        "message": "Topic does not exist",
        "requestedTopic": "NonExistentTopic",
        "availableTopics": ["MyTestTopic", "AnotherTopic"]
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
    "Message": "This is a test message",
    "Subject": "Test Subject",
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

#### 6. List All Subscriptions

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

#### 7. List Subscriptions for a Specific Topic

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

#### 8. Debug Subscriptions

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

#### 9. Publish Message

##### Request (POST)

```postman
curl --location 'http://localhost:4000/dev/publish-topic' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data '{
    "topicName": "MyTestTopic",
    "message": "This is a test message",
    "subject": "Test Subject"
}'
```

##### Response (200 OK)

```json
{
    "statusCode": 200,
    "body": {
        "message": "Message published successfully (Offline)",
        "messageId": "msg_1752674712193_abc123def",
        "topicName": "MyTestTopic",
        "topicArn": "arn:aws:sns:us-east-1:123456789012:MyTestTopic",
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
        "requestedTopic": "NonExistentTopic",
        "availableTopics": ["MyTestTopic", "AnotherTopic"]
    }
}
```

<br>

#### 10. List Received Notifications

##### Request (GET)

```postman
curl --location 'http://localhost:4000/dev/list-notifications' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
```

##### Request with Topic Filter (GET)

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
                "message": "This is a test message",
                "subject": "Test Subject",
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

### 3.0.2) Debugging Information

#### 📊 **Information provided by debug endpoints**

##### **`/debug-topics`**
- Total number of topics
- Complete list of topics with ARNs
- Available topic names
- File persistence path
- File status (exists/does not exist)
- File JSON content
- File statistics (size, dates)

##### **`/debug-subscriptions`**
- Total number of subscriptions
- Total number of topics
- Complete list of subscriptions
- Complete list of topics
- Subscription grouping by topic
- Available topic names
- File persistence information
- Detailed statistics

#### 🔧 **Troubleshooting with Debug Endpoints**

##### **Problem: "Topic does not exist"**
```bash
# Verify which topics are available
curl -X GET "http://localhost:4000/dev/debug-topics" \
  -H "x-api-key: f98d8cd98h73s204e3456998ecl9427j"
```

##### **Problem: Subscription not working**
```bash
# Verify subscription state
curl -X GET "http://localhost:4000/dev/debug-subscriptions" \
  -H "x-api-key: f98d8cd98h73s204e3456998ecl9427j"

# List all subscriptions
curl -X GET "http://localhost:4000/dev/list-all-subscriptions" \
  -H "x-api-key: f98d8cd98h73s204e3456998ecl9427j"

# List subscriptions for a specific topic
curl -X GET "http://localhost:4000/dev/list-subscription-topic/Topic1" \
  -H "x-api-key: f98d8cd98h73s204e3456998ecl9427j"
```

##### **Problem: No notifications received**
```bash
# Verify received notifications
curl -X GET "http://localhost:4000/dev/list-notifications" \
  -H "x-api-key: f98d8cd98h73s204e3456998ecl9427j"
```

##### **Problem: Data lost on restart**
```bash
# Verify file persistence
curl -X GET "http://localhost:4000/dev/debug-topics" \
  -H "x-api-key: f98d8cd98h73s204e3456998ecl9427j"
```

#### 📋 **Recommended Debugging Flow**

1. **Create topic** → Verify with `/debug-topics`
2. **Subscribe** → Verify with `/debug-subscriptions` or `/list-all-subscriptions`
3. **Publish message** → Verify with `/list-notifications`
4. **If there are issues** → Use debug endpoints to diagnose
   - **Subscriptions**: `/list-all-subscriptions` or `/list-subscription-topic/{topicName}`
   - **Topics**: `/debug-topics`
   - **Notifications**: `/list-notifications`

#### ⚠️ **Limitations of Debug Endpoints**

- **Only offline mode**: Do not work in production
- **Require API Key**: Need authentication
- **Only for development**: Do not use in production
- **Sensitive information**: May show file paths

### 3.0.3) Important Notes

1. **Enhanced Local Development**
   - Ensure the local server is running (`npm start`)
   - Verify that the configured ports are available
   - SNS messages are simulated locally with persistence in JSON files
   - Data persists between server restarts

2. **Webhooks System**
   - Automatic webhooks use: `http://127.0.0.1:4000/dev/webhook/{topicName}`
   - Notifications are saved in `.serverless/offline-notifications.json`
   - You can view received notifications with `/list-notifications`

3. **Data Persistence**
   - Topics: `.serverless/offline-topics.json`
   - Subscriptions: `.serverless/offline-subscriptions.json`
   - Notifications: `.serverless/offline-notifications.json`
   - Files are created automatically when using endpoints

4. **Debugging and Monitoring Endpoints**
   - `/debug-topics`: Full state of topics with statistics
   - `/debug-subscriptions`: Full state of subscriptions with grouping
   - `/list-all-subscriptions`: All subscriptions with filtering and statistics
   - `/list-subscription-topic`: Subscriptions for a specific topic
   - `/list-notifications`: Received notifications with filtering
   - Only available in offline mode
   - Useful for troubleshooting and monitoring

5. **Enhanced Error Handling**
   - Common error codes:
     - 400: Bad Request (invalid data, topic does not exist)
     - 401: Unauthorized (invalid API Key)
     - 404: Not Found (resource not found)
     - 500: Internal Server Error
   - More descriptive error messages
   - List of available topics in errors

6. **Validations**
   - Check for topic existence before subscribing
   - Validate input parameters
   - Prevent duplicate topics

7. **Recommended Workflow**
   1. Create topic with `/create-manual-topic`
   2. Verify with `/list-topics` or `/debug-topics`
   3. Subscribe with `/subscribe-topic`
   4. Verify subscription with `/list-subscription-topic/{topicName}` or `/list-all-subscriptions`
   5. Publish message with `/publish-topic`
   6. View notifications with `/list-notifications`

8. **Limitations in Local Development**
   - Email subscriptions do not send real emails
   - ARNs are simulated but consistent
   - Notifications are simulated but saved for debugging
   - HTTP webhooks function completely

<br>

</details>



### 3.1) References [🔝](#index-)

<details>
  <summary>View</summary>
 
 <br>

### Official Documentation

* [Serverless Framework Documentation](https://www.serverless.com/framework/docs)
* [AWS SNS Documentation](https://docs.aws.amazon.com/sns/)
* [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html)
* [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
* [API Gateway Documentation](https://docs.aws.amazon.com/apigateway/)

### Tutorials and Examples

* [Tutorial aws-sdk v2](https://unpkg.com/browse/serverless-offline-sns@0.65.0/README.md)
* [Amazon Simple Notification Service (SNS) JavaScript SDK v3 code examples](https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/sns)
* [Serverless Framework Examples](https://github.com/serverless/examples)
* [AWS SNS Best Practices](https://docs.aws.amazon.com/sns/latest/dg/sns-best-practices.html)
* [Serverless Offline Plugin](https://github.com/dherault/serverless-offline)

### Tools and Resources

* [Postman Documentation](https://learning.postman.com/docs/getting-started/introduction/)
* [Node.js Documentation](https://nodejs.org/en/docs/)
* [AWS CloudFormation Documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)
* [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html)

### Community and Support

* [Serverless Framework Forum](https://forum.serverless.com/)
* [AWS Developer Forums](https://forums.aws.amazon.com/)
* [Stack Overflow - Serverless Framework](https://stackoverflow.com/questions/tagged/serverless-framework)
* [GitHub Issues - Serverless Framework](https://github.com/serverless/serverless/issues)

### Videos and Courses

* [AWS SNS Tutorial](https://www.youtube.com/watch?v=m3hHhPwv1OU)
* [Serverless Framework Crash Course](https://www.youtube.com/watch?v=71cd5XerKss)
* [AWS Lambda & API Gateway Tutorial](https://www.youtube.com/watch?v=71cd5XerKss)

<br>

</details>



