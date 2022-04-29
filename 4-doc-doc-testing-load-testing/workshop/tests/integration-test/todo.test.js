//Unit Test for toDoModel.js for Todo Model
const { it } = require('@jest/globals');

const ToDo = require('../../models/todo').ToDo;
const mongoose = require('mongoose');



beforeAll(async () => {    
    //If you use npm run test in local (without docker) you need to connect to mongoose manually
    //await mongoose.connect('mongodb://localhost:27017/docker-node-mongo-unit-test', { useNewUrlParser: true, useUnifiedTopology: true });

    //If you use npm run test in docker
    await mongoose.connect('mongodb://mongo:27017/docker-node-mongo-unit-test', { useNewUrlParser: true, useUnifiedTopology: true });
    await ToDo.deleteMany();
});
afterAll(done => {
    // Closing the DB connection allows Jest to exit successfully.
    mongoose.connection.close()
    done()
})

describe('ToDo Model', () => {
    describe('Test Model', () => {
        it('should create', () => {
            const todo = new ToDo({
                text: 'Test todo'
            });
            expect(todo.text).toBe('Test todo');
            expect(todo.done).toBe(false);
        });
        it('should save', async () => {

            let timeStamp = new Date().getTime();

            const todo = new ToDo({
                text: 'Test todo' + timeStamp
            });
            await todo.save();

            const todoFind = await ToDo.findOne({ text: 'Test todo' + timeStamp });
            expect(todoFind.text).toBe('Test todo' + timeStamp);
            expect(todoFind.done).toBe(false);
        });
        it('should update', async () => {

            let timeStamp = new Date().getTime();

            const todo = new ToDo({
                text: 'Test todo' + timeStamp
            });
            await todo.save();

            const todoFind = await ToDo.findOne({ text: 'Test todo' + timeStamp });
            todoFind.done = true;
            await todoFind.save();

            const todoFind2 = await ToDo.findOne({ text: 'Test todo' + timeStamp });
            expect(todoFind2.done).toBe(true);
        });
        it('should delete', async () => {
            let timeStamp = new Date().getTime();

            const todo = new ToDo({
                text: 'Test todo' + timeStamp
            });
            await todo.save();

            const todoFind = await ToDo.findOne({ text: 'Test todo' + timeStamp });
            await todoFind.remove();

            const todoFind2 = await ToDo.findOne({ text: 'Test todo' + timeStamp });
            expect(todoFind2).toBe(null);
        });
    });
});