module.exports = (req, res, next) => {
    return  (req, res, next) => {
        console.log(req.params.twtr_usr_id);

        res.locals.twitters =  twitterModel.find();
        console.log(res.locals.twitters);
        return next();
    }
}