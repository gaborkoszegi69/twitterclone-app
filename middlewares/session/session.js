const session = require( 'express-session');

module.exports =   (app) => {
    const isProd = app.get('env') === 'production';
    const isTest = app.get('env') === 'test';

    const sessionOptions = {
        secret: 'oEu0YoTdm9e-p_nQMpsqQZB53Z2ksehP',
        name: 'Session',
        cookie: {
            path: '/',
            httpOnly: true, // Make cookie inaccessible to JavaScript
        },
        resave: false,
        saveUninitialized: false,
    };

    if (isProd) {
        console.log('Running in prodn mode');
        app.set('trust proxy', 1); // trust first proxy (ngrok/nginx)

        // Enable Secure cookies when running in production
        // In production, the app is behind a reverse proxy that handles SSL
        // So, the app is served over HTTPS and the cookie can be marked as Secure
        sessionOptions.cookie.secure = true;
    }
    if (isTest) {
        console.log('Running in Test mode');
        app.set('trust proxy', 1); // trust first proxy (ngrok/nginx)

        // Enable Secure cookies when running in production
        // In production, the app is behind a reverse proxy that handles SSL
        // So, the app is served over HTTPS and the cookie can be marked as Secure
        sessionOptions.cookie.secure = False;
    }

    const sessionMiddleware = session(sessionOptions);

    return (req, res, next) => {
        if (sessionOptions.cookie.secure && req.header('x-forwarded-proto') !== 'https') {
            return next(Error('Secure Cookies enabled. Use HTTPS!'));
        }
        sessionMiddleware(req, res, next)
    }
};
