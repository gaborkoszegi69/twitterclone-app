const uuid = require('uuid'),
 swaggerJSDoc = require('swagger-jsdoc'),
swaggerUi = require('swagger-ui-express');
const  session = require( '../middlewares/session/session.js');
const  logoutMW = require( '../middlewares/session/logoutMW');
const   renderMW  = require( '../middlewares/renderMW.js');
const  initSession = require( '../middlewares/session/initSession');
const createUserMW = require('../middlewares/createUserMW');
const  loginMW = require( '../middlewares/session/loginMW');
const createTwitterMW = require('../middlewares/createTwitterMW');

const modifyPSMW = require('../middlewares/modifyPSMW');
const getUsersMW = require('../middlewares/getUsersMW');
const getTwittersMW = require('../middlewares/getTwittersMW');
const geTodosMW = require('../middlewares/getTodos');
const getTodoMW = require('../middlewares/getTodo');

const deleteTodoMW = require('../middlewares/deleteTodo');
const updateTodoMW = require('../middlewares/updateTodo');
const searchMW = require('../middlewares/search');
    function addRoutes(app, db, dbtwitter, userModel,twitterModel) {
      const objRepUser = {
        db,
        userModel,
        uuid
    };
        const objRepTwitter = {
            dbtwitter,
            twitterModel,
            uuid
        };

    app.set('view engine', 'ejs');

    app.use(session(app));

    app.use(initSession);
    // API
    app.get('/',
        getUsersMW(objRepUser),
       renderMW(objRepUser, 'usersList'));
//        (req, res, next) => res.json(res.locals.users));

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
        renderMW(objRepUser, 'newUser'));
    app.post('/reg',
        createUserMW(),
        (req, res, next) => res.json(res.locals.user));
    app.get('/login',
        renderMW(objRepUser, 'login'));
    app.post('/login',
        loginMW(),
        (req, res, next) => res.json(res.body));
    app.get('/twitters/:twtr_usr_id',
        getTwittersMW(),
        renderMW(objRepTwitter, 'twitterList'));
        //(req, res, next) => res.json(res.locals.todo));
    app.get('/newtwitter',
        renderMW(objRepTwitter, 'newTwitter'));
    app.post('/newtwitter',
        createTwitterMW(objRepTwitter),
        (req, res, next) => res.json(res.locals.twitter));


    //(req, res, next) => res.json(res.locals.todo));

/*/:id
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