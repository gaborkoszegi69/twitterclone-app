module.exports = (req, res, next) => {
    return (req, res, next) => {
        console.log(req.params);
        res.locals.user =  userModel.findOne({usr_token: req.params.tokenid });
        //res.locals.users =  userModel.find();
        console.log(res.locals.user);
        //console.log(res.locals.users);
        return next();
    }
}