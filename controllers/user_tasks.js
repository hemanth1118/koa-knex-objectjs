const queries = require('../db/task_query');
const knex = require('../db/connect')
const logger = require('../logger')
const Task = require('../models/user_tasks')

exports.get = async (ctx) => {
    try {
        logger.info('Task getAll() initiated')
        const task = await queries.getAll();
        if (task.length != 0) {
            ctx.body = {
                status: 'success',
                data: task
            };
        } else {
            logger.error('Task getAll() failed in else block')
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That task does not exist.'
            };
        }
    } catch (err) {
        logger.error('Task getAll() failed in catch block')
        logger.error(err)
    }
}


exports.postUserID = async ctx => {
    try {
        logger.info('postUserID() initiated')
        req_id = parseInt(ctx.request.body)

        console.log(task)
        if (task.length != 0) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: task
            };
        } else {
            logger.error('Task create() failed in else block')
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            };
        }
    } catch (err) {
        logger.error('Task create() failed in catch block')
        logger.error(err)
    }

}


exports.updateStatus = async ctx => {
    try {
        const not_started = await queries.updateStatus(ctx.params.id);
        const update_overdue = await queries.updateOverDue(ctx.params.id)
        const update_in_progress = await queries.updateInProgress(ctx.params.id)
        const fetch_task = await queries.find(ctx.params.id)
        console.log(fetch_task)
        if (fetch_task.length != 0) {
            logger.info('Task update() initiated')
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: fetch_task
            };
        } else {
            logger.error('Task updateStatus() failed in else block')
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            };
        }
    } catch (err) {
        logger.error('Task updateStatus() failed in catch block')
        logger.error(err)
    }

}


exports.create = async ctx => {
    try {
        logger.info('Task create() initiated')
        console.log(ctx.request.body)
        // console.log(ctx.request.body.user_id)
        let req_id = parseInt(ctx.request.body.user_id)
        req_task = ctx.request.body.user.task;
        req_difficulty = ctx.request.body.user.difficulty;
        req_estimation = ctx.request.body.user.estimation;
        req_status = ctx.request.body.user.status;
        const task = await Task.query()
            .insert({ user_id: req_id, task: req_task, estimation: req_estimation, difficulty: req_difficulty, status: req_status })
            .returning("*")
        console.log(task)
        if (task.length != 0) {
            ctx.status = 201;
            ctx.body = {
                status: 'success',
                data: task
            };
        } else {
            logger.error('Task create() failed in else block')
            ctx.status = 400;
            ctx.body = {
                status: 'error',
                message: 'Something went wrong.'
            };
        }
    } catch (err) {
        logger.error('Task create() failed in catch block')
        logger.error(err)
    }

}

exports.update = async (ctx) => {
    try {
        logger.info('Task update() initiated')
        const task = await queries.updateData(ctx.params.id, ctx.request.body);
        if (task.length != 0) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
                data: task
            };
        } else {
            logger.error('Task update() failed in else block')
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That task does not exist.'
            };
        }
    } catch (err) {
        logger.error('Task update() failed in catch block')
        logger.error(err)
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
}
exports.delete = async ctx => {
    try {
        logger.error('Task delete() initiated')
        console.log(ctx.params.id)
        const task = await queries.deleteData(ctx.params.id);
        if (task.length != 0) {
            ctx.status = 200;
            ctx.body = {
                status: 'success',
            };
        } else {
            logger.error('Task delete() failed in else block')
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That task does not exist.'
            };
        }
    } catch (err) {
        logger.error('Task delete() failed in catch block')
        logger.error(err)
        ctx.status = 400;
        ctx.body = {
            status: 'error',
            message: err.message || 'Sorry, an error has occurred.'
        };
    }
}

exports.getById = async ctx => {
    try {
        logger.info('Task getById() initiated')
        let id = parseInt(ctx.params.id)
        const task = await queries.getOne(ctx.params.id);
        ctx.body = {
            status: 'success',
            data: task
        };
    } catch (err) {
        logger.error('Task getById() failed in catch block')
        logger.error(err)
    }
}

exports.getAllOverDue = async (ctx) => {
    try {
        logger.info('Task getAllOverDue() initiated')
        const task = await queries.getAllOverDue();
        if (task.length != 0) {
            ctx.body = {
                status: 'success',
                message: 'All OverDue Tasks',
                data: task
            };
        } else {
            logger.error('Task getAllOverDue() failed in else block')
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That task does not exist.'
            };
        }
    } catch (err) {
        logger.error('Task getAllOverDue() failed in catch block')
        logger.error(err)
    }
}

exports.getOneOverDue = async (ctx) => {
    try {
        logger.info('Task getOneOverDue() initiated')
        const task = await queries.getOneOverDue(ctx.params.id);
        if (task.length != 0) {
            ctx.body = {
                status: 'success',
                message: 'OverDue tasks of a particular user',
                data: task
            };
        } else {
            logger.error('Task getOneOverDue() failed in else block')
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That task does not exist.'
            };
        }
    } catch (err) {
        logger.error('Task getAllOverDue() failed in catch block')
        logger.error(err)
    }
}

exports.updateCompletedTask = async (ctx) => {
    try {
        logger.info('Task updateCompletedTask() initiated')
        const task = await queries.updateCompletedTask(ctx.params.id);
        if (task.length != 0) {
            ctx.body = {
                status: 'success',
                message: 'Completed task of a particular User',
                data: task
            };
        } else {
            logger.error('Task updateCompletedTask() failed in else block')
            ctx.status = 404;
            ctx.body = {
                status: 'error',
                message: 'That task does not exist.'
            };
        }
    } catch (err) {
        logger.error('Task updateCompletedTask() failed in catch block')
        logger.error(err)
    }
}

exports.get_user_task = async ctx => {
    try {
        logger.info('Task get_user_task() initiated')
        const user_task = await queries.get_user_task(ctx.params.id)
        console.log(user_task)
        ctx.body = {
            data: user_task
        }
        console.log(ctx.body)


    } catch (err) {
        logger.error('Task get_user_task() failed in catch block')
        logger.error(err)
    }
}

