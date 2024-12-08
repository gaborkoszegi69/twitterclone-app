module.exports = (objRep) => {
    const {twitterModel, db, uuid} = objRep;
    return (req, res, next) => {
        if (typeof req.body.twitter == 'undefined' ) {
            // error case
            return res.status(400).json({error: 'Missing twitter'});
        }

        const newTwitter = {
            twtr_id: uuid.v4(),
            twtr_usr_id: req.body.twitter.twtr_usr_id,
            twtr_message: req.body.twitter.twtr_message,
            twtr_deleted:  false,
            twtr_visible: true,
            usr_createdate: "",
            usr_updatedate: ""
        };
        twitterModel.insert(newTwitter);
        return db.saveDatabase((err) => {
            //err?
            res.locals.twitter = newTwitter;
            return next();
        })
    }
}