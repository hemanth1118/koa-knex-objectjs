const Router = require('koa-router')
const router = new Router();
const tasks_controller = require('../controllers/user_tasks')
const address_controller = require('../controllers/user_address')
const user_controller = require('../controllers/user')
const user_login = require('../controllers/user_login')
const user_photo = require('../controllers/user_photo')
const isTokenValid = require('../middlewares/jwt')
const userPhoto = require('../models/user_photo')
var fs = require('fs');
// const path = require('path')
// const multer = require('koa-multer')
// const upload = multer({ dest: 'uploads/' })

router.get('/task', isTokenValid, tasks_controller.get)

router.get('/overdue_tasks', isTokenValid, tasks_controller.getAllOverDue)

router.get('/overdue_task/:id', isTokenValid, tasks_controller.getOneOverDue)

router.put('/update_status/:id', isTokenValid, tasks_controller.updateStatus)

router.put('/update_completed_task/:id', isTokenValid, tasks_controller.updateCompletedTask)

router.get('/task/:id', isTokenValid, tasks_controller.getById)

router.post('/task', isTokenValid, tasks_controller.create)

router.post('/add_task', isTokenValid, tasks_controller.postUserID)

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
router.post('/login', user_login.login)
router.get('/listed_users', user_login.listed_users)
router.get('/edit/:id', user_login.getUserById)
router.put('/update/:id', user_login.updateUser)
router.delete('/delete_user/:id', user_login.deleteUser)


router.get('/upload/:id', user_photo.getById)
router.get('/email/:email', user_controller.getEmail)
router.post('/upload', user_photo.post)
router.get('/upload', user_photo.get)
router.delete('/delete/:imagename', user_photo.delete)
router.put('/update_image/:id', user_photo.update)



module.exports = router;