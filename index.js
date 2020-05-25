const Koa = require('koa')
const app = new Koa();
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const routes = require('./routes/route-index')
const cors = require('@koa/cors');


app.use(cors());

var jwt = require('koa-jwt');

app.use(bodyparser())


app.use(routes.allowedMethods());
app.use(routes.routes())


const server = app.listen(3000, () => { console.log("server is started on port 3000.....") })


module.exports = server;

