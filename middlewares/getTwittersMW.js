module.exports = (req, res, next) => {
    return  (req, res, next) => {
        console.log(req.params.twtr_usr_id);

        res.locals.twitters =  twitterModel.find({twtr_usr_id: req.params.twtr_usr_id });
        res.locals.params_twtr_usr_id =   req.params.twtr_usr_id ;
        res.locals.user =  userModel.findOne({usr_id: req.params.twtr_usr_id });
        console.log(res.locals.user);

        console.log(res.locals);
        return next();
    }
}