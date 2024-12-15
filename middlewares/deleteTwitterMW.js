
module.exports = (req, res, next)=> {
    return (req, res, next) => {
        let deleteTwitter = false;
        deleteTwitter = twitterModel.findOne({twtr_id: req.params.id});

        console.log(deleteTwitter);
        twitterModel.remove(deleteTwitter);
        dbtwitter.saveDatabase(err => {
            //err?
            return next();
        });
    }
}