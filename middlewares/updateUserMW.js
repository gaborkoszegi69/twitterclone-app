module.exports = (req, res, next)=> {
    return (req, res, next) => {
        let updateUser = false;
        //updateUser = userModel.findOne({usr_id: req.params.id });
        updateUser.usr_vezeteknev= req.body.user.usr_vezeteknev,
        updateUser.usr_keresztnev= req.body.user.usr_keresztnev,
        updateUser.usr_emailadress= req.body.usr_emailadress,
        console.log(updateUser);
        userModel.update(updateUser);
        return db.saveDatabase((err) => {
            //err?
            res.locals.user = newUser;
            return next();
        });
    }
}