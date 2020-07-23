const queries = require('../db/user_query');
const knex = require('../db/connect');
const Users = require('../models/user')
const userLogin = require('../models/user_login')
const Address = require('../models/user_address')
const logger = require('../logger')
const Task = require('../models/user_tasks')
const userPhoto = require('../models/user_photo')
// const Address1 = require('./user_address').Address1

exports.get = async (ctx) => {
    try {
        logger.info(' User get() initiated')
        const user = await queries.getAll();
        if (user.length) {
            logger.info(' User get() execution completed')
            ctx.body = {
                status: 'success',
                user
            };
        } else {
            logger.error(' User get() execution failed in else block')
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That user does not exist.'
            };
        }
    } catch (err) {
        logger.error(' User get() execution failed in catch block')
        console.log(err)
    }
}

exports.getEmail = async (ctx) => {
    try {
        logger.info(' User get() initiated')
        console.log(ctx.params)
        const email = ctx.params.email
        const user = await Users.query().where({ email: email });
        if (user.length) {
            logger.info(' User get() execution completed')
            ctx.body = {
                status: 'success',
                user
            };
        } else {
            logger.error(' User get() execution failed in else block')
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That user does not exist.'
            };
        }
    } catch (err) {
        logger.error(' User get() execution failed in catch block')
        console.log(err)
    }
}

exports.create = async ctx => {
    try {
        logger.info(' User create() initiated')
        req_city = ctx.request.body.address[0].city
        req_pincode = ctx.request.body.address[0].pincode
        req_country = ctx.request.body.address[0].country;
        req_house_no = ctx.request.body.address[0].house_no;
        req_street = ctx.request.body.address[0].street;
        req_user_id = ctx.request.body.address[0].user_id;
        req_first_name = ctx.request.body.first_name;
        req_last_name = ctx.request.body.last_name;
        req_sex = ctx.request.body.sex;
        req_date_of_birth = ctx.request.body.date_of_birth;
        req_address_type = ctx.request.body.address[0].address_type;
        req_address1 = ctx.request.body.address[0].address1;
        req_address2 = ctx.request.body.address[0].address2;

        req2_city = ctx.request.body.address[1].city
        req2_pincode = ctx.request.body.address[1].pincode
        req2_country = ctx.request.body.address[1].country;
        req2_house_no = ctx.request.body.address[1].house_no;
        req2_street = ctx.request.body.address[1].street;
        req2_address_type = ctx.request.body.address[1].address_type;
        req2_address1 = ctx.request.body.address[1].address1;
        req2_address2 = ctx.request.body.address[1].address2;


        if (!ctx.length) {
            const user = await Users.query()
                .insert({ first_name: req_first_name, last_name: req_last_name, sex: req_sex, date_of_birth: req_date_of_birth })
                .returning('id')
                .then(function (response) {
                    return Address.query()
                        .insert({ city: req_city, pincode: req_pincode, country: req_country, user_id: response.id, address1: req_address1, address2: req_address2, address_type: req_address_type })
                        .then((response) => {
                            return Address.query()
                                .insert({ city: req2_city, pincode: req2_pincode, country: req2_country, address1: req2_address1, address2: req2_address2, address_type: req2_address_type, user_id: response.user_id })
                        })
                        .then((response) => {
                            return Users.query()
                                .where({ first_name: req_first_name })
                                .withGraphFetched("address")
                        })
                })
            logger.info(' User create() execution completed')
            console.log(req_city)
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                message: 'user created with user Address',
                data: {
                    user
                    // req_city, req_pincode, req_country, req2_address1, req2_address2, req2_city
                }
            }

        } else {
            logger.error('User create() execution failed in else block')
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'

            };
        }
    } catch (err) {
        logger.error('User create() execution failed in catch block')
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }

}

exports.update = async (ctx) => {
    try {
        logger.info(' User update() initiated')

        var data = {
            first_name: ctx.request.body.first_name,
            last_name: ctx.request.body.last_name,
            sex: ctx.request.body.sex,
            date_of_birth: ctx.request.body.date_of_birth
        }

        var data1 = {
            city: ctx.request.body.address[0].city,
            pincode: ctx.request.body.address[0].pincode,
            country: ctx.request.body.address[0].country,
            address_type: ctx.request.body.address[0].address_type,
            address1: ctx.request.body.address[0].address1,
            address2: ctx.request.body.address[0].address2
        }

        var data2 = {
            city: ctx.request.body.address[1].city,
            pincode: ctx.request.body.address[1].pincode,
            country: ctx.request.body.address[1].country,
            address_type: ctx.request.body.address[1].address_type,
            address1: ctx.request.body.address[1].address1,
            address2: ctx.request.body.address[1].address2
        }
        console.log(data2)
        console.log(data1)
        let id = parseInt(ctx.params.id)
        if (data.length != 0) {
            console.log('enterd into if block')
            const user = await queries.updateUser(id, data)
            var data = data1
            const address1 = await queries.updateAddress1(id, data)
            var data = data2
            console.log(address1)
            const address2 = await queries.updateAddress2(id, data)
            const address = { address1, address2 }
            logger.info(' User update() execution completed')
            ctx.body = {
                status: 'success',
                data: user, address
            };
        } else {
            logger.error(' User update() execution failed in else block')
            ctx.status = 400;
            ctx.body = {
                status: 'Error',
                message: 'user does not exist'
            };
        }
    } catch (err) {
        logger.error(' User update() execution failed in catch block')
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
}
exports.delete = async ctx => {
    try {
        logger.info(' User delete() initiated')
        let id = parseInt(ctx.params.id)
        // let fetchUserPhoto = await 

        var user = await queries.deleteAddress(id)
            .then(async (res) => {
                await Task.query()
                    .where('user_id', id)
                    .delete()
                    .returning('*')
            })
            .then(async (res) => {
                await userPhoto.query()
                    .where('user_id', id)
                    .delete()
                    .returning('*')
            })
            .then(async (response) => {
                console.log("hemanth")
                await queries.deletUser(id)
            })
        if (!user) {
            logger.info(' User delete() execution completed')
            ctx.status = 200;
            ctx.body = {
                status: 'success',
            };
        } else {
            logger.error(' User delete() execution failed in else block')
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That movie does not exist.'
            };
        }
    } catch (err) {
        logger.error(' User delete() execution failed in catch block')
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
}


exports.getById = async ctx => {
    try {
        logger.info(' User getById() initiated')
        let id = parseInt(ctx.params.id)
        const user = await queries.getOne(id)
        console.log(user)
        if (user.length != 0) {
            logger.info(' User getById() execution completed')
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: user
            };
        } else {
            logger.error(' User getById() execution failed in else block')
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That user does not exist.'
            };
        }
    } catch (err) {
        logger.error(' User getById() execution failed in catch block')
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
}

