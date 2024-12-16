module.exports =  (req, res, next) => {
    if (!req.session.counter) {
        req.session.counter = 0;
        req.session.ErrorMsg = '';
        req.session.inlogin = 'logout';
    }
    next();
};
