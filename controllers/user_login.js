var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const logger = require('../logger')
const User = require('../models/user')
const userAddress = require('../models/user_address')
// var Validator = require('koa-validate').Validator
// const Koa = require('koa')
// const app = new Koa();

exports.create = async (ctx) => {
    try {
        // var hashedPassword = bcrypt.hashSync(ctx.request.body.password, 8);
        var req_email = ctx.request.body.email
        var req_password = ctx.request.body.password
        var req_role = ctx.request.body.role
        console.log(ctx.request.body)
        if (req_email && req_password) {
            logger.info("signup() method initiated")
            const login = await User.query()
                .insert({ email: req_email, password: req_password, role: req_role })
                .then((response) => {
                    console.log(response.id)
                    return userAddress.query()
                        .insert({ user_id: response.id, address_type: "Temparary" })
                })
                .then((response) => {
                    return userAddress.query()
                        .insert({ user_id: response.user_id, address_type: "Parmanent" })
                })
                .then((res) => {
                    return User.query()
                        .where({ email: req_email })
                })

            console.log(login)
            if (login) {
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
            // console.log(login)
        }
    } catch (err) {
        ctx.status = 400,
            ctx.body = {
                status: 'Error',
                message: 'Sorry, an error has occurred.'
            }

    }
}

exports.login = async (ctx) => {
    // try {
    logger.info('login() method initiated')
    const req_email = ctx.request.body.email;
    const req_password = ctx.request.body.password;
    // var hashedPassword = bcrypt.hashSync(ctx.request.body.password, 8);
    console.log(req_email)
    if (req_email.length !== 0 && req_password !== 0) {
        // if (bcrypt.compareSync(req_password, hashedPassword)) {
        const myuser = { req_email, req_password }
        logger.info('Entered into if block')
        console.log(myuser)

        // ctx.assert('email', 'required').notEmpty();
        // ctx.assert('email', 'valid email required').isEmail();
        // ctx.assert('password', '6 to 20 characters required').len(6, 20);

        // let errors = ctx.validationErrors();
        // let mappedErrors = ctx.validationErrors(true);
        // if (errors) {
        //     return errors
        // } else if (mappedErrors) {
        //     return mappedErrors
        // }

        const user = await User.query()
            .findOne({ email: req_email, password: req_password })
            .returning('*')
            .then((user) => {
                console.log(user)
                if (user.role == "Admin") {
                    const token = jwt.sign(myuser, 'secret', { expiresIn: '1h' });
                    ctx.body = {
                        token, user
                    }

                }
            }).catch((err) => {
                ctx.status = 400
                ctx.body = {
                    status: 'error',
                    message: 'User was not found.'
                }
            })
        // console.log(user)
        // if (user === undefined) {
        //     ctx.status = 422,
        //         ctx.body = {
        //             status: 'error',
        //             message: err || 'User was not found.'
        //         }
        // } else if (user.role == "Admin") {
        //     const token = jwt.sign(myuser, 'secret', { expiresIn: '1h' });
        //     ctx.body = {
        //         token, user
        //     }
        // }
        // } catch (err) {
        //     logger.error('login() method failed')
        //     logger.error(err)
        //     ctx.status = 400,
        //         ctx.body = {
        //             status: 'error',
        //             message: err || 'Sorry, an error has occurred.'
        //         }
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
        const user = await User.query()
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
        const user = await User.query()
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
        const user = await User.query()
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


