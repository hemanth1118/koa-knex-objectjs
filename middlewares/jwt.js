const jwt = require('jsonwebtoken')
const logger = require('../logger')

const isValid = async (ctx, next) => {
    try {
        logger.info('isvalid() jwt token initiated')
        var token = ctx.request.headers['authorization'];
        if (token.startsWith('Bearer')) {
            token = token.split(' ')[1];
            if (token) {
                console.log('catch block')
                console.log('started into if block')
                token = jwt.verify(token, 'secret')
                await next();
                logger.info('token verified')
            } else {
                ctx.body = { message: 'invalid Token' }
            }
        } else {
            ctx.body = { message: 'No token provided' }
        }

    } catch (err) {
        logger.error('token verification failed')
        logger.error(err)
        ctx.body = { message: err }

    }
}

module.exports = isValid;
