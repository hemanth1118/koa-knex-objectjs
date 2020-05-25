const knex = require('../db/connect');

const Model = require('objection').Model
Model.knex(knex)


// const unique = require('objection-unique')({
//     fields: ['first_name']
// })

class Users extends (Model) {

    static get tableName() {
        return 'users'
    }


    static get relationMappings() {
        const Task = require('./user_tasks')
        const Address = require('./user_address')

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


        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            // required: ['first_name', 'last_name',],

            properties: {
                id: { type: 'integer' },
                first_name: { type: 'string', minLength: 1, maxLength: 255 },
                last_name: { type: 'string', minLength: 1, maxLength: 255 },
                sex: { type: 'string' },
                date_of_birth: { type: 'string' },

            }
        };
    }
}

module.exports = Users;

