const readimage = require('readimage')
const sendfile = require('koa-sendfile')
var fs = require('fs');
const path = require('path')
const userPhoto = require('../models/user_photo')
const logger = require('../logger');
const { error } = require('console');
var fs = require('fs');
const multer = require('@koa/multer');
const koaSendfile = require('koa-sendfile');


const URL = 'http://localhost:3000'

// upload file storage path, and file name
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // const dir = '../uploads/photos';
        // mkdir(dir, err => cb(err, dir))
        cb(null, path.join(__dirname, '../uploads/photos'))
    },
    filename: function (req, file, cb) {
        let type = file.originalname.split('.')[1]
        cb(null, `${file.fieldname}-${Date.now().toString(16)}.${type}`)
    }
})
// file upload restrictions
const limits = {
    Fields: 10,// number of non-file fields
    FileSize: 500 * 1024,// fileSize in b
    Files: 1// files
}
const upload = multer({ storage, limits })

exports.post = async (ctx, next) => {
    console.log(ctx.file)
    let err = await upload.single('file')(ctx, next)
        .then(res => {
            res
            console.log(res)
        })
        .catch(err => err)
    if (err) {
        ctx.body = {
            code: 0,
            msg: err.message
        }
    } else {
        // if (ctx.request.file) {
        //     ctx.body = ({ imageUrl: `${URL}/uploads/photos/${ctx.file.filename}` });
        //     console.log(ctx.file.fieldname)
        // }
        let id = ctx.request.body.id
        console.log(ctx.file)
        let imageData = fs.readFileSync(ctx.file.path)
        console.log(ctx.file.path)
        const user_photo = await userPhoto.query()
            .insert({ file_name: ctx.file.filename, user_id: id, file_path: ctx.file.path })
            .then(async (response) => {
                console.log(response)
                return await userPhoto.query()
                    .where({ user_id: id })
            })

        ctx.body = {
            code: 1,
            data: user_photo
        }
    }
}


exports.getById = async (ctx) => {
    try {
        logger.info('user_phot getById() initiated')
        let id = ctx.params.id
        let data = await userPhoto.query().where({ user_id: id })
        if (data == '') {
            ctx.body = { message: "no image" }
        }
        console.log(data)
        let imageName = data[0].file_name
        // console.log(imageName)
        if (data == '') {
            logger.error(' User_phot getById() execution failed in else block')
            ctx.status = 404;
            ctx.body = {
                error,
                status: 'error',
                message: 'That user does not exist.'
            };
        } else {

            ctx.body = ({ imageUrl: `${URL}/photos/${imageName}` });
        }

    } catch (error) {
        logger.error(' User get() execution failed in catch block')
        console.log(error)
    }

}

exports.get = async (ctx) => {
    try {
        logger.info('user_phot get() initiated')
        let data = await userPhoto.query()
        var imageUrlArray = []
        for (let i = 0; i < data.length; i++) {
            let imageName = data[i].file_name
            let imageDir = ({ imageUrl: `${URL}/photos/${imageName}` })
            imageUrlArray.push(imageDir)
            console.log(imageUrlArray)
        }
        ctx.body = { imageUrlArray };

    } catch (error) {
        logger.error(' User get() execution failed in catch block')
        console.log(error)
    }

}

const DIR = 'uploads/photos';
exports.delete = async (ctx) => {
    console.log("enterd")
    if (!ctx.params.imagename) {
        console.log("No file received");
        ctx.body = {
            status: 500,
            message: "Error! in image delete."
        }

    } else {
        console.log('file received');
        console.log(ctx.params.imagename);
        try {
            fs.unlinkSync(DIR + '/' + ctx.params.imagename);
            const imagename = ctx.params.imagename
            const data = await userPhoto.query()
                .where({ file_name: imagename })
                .delete()
                .returning('*')
            // console.log(data)
            console.log('successfully deleted /tmp/hello');
            ctx.body = {
                status: 200,
                message: 'Successfully! Image has been Deleted'
            }
        } catch (err) {
            // handle the error
            ctx.body = {
                status: 400,
                err
            }
        }

    }

}

let oldImage;

exports.update = async (ctx, next) => {
    try {

        console.log('entered update method')
        // let newImageName = ctx.body;
        let id = ctx.params.id
        let data = await userPhoto.query().where({ user_id: id }).then(async (res) => {
            console.log(res)
            let oldImageName = res[0].file_name
            this.oldImage = oldImageName
            fs.unlinkSync(DIR + '/' + oldImageName);
            // console.log(ctx.file.path)
            let err = await upload.single('file')(ctx, next)
                .then(res => {
                    res
                    // console.log(res)
                })
                .catch(err => err)
            if (err) {
                ctx.body = {
                    code: 0,
                    msg: err.message
                }
            } else {
                console.log(ctx.file)
                // console.log(ctx.file)
                let photo = {
                    file_name: ctx.file.filename,
                    file_path: ctx.file_path
                }
                const user_photo = await userPhoto.query()
                    .where({ user_id: id })
                    .update(photo)
                    .then(async (response) => {
                        console.log(response)
                        return await userPhoto.query()
                            .where({ user_id: id })
                    })

                let imageName = ctx.file.filename
                console.log(imageName)
                ctx.body = {
                    status: 201,
                    message: 'image successfully updated',
                    imageUrl: (`${URL}/photos/${imageName}`)
                }
            }
            // 

        })
    } catch (err) {
        ctx.body = {
            status: 400,
            err
        }
    }
}
