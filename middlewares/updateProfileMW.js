module.exports = (req, res, next)=> {
    return (req, res, next) => {
        let updateUser = false;
        if (req.session.userId) {
            console.log(req.body);
            console.log(req.session);
            updateUser = userModel.findOne({usr_id: req.session.userId});
            console.log(req.session.userId);
            console.log(updateUser);
            updateUser.usr_emailadress = req.body.usr_emailadress,
                updateUser.usr_vezeteknev = req.body.usr_vezeteknev,
                updateUser.usr_keresztnev = req.body.usr_keresztnev,
                console.log(updateUser);
            userModel.update(updateUser);
            return db.saveDatabase((err) => {
                return next();
            });
            req.session.usr_keresztnev = req.body.usr_keresztnev;
            req.session.usr_vezeteknev = req.body.usr_vezeteknev;
            req.session.save((err) => {

            });

        }
        return next();
    }
}