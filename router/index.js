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
const updateTwitterMW = require('../middlewares/updateTwitterMW');
const deleteTwitterMW = require('../middlewares/deleteTwitterMW');
const  authMW = require( '../middlewares/session/authMW');

const modifyPSMW = require('../middlewares/modifyPSMW');
const getUsersMW = require('../middlewares/getUsersMW');
const getProfileMW = require('../middlewares/getProfileMW');
const updateProfileMW = require('../middlewares/updateProfileMW');
const getTwittersMW = require('../middlewares/getTwittersMW');
const getAllTwittersMW = require('../middlewares/getAllTwittersMW');
const getTwitterMW = require('../middlewares/getTwitterMW');

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
        authMW(),
        getUsersMW(objRepUser),
       renderMW(objRepUser, 'usersList'),
        (req, res, next) => res.redirect("/"));

    app.get('/logout',
        logoutMW,
        authMW(),
        (req, res, next) => res.redirect("/"));

  /*  app.get('/password/:id/:secret',
        getTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.post('/password/:id/:secret',
      //  createTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));*/
    app.get('/reg',
        authMW(),
        renderMW(objRepUser, 'newUser'));
    app.post('/reg',
        createUserMW(),
        (req, res, next) => res.redirect("/"));;
    app.get('/login',
        renderMW(objRepUser, 'login'));
    app.post('/login',
        loginMW(),
        (req, res, next) => res.json(res.body));
    app.get('/twitters/:twtr_usr_id',
        authMW(),
        getTwittersMW(),
        renderMW(objRepTwitter, 'twitterList'));
        //(req, res, next) => res.json(res.locals.todo));
    app.get('/alltwitters',
        authMW(),
        getAllTwittersMW(),
        renderMW(objRepTwitter, 'twitterList'));
        //(req, res, next) => res.json(res.locals.todo));

    app.get('/newtwitter',
        renderMW(objRepTwitter, 'newTwitter'));
    app.post('/newtwitter',
        createTwitterMW(),
        (req, res, next) => res.json(res.locals.twitter));
    app.get('/msg/edit/:id',
        authMW(),
        getTwitterMW(),
        renderMW(objRepTwitter, 'editTwitter'));;
    app.post('/msg/edit/:id',
        authMW(),
        updateTwitterMW(),
        (req, res, next) => res.redirect("/"));
    app.get('/msg/delete/:id',
         authMW(),
         getTwitterMW(),
         renderMW(objRepTwitter, 'deleteTwitter'));
    app.post('/msg/delete/:id',
            authMW(),
            deleteTwitterMW(),
            (req, res, next) => res.redirect("/"));
    app.get('/profil',
        getProfileMW(),
        renderMW(objRepTwitter, 'updateProfile'));
    app.post('/profil',
        updateProfileMW(),
        (req, res, next) => res.redirect("/"));


    //(req, res, next) => res.json(res.locals.todo));

/*/:id
    app.get('/forgetpassword/:tokenid',
        getTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));
    app.post('/forgetpassword',
        //createTodoMW(objRep),
        (req, res, next) => res.json(res.locals.todo));

*/
}

module.exports = addRoutes;