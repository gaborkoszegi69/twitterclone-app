module.exports =  (req, res, next) => {
    if (!req.session.counter) {
        req.session.counter = 0;
    }
    next();
};
