const knex = require('../db/connect');

const Model = require('objection').Model
Model.knex(knex)


const unique = require('objection-unique')({
    fields: ['email']
})

class Users extends unique(Model) {

    static get tableName() {
        return 'users'
    }


    static get relationMappings() {
        const Task = require('./user_tasks')
        const Address = require('./user_address')
        const Photo = require('./user_photo')

        return {
            address: {
                modelClass: Address,
                relation: Model.HasManyRelation,
                join: {
                    from: "users.id",
                    to: "user_address.user_id"
                }
            },
            tasks: {
                modelClass: Task,
                relation: Model.HasManyRelation,
                join: {
                    from: "users.id",
                    to: "user_tasks.user_id"
                }
            },
            photo: {
                modelClass: Photo,
                relation: Model.HasOneRelation,
                join: {
                    from: "users.id",
                    to: "user_photo.user_id"
                }
            },


        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['first_name', 'last_name',],

            properties: {
                id: { type: 'integer' },
                email: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255 }
            }
        };
    }
}

module.exports = Users;

