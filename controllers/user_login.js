const userLogin = require('../models/user_login')
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

exports.create = async (ctx) => {
    try {
        var hashedPassword = bcrypt.hashSync(ctx.request.body.password, 8);
        var req_email = ctx.request.body.email
        console.log(hashedPassword)
        if (!ctx.length) {
            const login = await userLogin.query()
                .insert({ email: req_email, password: hashedPassword })
                .then((response) => {
                    return userLogin.query()
                        .where({ email: req_email })
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

        const req_email = ctx.request.body.email;
        const req_password = ctx.request.body.password;
        const myuser = { req_email, req_password }
        return userLogin.query()
            .where({ email: req_email })
            .then((response) => {
                const token = jwt.sign(myuser, 'secret', { expiresIn: '1h' });
                ctx.body = {
                    token: token
                }
            })
    } catch (err) {
        ctx.status = 400,
            ctx.body = {
                status: 'error',
                message: err || 'Sorry, an error has occurred.'
            }

    }
}

