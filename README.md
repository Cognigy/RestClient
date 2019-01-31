# CognigyClient
Repo for the cognigy (server) client which can be used 
to connect to the Cognigy.AI platform from server applications written in Node.JS.

This client is only compatible with the ``3.X`` version of our product and will no longer work with the old ``2.X`` versions!

## Installation
To install the cognigy client for your server project, use the following:
```
npm i @cognigy/cognigy-rest-client --save
```

## Usage
If you want to use the CognigyClient you have to create a **REST Endpoint** on the **COGNIGY.AI** platform. For a detailed description of creating and configuring a REST Endpoint see our [Documentation](https://docs.cognigy.com/docs/deploy-a-rest-endpoint).

### Requirements
You'll need two bits of information from our **COGNIGY.AI** platform to sucessfully connect to your configured Socket Endpoint:
- The URL of the REST Endpoint

You can find them on the **Endpoint Editor** page of your REST Endpoint.

## Example
You get you started quickly, simply copy-paste this sample code and adjust your
options where necessary.

```typescript
import * from "@cognigy/cognigy-rest-client";

const options : OptionsREST = {
    /** Required fields */
    url: 'endpoint-url',
    userId: 'your-user-id',
    sessionId: 'session-id',
    channel: 'REST',
    handleOutput: (output) => {
        console.log("Text: " + output.text + "   Data: " + JSON.stringify(output.data));
    },

    /** Optional fields */
    keepMarkup: true,
    handleError: (error: CognigyError) => { console.log(error); },
    handleException: (error: CognigyError) => { console.log(error); }
};

const client: CognigyRESTClient = new CognigyRESTClient(options);
client.sendMessage("I like pizza", { key: "value" });
```
