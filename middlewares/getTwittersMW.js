module.exports = (req, res, next) => {
    return  (req, res, next) => {
        console.log(req.params.twtr_usr_id);

        res.locals.twitters =  twitterModel.find({twtr_usr_id: req.params.twtr_usr_id });
        //console.log(res.locals.twitters);
        return next();
    }
}