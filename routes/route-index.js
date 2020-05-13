const Router = require('koa-router')
const router = new Router();
const tasks_controller = require('../controllers/user_tasks')
const address_controller = require('../controllers/user_address')
const user_controller = require('../controllers/user')
const user_query = require('../db/user_query')
const address = require('../models/user_address')


router.get('/task', tasks_controller.get)

router.get('/overdue_task', tasks_controller.getAllOverDue)

router.get('/overdue_task/:id', tasks_controller.getOneOverDue)

router.get('/task/:id', tasks_controller.getById)

router.post('/task', tasks_controller.create)

router.put('/task/:id', tasks_controller.update)

router.delete('/task/:id', tasks_controller.delete)

router.get('/user_task/:id', tasks_controller.get_user_task)

// Biscuits API routes >>>>

router.get('/user_address', address_controller.get)

router.get('/user_address/:id', address_controller.getById)

router.post('/user_address', address_controller.create)

router.put('/user_address/:id', address_controller.update)

router.delete('/user_address/:id', address_controller.delete)

// Users API routes >>>>

router.get('/user', user_controller.get)

router.get('/user/:id', user_controller.getById)

router.post('/user', user_controller.create)

router.put('/user/:id', user_controller.update)

router.delete('/user/:id', user_controller.delete)

router.post('/multi', user_controller.createMulti)

// router.delete('/delete_multi/:id', user_controller.deleteTodoById)s



module.exports = router;