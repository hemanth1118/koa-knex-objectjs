const queries = require('../db/address_query');

exports.get = async (ctx) => {
    try {
        const address = await queries.getAll();
        if (address.length != 0) {
            ctx.body = {
                status: 'success',
                data: address
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That user does not exist.'
            };
        }
    } catch (err) {
        console.log(err)
    }
}
exports.create = async ctx => {
    try {
        const address = await queries.create(ctx.request.body);
        if (address.length != 0) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: address
            };
        } else {
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            };
        }
    } catch (err) {
        console.log(err)
    }

}

exports.update = async (ctx) => {
    try {
        const address = await queries.updateData(ctx.params.id, ctx.request.body);
        if (address.length != 0) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: address
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That biscuit does not exist.'
            };
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
}
exports.delete = async ctx => {
    try {
        const address = await queries.deleteData(ctx.params.id);
        if (address.length != 0) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That movie does not exist.'
            };
        }
    } catch (err) {
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
}

exports.getById = async ctx => {
    try {
        const address = await queries.getOne(ctx.params.id);
        ctx.body = {
            status: 'success',
            data: address
        };
    } catch (err) {
        console.log(err)
    }
}

// exports.getrole = async ctx => {
//     try {
//         const role = await queries.getrole(ctx.params.id)
//         console.log(role)
//         ctx.body = {
//             data: role
//         }
//         console.log(ctx.body)


//     } catch (err) {
//         console.log(err)
//     }
// }

