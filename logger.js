const { createLogger, transports, format } = require('winston');

const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({
            filename: './logs/development.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.simple())
        })
    ]
})

module.exports = logger;

