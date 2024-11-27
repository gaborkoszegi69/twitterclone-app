const uuid = require('uuid');

const createTodoMW = require('../middleware/createUser');
const geTodosMW = require('../middleware/getTodos');
const getTodoMW = require('../middleware/getTodo');
const deleteTodoMW = require('../middleware/deleteTodo');
const updateTodoMW = require('../middleware/updateTodo');
const searchMW = require('../middleware/search');

function addRoutes(app, db, todoModel) {
    const objRep = {
        todoModel,
        db,
        uuid
    };
    // API
    app.get('/api/todo',
        geTodosMW(objRep),
        (req, res, next) => res.json(res.locals.todos));
    app.get('/api/todo/:id',
        getTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.post('/api/todo',
        createTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.delete('/api/todo/:id',
        getTodoMW(objRep),
        deleteTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.put('/api/todo/:id',
        getTodoMW(objRep),
        updateTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.post('/api/search',
        searchMW(objRep));


}

module.exports = addRoutes;