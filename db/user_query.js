const knex = require('./connect');
const Users = require('../models/user')
const Address = require('../models/user_address')
const userLogin = require('../models/user_login')

module.exports = {

    getAll() {
        return Users.query()
            .withGraphFetched("address")
            .withGraphFetched("tasks")
            .withGraphFetched("photo")

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
            .where({ user_id: id, address_type: "Temparary" })
            .update(data)
            .returning('*')
    },
    updateAddress2(id, data) {
        return Address.query()
            .where({ user_id: id, address_type: 'Parmanent' })
            .update(data)
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
            .where({ id: id })
            .delete()
            .returning('*');
    },

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
