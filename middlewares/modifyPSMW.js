module.exports = (req, res, next) => {
    return (req, res, next) => {
        console.log(req.params);
        res.locals.user =  userModel.findOne({usr_token: req.params.tokenid });
        res.locals.user =  userModel.find();
        console.log(res.locals.user);
        return next();
    }
}