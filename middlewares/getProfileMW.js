module.exports = (req, res, next) => {
    return async  (req, res, next) => {
        console.log(req.params.id);
        res.locals.user =  userModel.findOne({usr_id: req.session.userId });
        console.log(res.locals.user);
        return next();
    }
}
