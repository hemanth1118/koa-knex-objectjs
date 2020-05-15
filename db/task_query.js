const knex = require('./connect');
const Task = require('../models/user_tasks')
const currentDate = new Date(new Date().toDateString())

module.exports = {


    getAll() {
        return Task.query()
    },
    getOne(id) {
        return Task.query()
            .findById(id)
    },
    // gets All OverDue Tasks

    getAllOverDue() {
        return Task.query()
            .where({ status: 'OverDue' })
    },

    // gets one OverDue Task based on user ID

    getOneOverDue(id) {
        return Task.query()
            .where({ user_id: id, status: 'OverDue' })
    },


    create(user) {
        return Task.query()
            .insert(user)
            .returning('*')
    },


    // Task updation initiated

    updateStatus(id) {
        return Task.query()
            .update({ status: 'Not Started' })
            .where('id', id)
            .where('estimation', '>', currentDate)
    },
    updateOverDue(id) {
        return Task.query()
            .update({ status: 'OverDue' })
            .where('id', id)
            .where('estimation', '<', currentDate)
    },
    updateInProgress(id) {
        return Task.query()
            .update({ status: 'In Progress' })
            .where('id', id)
            .where('estimation', '=', currentDate)
    },
    find(id) {
        return Task.query()
            .findById(id)
    },

    // Task Updation completed


    updateData(id, user) {
        return Task.query()
            .update(user)
            .where('id', id)
            .returning('*');
    },

    // update task as completed

    updateCompletedTask(id) {
        return Task.query()
            .update({ status: 'Completed' })
            .where('id', id)
            .returning('*')
    },

    deleteData(id) {
        return Task.query()
            .findById(id)
            .delete()
            .returning('*');
    },

    get_user_task(id) {
        console.log(id)
        return knex.from('user_tasks')
            .innerJoin('users', 'user_tasks.user_id', 'users.id')
            .where('user_tasks.user_id', id)
    }
};

