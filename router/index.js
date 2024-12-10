const uuid = require('uuid'),
 swaggerJSDoc = require('swagger-jsdoc'),
swaggerUi = require('swagger-ui-express');
const  session = require( '../middlewares/session/session.js');
const  logoutMW = require( '../middlewares/session/logoutMW');
const   renderMW  = require( '../middlewares/renderMW.js');
const  initSession = require( '../middlewares/session/initSession');
const createUserMW = require('../middlewares/createUserMW');
const  loginMW = require( '../middlewares/session/loginMW');

const modifyPSMW = require('../middlewares/modifyPSMW');
const createTwitterMW = require('../middlewares/createTwitterMW');
const getUsersMW = require('../middlewares/getUsersMW');
const geTodosMW = require('../middlewares/getTodos');
const getTodoMW = require('../middlewares/getTodo');

const deleteTodoMW = require('../middlewares/deleteTodo');
const updateTodoMW = require('../middlewares/updateTodo');
const searchMW = require('../middlewares/search');

function addRoutes(app, db, userModel,twitterModel) {
    const objRep = {
        userModel,
        twitterModel,
        db,
        uuid
    };
    app.set('view engine', 'ejs');

    app.use(session(app));

    app.use(initSession);
    // API
    app.get('/',
        getUsersMW(objRep),
        (req, res, next) => res.json(res.locals.users));

    app.get('/logout',
        logoutMW,
        (req, res, next)=> res.json(res.locals.todo));

  /*  app.get('/password/:id/:secret',
        getTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.post('/password/:id/:secret',
      //  createTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));*/
    app.get('/reg',
        renderMW(objRep, 'NewUser'));
    app.post('/reg',
        createUserMW(objRep),
        (req, res, next) => res.json(res.locals.user));
    app.get('/login',
        renderMW(objRep, 'login'));
    app.post('/login',
        loginMW(objRep),
        (req, res, next) => res.json(res.body));
/*
    app.get('/profil/:id',
        getTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.post('/profil/:id',
        //createTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.get('/forgetpassword/:tokenid',
        getTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.post('/forgetpassword',
        //createTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.get('/msg/edit/:id',
        getTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.post('/msg/edit/:id',
        //createTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.get('/msg/insert',
        getTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.post('/msg/insert',
        ///createTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.get('/msg/delete/:id',
        getTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));

*/
}

module.exports = addRoutes;