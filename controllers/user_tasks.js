const queries = require('../db/task_query');
const knex = require('../db/connect')
exports.get = async (ctx) => {
    try {
        const currentDate = new Date()
        const task = await queries.getAll();
        if (task.length != 0) {
            console.log(currentDate)
            ctx.body = {
                status: 'success',
                data: task
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That task does not exist.'
            };
        }
    } catch (err) {
        console.log(err)
    }
}


exports.upadateStatus = async ctx => {
    try {
        const note_started = await queries.upadateStatus(ctx.params.id);
        const update_overdue = await queries.updateOverDue(task.id)
        const update_in_progress = await queries.updateInProgress(task.id)
        const fetch_task = await queries.find(task.id)
        if (task.length != 0) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: fetch_task
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


exports.create = async ctx => {
    try {
        const task = await queries.create(ctx.request.body);
        // const over_due = await queries.updateOverDue(task.id)
        // const fetch_task = await queries.find(task.id)
        if (task.length != 0) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: fetch_task
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
        const task = await queries.updateData(ctx.params.id, ctx.request.body);
        if (task.length != 0) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: task
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That task does not exist.'
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
        const task = await queries.deleteData(ctx.params.id);
        if (task.length != 0) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That task does not exist.'
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
        const task = await queries.getOne(ctx.params.id);
        ctx.body = {
            status: 'success',
            data: task
        };
    } catch (err) {
        console.log(err)
    }
}

exports.getAllOverDue = async (ctx) => {
    try {
        const task = await queries.getAllOverDue();
        if (task.length != 0) {
            ctx.body = {
                status: 'success',
                message: 'All OverDue Tasks',
                data: task
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That task does not exist.'
            };
        }
    } catch (err) {
        console.log(err)
    }
}

exports.updateCompletedTask = async (ctx) => {
    try {
        const task = await queries.updateCompletedTask(ctx.params.id);
        if (task.length != 0) {
            ctx.body = {
                status: 'success',
                message: ' OverDue Tasks of a particular user ',
                data: task
            };
        } else {
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That task does not exist.'
            };
        }
    } catch (err) {
        console.log(err)
    }
}

exports.get_user_task = async ctx => {
    try {
        const user_task = await queries.get_user_task(ctx.params.id)
        console.log(user_task)
        ctx.body = {
            data: user_task
        }
        console.log(ctx.body)


    } catch (err) {
        console.log(err)
    }
}

