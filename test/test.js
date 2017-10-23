const client = require('../dist/commonjs/index.js').ConsumerClient;
const clientInstance = new client();
const util = require('util');

async function run() {
  await clientInstance.initialize();

  clientInstance.on('*', (userTaskConfig) => {
    console.log(userTaskConfig);
  });
}

run();
