const knex = require('../db/connect');

const Model = require('objection').Model
Model.knex(knex)


class Address extends Model {

    static get tableName() {
        return 'user_address'
    }

    static get jsonSchema() {
        return {
            type: 'Array',
            // required: ['city', 'address2', 'address1', 'pincode'],

            properties: {
                address_type: { type: 'string' },
                address2: { type: 'string' },
                address1: { type: 'string', minLength: 1, maxLength: 255 },
                pincode: { type: 'string', minLength: 1, maxLength: 255 },
                user_id: { type: 'integer' },
                city: { type: 'string', minLength: 1, maxLength: 255 },
                country: { type: 'string', minLength: 1, maxLength: 255 }
            }

        };
    }



}


module.exports = Address