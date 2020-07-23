const knex = require('../db/connect');

const Model = require('objection').Model
Model.knex(knex)

class UserPhoto extends (Model) {
    static get tableName() {
        return 'user_photo'
    }

}

module.exports = UserPhoto;