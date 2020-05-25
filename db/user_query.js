const knex = require('./connect');
const Users = require('../models/user')
const Address = require('../models/user_address')
module.exports = {

    getAll() {
        return Users.query()
            .withGraphFetched("address")
            .withGraphFetched("tasks")

    },
    getOne(id) {
        return Users.query()
            .findById(id)
            .withGraphFetched("address")
            .withGraphFetched("tasks")
    },
    create(users) {
        return Users.query()
            .insert(users)
            .returning('*');
    },

    updateAddress1(id, data) {
        return Address.query()
            .where({ user_id: id, address_type: 'Permanent' })
            .update(data)
            .returning('*')
    },
    updateAddress2(id, data) {
        return Address.query().where({ address_type: 'Temperary' })
            .update(data)
            .where('user_id', id)
            .returning('*')
    },
    updateUser(id, user) {
        return Users.query()
            .update(user)
            .where('id', id)
            .returning('*')
    },   

    deleteAddress(id) {
        return Address.query()
            .where('user_id', id)
            .delete()
            .returning('*')
    },

    deletUser(id) {
        return Users.query()
            .findById(id)
            .delete()
            .returning('*');
    }

    // createMulti(user) {
    //     return knex("users")
    //         .insert(user.name, user.email)
    //         .returning(user.id)
    //     .then((response) => {
    //         return knex("todos")
    //             .insert(user.title, user.user_id: response[0].user_id )
    //     })
    // }

};
