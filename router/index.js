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
const  sendForgetMW = require( '../middlewares/sendForgetMW');
const getPSMMW = require('../middlewares/getPSMMW');
const modifyPSMW = require('../middlewares/modifyPSMW');
const getUsersMW = require('../middlewares/getUsersMW');
const getProfileMW = require('../middlewares/getProfileMW');
const updateProfileMW = require('../middlewares/updateProfileMW');
const getTwittersMW = require('../middlewares/getTwittersMW');
const getAllTwittersMW = require('../middlewares/getAllTwittersMW');
const getTwitterMW = require('../middlewares/getTwitterMW');
    function addRoutes(app, db, dbtwitter, userModel,twitterModel) {

    app.set('view engine', 'ejs');

    app.use(session(app));

    app.use(initSession);
    // API
    app.get('/',
        authMW(),
        getUsersMW(),
       renderMW( 'usersList'));

    app.get('/logout',
        logoutMW,
        authMW(),
        (req, res, next) => res.redirect("/"));

    app.get('/reg',
        authMW(),
        renderMW( 'newUser'));
    app.post('/reg',
        createUserMW(),
        (req, res, next) => res.redirect("/login"));;
    app.get('/login',
        renderMW('login'));
    app.post('/login',
        loginMW(),
        (req, res, next) => res.redirect("/"));
    app.get('/twitters/:twtr_usr_id',
        authMW(),
        getTwittersMW(),
        renderMW('twitterList'));
        //(req, res, next) => res.json(res.locals.todo));
    app.get('/alltwitters',
        authMW(),
        getAllTwittersMW(),
        renderMW( 'twitterAllList'));
        //(req, res, next) => res.json(res.locals.todo));

    app.get('/newtwitter',
        renderMW( 'newTwitter'));
    app.post('/newtwitter',
        createTwitterMW(),
        (req, res, next) => res.redirect("/"));
    app.get('/msg/edit/:id',
        authMW(),
        getTwitterMW(),
        renderMW( 'editTwitter'));;
    app.post('/msg/edit/:id',
        authMW(),
        updateTwitterMW(),
        (req, res, next) => res.redirect("/"));
    app.get('/msg/delete/:id',
         authMW(),
         getTwitterMW(),
         renderMW('deleteTwitter'));
    app.post('/msg/delete/:id',
            authMW(),
            deleteTwitterMW(),
            (req, res, next) => res.redirect("/"));
    app.get('/profil',
        getProfileMW(),
        renderMW( 'updateProfile'));
    app.post('/profil',
        updateProfileMW(),
        (req, res, next) => res.redirect("/"));
  app.get('/forgetpassword',
      renderMW( 'sendFrogetPasswird'));
  app.post('/forgetpassword',
          sendForgetMW(),
          (req, res, next) => res.redirect("/"));

  app.get('/forget/:tokenid',
      getPSMMW(),
       renderMW( 'changePassowrd'));
  app.post('/forget/:tokenid',
       modifyPSMW(),
      (req, res, next) => res.redirect("/login"));
}

module.exports = addRoutes;