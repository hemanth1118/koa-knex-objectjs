const Koa = require('koa')
const app = new Koa();
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const routes = require('./routes/route-index')
const cors = require('@koa/cors');
const fileRoutes = require('./routes/file')
const uploader = require('koa-file-uploader');
const config = { destPath: '/uploads' };
var serve = require('koa-static')
// import Router, { RouterContext } from "@koa/router";
// import { query, validationResults, IValidationState } from "koa-req-validation";

// require('koa-validate')(app);


const Router = require('koa-router')
const router = new Router();
app.use(cors());
var jwt = require('koa-jwt');
app.use(bodyparser())
// app.use(koaValidator([options]))
app.use(routes.allowedMethods());
app.use(routes.routes())
app.use(uploader(config));

// router.post("/login", async (ctx, next) => {

//     ctx.checkBody('postparam', 'Invalid postparam').notEmpty().isInt()
//     let errors = await ctx.validationErrors();

//     if (errors) {
//         ctx.body = `There have been validation errors: ${util.inspect(errors)}`;
//         ctx.status = 400;
//     } else {
//         ctx.body = {
//             urlparam: ctx.params.urlparam,
//             getparam: ctx.params.getparam,
//             postparam: ctx.params.postparam
//         }
//     }

//     await next();
// const user = await User.query()
//     .findOne({ email: req_email, password: req_password })
//     .returning('*')
//     .then((user) => {
//         console.log(user)
//         if (err) {
//             console.log("entered into 2 if block")
//             ctx.body = {
//                 status: 'error',
//                 message: err || 'User was not found.'
//             }
//         } else if (user.role == "Admin") {
//             const token = jwt.sign(myuser, 'secret', { expiresIn: '1h' });
//             ctx.body = {
//                 token, user
//             }

//         }
//     });
// })
app.use(serve(__dirname + '/uploads'));

const server = app.listen(3000, () => { console.log("server is started on port 3000.....") })

module.exports = server;

