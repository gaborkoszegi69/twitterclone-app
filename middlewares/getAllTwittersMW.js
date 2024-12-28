module.exports = (req, res, next) => {
    return  (req, res, next) => {
        console.log(req.params.twtr_usr_id);

        res.locals.twitters =  twitterModel.find();
        let user =  false;
        res.locals.twitters.forEach( item => {
            user =  userModel.findOne({usr_id: item.twtr_usr_id });
            item.twtr_usr_name = user.usr_vezeteknev+' '+user.usr_keresztnev;
        });
        console.log(res.locals.twitters);
        return next();
    }
}