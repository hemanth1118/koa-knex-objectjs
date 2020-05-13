const knex = require('./connect');
const Address = require('../models/user_address')

module.exports = {

    getAll() {
        return Address.query()
            .withGraphFetched("address1")
    },
    getOne(id) {
        return knex("user_address")
            .where("id", id)
            .first();
    },
    create(user_address) {
        return Address.query()
            .insert(user_address)
            .returning('*');
    },

    updateData(id, user_address) {
        return Address.query()
            .update(user_address)
            .where('id', id)
            .returning('*');
    },

    deleteData(id) {
        return knex('user_address')
            .del()
            .where({ id: parseInt(id) })
            .returning('*');
    },

    // getrole(id) {
    //     console.log(id)
    //     knex.from("users")
    //         .innerJoin('roles', 'users.roles_id', 'users.id')
    //         .where('users.role_id', id)
    // }
};
