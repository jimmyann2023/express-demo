const path = require('path');
const log4js = require('log4js');

log4js.configure({
  appenders: {
    cheese: {
      type: 'dateFile', // 每天创建
      filename: 'logs/cheese',
      pattern: "-yyyy-MM-dd.log",
      alwaysIncludePattern: true,
      category: 'normal'
    }
  },
  categories: {default: {appenders: ['cheese'], level: 'info'}}
})

const logger = log4js.getLogger('cheese');
logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");

module.exports = logger