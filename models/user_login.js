
const knex = require('../db/connect');

const Model = require('objection').Model
Model.knex(knex)

// const unique = require('objection-unique')({
//     fields: ['email']
// })

class Login extends (Model) {
    static get tableName() {
        return 'user_login'
    }

}

module.exports = Login;