module.exports =  (req, res, next) => {
    return (req, res, next) => {

        if (req.session.userId) {
               res.locals.session_inlogin = req.session.inlogin;
            if (req.session.inlogin =='login') {
                res.locals.session_userId = req.session.userId;
                res.locals.session_usr_keresztnev = req.session.usr_keresztnev;
                res.locals.session_usr_vezeteknev = req.session.usr_vezeteknev;
                res.locals.session_inlogin = req.session.inlogin;
            }
            console.log(req.locals);
        }
        if (req.session.ErrorMsg) {
            res.locals.session_ErrorMsg =req.session.ErrorMsg;
        }
        console.log(req.locals);
        next();

    }
};
