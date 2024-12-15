module.exports =  (req, res, next) => {
    return (req, res, next) => {
        if (req.session.userId) {
            res.locals.session_userId = req.session.userId;
            res.locals.session_usr_keresztnev = req.session.usr_keresztnev;
            res.locals.session_usr_vezeteknev = req.session.usr_vezeteknev;
        }
        next();

    }
};
