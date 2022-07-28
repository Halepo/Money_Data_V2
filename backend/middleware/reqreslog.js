var winston = require('winston');
require('winston-daily-rotate-file');

module.exports = function (req, res, next) {
  const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
      new (winston.transports.DailyRotateFile)({
        filename: 'Logs/%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      }).on('rotate', function (oldFilename, newFilename) {
        // backup
      })
    ],
    exitOnError: false
  });

  var logmsg = {
    'Request IP': req.ip,
    'Method': req.method,
    'URL': req.originalUrl,
    'statusCode': res.statusCode,
    'headers': req.headers,
    'Time': new Date()
  };

  process.on('unhandledRejection', (reason, p) => {
    logger.error('exception:' + reason);
    res.status(200).json({
      'statuscode': 200,
      'message': 'Validation Error',
      'responsedata': 'Unhandled Exception Occured'
    });
  });
  logger.log('info', logmsg);
  next();
}