module.exports = (req, res, next) => {
    //console.log(twitterModel);
    /*const {dbtwitter,
        twitterModel,
        uuid} = objRepTwitter;*/
    return  (req, res, next) => {
        console.log(req.params.twtr_usr_id);

        res.locals.twitters =  twitterModel.find({twtr_usr_id: req.params.twtr_usr_id });
        console.log(res.locals.twitters);
        return next();
    }
}