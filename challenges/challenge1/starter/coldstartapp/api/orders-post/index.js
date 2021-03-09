const { getUser } = require('../shared/user-utils');

module.exports = async function (context, req) {

  const { v4:uuid } = require('uuid');

  context.log("Something has happened. " + context.invocationId); 

  let appInsights = require('applicationinsights');
  appInsights.setup().start(); //No need to pass key in setup as APPINSIGHTS_INSTRUMENTATIONKEY is already set up.
  
  req.body.Id = `${ uuid() }`;

  const order = req.body;

  try {
    // Add the pre-order JSON document in a queue
    context.log('Queue the pre-order');
    context.bindings.myQueueItem = req.body;

    context.res.status(201).json(order);
    context.done();
  } catch (error) {
    console.error(error);
    context.res.status(500).send(error);
  }
};
