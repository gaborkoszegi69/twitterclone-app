module.exports = (req, res, next) => {
    return async  (req, res, next) => {
        console.log(req.params.id);
        res.locals.twitter =  twitterModel.findOne({twtr_id: req.params.id });
        console.log(res.locals.twitter);
        return next();
    }
}