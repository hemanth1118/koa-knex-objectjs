process.env.NODE_ENV || "test"
const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);
const knex = require('../db/connect')
const queries = require('../db/user_query');
const user_controller = require('../controllers/user')

describe('Users API test-cases', () => {

    // GET ALL USERS

    it('gets all the users ', async done => {
        queries.create({ name: 'hemanth', email: 'hemanth@gmail.com' })
            .then(data => console.log(data));
        const response = await request.get('/user')
            .then(async (cxt) => {
                console.log(cxt.body)
                expect(cxt.body.data[0].name).toBe('hemanth')
                expect(cxt.body).toEqual(expect.any(Object))
                expect(typeof cxt.body).toBe("object");
                expect(200)
                done();
            })
    })

    // POST USER

    it('post users ', async done => {
        const response = await request.post('/user')
            .send({
                name: 'hindi',
                email: 'hindi@gmail.com'
            }).then(async (cxt) => {
                // expect.assertions(7);
                expect(cxt.body.data[0].name).toBe('hindi');
                expect(cxt.body).toEqual(expect.any(Object));
                expect(cxt.body.data[0].name).toBeDefined();
                expect(cxt.body.data[0].email).toBeDefined();
                expect(typeof cxt.body).toBe("object")
                expect(201)
                done()
            })

    })

    // ERROR HANDLING FOR POST API

    it('should throw an error if the post parameters not sent properly ', async done => {
        const response = await request.post('/user')
            .send({
                name: 'hindi',
            })
            .then(async (cxt) => {
                expect(cxt.body.status).toBe('error')
                expect(cxt.status).toBe(400)
                done();
            })
    })

    // GET ONE USER BY ID

    it('gets one  user ', async done => {
        queries.create({ name: 'harshith', email: 'harshith@gmail.com' })
            .then(data => console.log(data));
        const response = await request.get('/user/4')
            .then((cxt) => {
                console.log(cxt.body);
                expect(cxt.body.data.name).toBe('harshith')
                expect(cxt.body.status).toBe('success')
                expect(cxt.body).toEqual(expect.any(Object));
                expect(typeof cxt.body).toBe("object");
                expect(200)
                done();
            })
    })

    // ERROR HANDLING FOR GET BY USER API

    it('should throw an error if the user does not exist ', async done => {
        const response = await request.get('/user/99')
            .then(async (cxt) => {
                expect(cxt.body.status).toBe('error')
                expect(cxt.status).toBe(400)
                done();
            })
    })

    // UPDATE USER

    it('update user', async done => {
        queries.create({ name: 'bob', email: 'bob@gmail.com' })
            .then(data => console.log(data));
        const response = await request.put('/user/5')
            .send({
                name: 'john'
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/).then((cxt) => {
                expect(cxt.body.data[0].name).toBe('john')
                expect(cxt.body.data[0]).toHaveProperty('name');
                console.log(cxt.body);
                expect(200);
                done();
            })
    })

    // ERROR HANDLING FOR UPDATE API

    it('should throw an error if the update parameters not sent properly ', async done => {
        const response = await request.put('/user/99')
            .send({
                name: 'hindi',
            })
            .then(async (cxt) => {
                expect(cxt.body.status).toBe('error')
                expect(cxt.status).toBe(404)
                done();
            })
    })

    // DELETE USER

    it('delete user', async done => {
        queries.create({ name: 'max', email: 'max@gmail.com' })
            .then(data => console.log(data));
        const response = await request.delete('/user/6')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/).then((cxt) => {
                expect(cxt.body).toEqual(expect.any(Object));
                expect(cxt.body).not.toEqual(
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: 'hindi',
                        updatedAt: expect.any(String),
                        createdAt: expect.any(String),
                    }))
                expect(cxt.body.data).not.toBeDefined();
                expect(cxt.body.status).toBe('success');
                done();
            })

    })

    // ERROR HANDLING FOR DELETE API

    it('should throw an error if the deletE parameters not sent properly ', async done => {
        const response = await request.delete('/user/99')
            .then(async (cxt) => {
                expect(cxt.body.status).toBe('error')
                expect(cxt.status).toBe(404)
                done();
            })
    })




    module.exports = request;
    app.close();
})
