const { getUser } = require('../shared/user-utils');

module.exports = async function (context, req) {
  // Get the user details from the request
  const user = getUser(req);

  // Get the pre-order from the request

  // TODO: add the pre-order JSON document in a queue

  //https://sidmdevcoldstartstore.queue.core.windows.net/sidm-dev-coldstart-pre-order-queue

  const { QueueServiceClient } = require("@azure/storage-queue");

   const account = process.env["STORAGE_ACCOUNT"];
   const saKey = process.env["SA_KEY"];
   const sas = process.env["SAS_TOKEN"];
   const queueName = process.env["SA_QUEUE_NAME"];

  const queueServiceClient = new QueueServiceClient(
    `https://${account}.queue.core.windows.net${sas}`
  );

  console.log(`Queue.........: ${account}`);
  console.log(`Queue1.........: ${sas}`);
  console.log(`Queue2.........: ${queueName}`);
  console.log(`user.........: ${user.userDetails}`);
  console.log(`req.........: ${req.body.name}`);

  //* Using Shared Access Key */
  //const { DefaultAzureCredential } = require("@azure/identity");
  //const credential = new DefaultAzureCredential();
  //const queueServiceClient = new QueueServiceClient(
  //  `https://${account}.queue.core.windows.net`,
  //  credential
  //);

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
    // Send a message into the queue using the sendMessage method.
    const sendMessageResponse = await queueClient.sendMessage(rbody);
    console.log(
      `Sent message successfully, service assigned message Id: ${sendMessageResponse.messageId}, service assigned request Id: ${sendMessageResponse.requestId}`
    );
  }

  main3(req.body);

  context.res.status(201);
};
