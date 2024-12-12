module.exports = (objRep) => {
    const {db,
        dbtwitter,
        userModel,
        twitterModel,
        uuid} = objRep;
    return (req, res, next) => {
        if (typeof req.body.twtr_message == 'undefined' ) {
            // error case
            return res.status(400).json({error: 'Missing twitter'});
        }

        const newTwitter = {
            twtr_id: uuid.v4(),
            twtr_usr_id: req.session.userId,
            twtr_message: req.body.twtr_message,
            twtr_deleted:  false,
            twtr_visible: true,
            usr_createdate: "",
            usr_updatedate: ""
        };
        twitterModel.insert(newTwitter);
        return  dbtwitter.saveDatabase((err) => {
            //err?
            res.locals.twitter = newTwitter;
            return next();
        })
    }
}