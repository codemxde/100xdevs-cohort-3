const chalk = require("chalk");

const success = chalk.green.bold;
const fail = chalk.red.bold;
const viewPort = chalk.blue.bold;
const handler = chalk.yellowBright.bold;
const middleware = chalk.magenta;

module.exports = { success, fail, viewPort, handler, middleware };
