const  session = require( '../middlewares/session/session.js');
const   renderIndex  = require( '../middlewares/renderIndex.js');
const   destroySession  = require( '../middlewares/session/destroySession.js');
const   increaseSession  = require( '../middlewares/session/increaseSession.js');
const   initSession  = require( '../middlewares/session/initSession.js');

function addRoutes(app) {
    app.set('view engine', 'ejs');

    app.use(session(app));

    app.use(initSession);


    app.get('/', renderIndex),
    app.post('/increasesession', increaseSession);
    app.post('/destroysession', destroySession);
// default error handler middleware
    app.use((err, req, res, next) => {
        if (res.headersSent) {
            return next(err)
        }
        console.error(err);
        res.status(500);
        res.render('error', { error: err });
        next();
    });

}

module.exports = addRoutes;