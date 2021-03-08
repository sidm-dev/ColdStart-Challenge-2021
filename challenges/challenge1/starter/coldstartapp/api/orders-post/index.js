const { getUser } = require('../shared/user-utils');

module.exports = async function (context, req) {

  const { v4: uuidv4 } = require('uuid');
  let appInsights = require('applicationinsights');
  appInsights.setup().start(); //No need to pass key in setup as APPINSIGHTS_INSTRUMENTATIONKEY is already set up.

  // Get the user details from the request
  const user = getUser(req);

  // Get the pre-order from the request

  // TODO: add the pre-order JSON document in a queue

  //https://sidmdevcoldstartstore.queue.core.windows.net/sidm-dev-coldstart-pre-order-queue

  const { QueueServiceClient, StorageSharedKeyCredential  } = require("@azure/storage-queue");

  const account = process.env.STORAGE_ACCOUNT;
  const queueName = process.env.SA_QUEUE_NAME;

  const qConnMode = process.env.qConnMode;

  console.log(`qConnMode.........: ${qConnMode}`);

  let queueServiceClient = null;

  if (qConnMode == "CONNECTIONSTRING")
  {
    const AZURE_STORAGE_CONNECTIONSTRING = process.env.AZURE_STORAGE_CONNECTIONSTRING || "";

    queueServiceClient = QueueServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTIONSTRING);
  } else if (qConnMode == "SASignatureToken") {
    const sas = process.env["SAS_TOKEN"];
    queueServiceClient = new QueueServiceClient(`https://${account}.queue.core.windows.net${sas}`);
  } else if (qConnMode == "SharedAccessKey") {
    const saKey = process.env.SAS_KEY;

    // Use StorageSharedKeyCredential with storage account and account key
    // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
    // *** Make sure you cutpaste the correct Key from Access Key in Azure rather than than sas. ***
    const sharedKeyCredential = new StorageSharedKeyCredential(account, saKey);

    queueServiceClient = new QueueServiceClient(`https://${account}.queue.core.windows.net`, 
                              sharedKeyCredential);                    
  }
   //* Using Shared Access Key .....is this managed IDENETITY   ???????    */
  //const { DefaultAzureCredential } = require("@azure/identity");
  //const credential = new DefaultAzureCredential();
  //const queueServiceClient = new QueueServiceClient(
  //  `https://${account}.queue.core.windows.net`,
  //  credential
  //);

  console.log(`Queue2.........: ${queueName}`);
  console.log(`user.........: ${user.userDetails}`);
  console.log(`req.........: ${req.body.FullAddress}`);

 

  //list Queues
  async function main1() {
    let iter1 = queueServiceClient.listQueues();
    let i = 1;
    for await (const item of iter1) {
      console.log(`Queue${i}: ${item.name}`);
      i++;
    }
  }

  main1();

  //create a Queue
  async function main2() {
    const queueClient = queueServiceClient.getQueueClient(queueName);
    const createQueueResponse = await queueClient.create();
    console.log(
      `Created queue ${queueName} successfully, service assigned request Id: ${createQueueResponse.requestId}`
    );
  }

  main2();

  // Send a Message to the Queue
  //const queueName = "<valid queue name>";

  async function main3(rbody) {
    const queueClient = queueServiceClient.getQueueClient(queueName);

    rbody.Id = uuidv4();

    // Send a message into the queue using the sendMessage method.
    const sendMessageResponse = await queueClient.sendMessage(JSON.stringify(rbody));
    console.log(
      `Sent message successfully, service assigned message Id: ${sendMessageResponse.messageId}, service assigned request Id: ${sendMessageResponse.requestId}`
    );
  }

  main3(req.body);

  context.res.status(201);
};
