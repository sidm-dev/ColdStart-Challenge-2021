const { getUser } = require('../shared/user-utils');

module.exports = async function (context, req) {

  context.log("Something has happened. " + context.invocationId); 

  const { v4: uuidv4 } = require('uuid');
  
  req.body.Id = `${ uuidv4() }`;

  const order = req.body;

  try {
    // Add the pre-order JSON document in a queue
    console.log('Queueing order');
    context.bindings.myQueueItem = req.body;

    context.res.status(201).json(order);
    context.done();
  } catch (error) {
    console.error(error);
    context.res.status(500).send(error);
  }
};
