const userLogin = require('../models/user_login')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const logger = require('../logger')
const queries = require('../db/user_query')
const User = require('../models/user')

exports.create = async (ctx) => {
    try {

        // var hashedPassword = bcrypt.hashSync(ctx.request.body.password, 8);
        var req_email = ctx.request.body.email
        var req_first_name = ctx.request.body.first_name
        var req_last_name = ctx.request.body.last_name
        var req_password = ctx.request.body.password
        console.log(req_email)
        if (req_email && req_first_name && req_password && req_last_name) {
            const login = await userLogin.query()
                .insert({ email: req_email, password: req_password, first_name: req_first_name, last_name: req_last_name })
                .then((response) => {
                    return User.query()
                        .insert({  first_name: req_first_name, last_name: req_last_name })
                        .then((res) => {
                            return userLogin.query()
                                .where({ email: req_email })
                        })
                })

            ctx.status = 200;
            ctx.body = {
                status: 'user credentials are added',
                data: login
            }
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            };
        }
    } catch (err) {
        ctx.status = 400,
            ctx.body = {
                status: 'error',
                message: err || 'Sorry, an error has occurred.'
            }

    }
}

exports.login = async (ctx) => {
    try {
        logger.info('login() method initiated')
        const req_email = ctx.request.body.email;
        const req_password = ctx.request.body.password;
        // var hashedPassword = bcrypt.hashSync(ctx.request.body.password, 8);
        if (req_email.length !== 0 && req_password !== 0) {
            // if (bcrypt.compareSync(req_password, hashedPassword)) {
            const myuser = { req_email, req_password }
            logger.info('Entered into if block')
            console.log(myuser)
            const user = await userLogin.query()
                .findOne({ email: req_email, password: req_password })
                .then((user) => {
                    if (user) {
                        const token = jwt.sign(myuser, 'secret', { expiresIn: '1h' });
                        ctx.body = {
                            token
                        }
                    }
                })


            // }
        }
        else {
            ctx.body = { message: "password not matched" }
            logger.error('login() method failed')


        }
    } catch (err) {
        logger.error('login() method failed')
        logger.error(err)
        ctx.status = 400,
            ctx.body = {
                status: 'error',
                message: err || 'Sorry, an error has occurred.'

            }

    }
}

exports.listed_users = async (ctx) => {
    try {
        logger.info('listed_users() method initiated')
        const user = await userLogin.query()
        ctx.body = { user }

    } catch (err) {
        logger.error('listed_users() method failed')
        logger.error(err)
        ctx.status = 400,
            ctx.body = {
                status: 'error',
                message: err || 'Sorry, an error has occurred.'

            }

    }
}

exports.getUserById = async (ctx) => {
    try {

        logger.info('getUserById() method initiated')
        let id = parseInt(ctx.params.id)
        const user = await userLogin.query()
            .findById(id)
            .returning('*')
        ctx.body = { user }
        console.log(user)

    } catch (err) {
        logger.error('getUserById() method failed')
        logger.error(err)
        ctx.status = 400,
            ctx.body = {
                status: 'error',
                message: err || 'Sorry, an error has occurred.'

            }

    }
}

exports.updateUser = async (ctx) => {
    try {
        var data = {
            first_name: ctx.request.body.first_name,
            last_name: ctx.request.body.last_name,
            email: ctx.request.body.email
        }
        console.log(data)
        logger.info('updateUser() method initiated')
        let id = parseInt(ctx.params.id)
        const user = await userLogin.query()
            .update(data)
            .where('id', id)
            .returning('*')
        ctx.body = { user }

    } catch (err) {
        logger.error('updateUser() method failed')
        logger.error(err)
        ctx.status = 400,
            ctx.body = {
                status: 'error',
                message: err || 'Sorry, an error has occurred.'

            }

    }
}

exports.deleteUser = async (ctx) => {
    try {
        logger.info('deleteUser() method initiated')
        let id = parseInt(ctx.params.id)
        const user = await userLogin.query()
            .deleteById(id)
        ctx.body = {
            message: "deleted successfully"
        }

    } catch (err) {
        logger.error('deleteUser() method failed')
        logger.error(err)
        ctx.status = 400,
            ctx.body = {
                status: 'error',
                message: err || 'Sorry, an error has occurred.'

            }

    }
}


