module.exports = (req, res, next)=> {
    return (req, res, next) => {
        let updateTwitter = false;
        updateTwitter = twitterModel.findOne({twtr_id: req.params.id});
        if (typeof req.body.twtr_message !== 'undefined') {
            updateTwitter.twtr_message = req.body.twtr_message;
        }

        console.log(updateTwitter);
        twitterModel.update(updateTwitter);
        dbtwitter.saveDatabase(err => {
            //err?
            return next();
        });
    }
}