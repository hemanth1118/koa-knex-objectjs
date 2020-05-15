const Router = require('koa-router')
const router = new Router();
const tasks_controller = require('../controllers/user_tasks')
const address_controller = require('../controllers/user_address')
const user_controller = require('../controllers/user')
const user_login = require('../controllers/user_login')
const isTokenValid = require('../middlewares/jwt')
// const jwt = require('jsonwebtoken')


router.get('/task', isTokenValid, tasks_controller.get)

router.get('/overdue_task', isTokenValid, tasks_controller.getAllOverDue)

router.get('/overdue_task/:id', isTokenValid, tasks_controller.getOneOverDue)

router.put('/update_status/:id', isTokenValid, tasks_controller.updateStatus)

router.put('/update_completed_task/:id', isTokenValid, tasks_controller.updateCompletedTask)

router.get('/task/:id', isTokenValid, tasks_controller.getById)

router.post('/task', isTokenValid, tasks_controller.create)

router.put('/task/:id', isTokenValid, tasks_controller.update)

router.delete('/task/:id', isTokenValid, tasks_controller.delete)

router.get('/user_task/:id', isTokenValid, tasks_controller.get_user_task)

// Biscuits API routes >>>>

router.get('/user_address', isTokenValid, address_controller.get)

router.get('/user_address/:id', isTokenValid, address_controller.getById)

router.post('/user_address', isTokenValid, address_controller.create)

router.put('/user_address/:id', isTokenValid, address_controller.update)

router.delete('/user_address/:id', isTokenValid, address_controller.delete)

// Users API routes >>>>

router.get('/user', isTokenValid, user_controller.get)

router.get('/user/:id', isTokenValid, user_controller.getById)

router.post('/user', isTokenValid, user_controller.create)

router.put('/user/:id', isTokenValid, user_controller.update)

router.delete('/user/:id', isTokenValid, user_controller.delete)


// router.delete('/delete_multi/:id', user_controller.deleteTodoById)s

router.post('/signup', user_login.create)
router.get('/login', user_login.login)




module.exports = router;