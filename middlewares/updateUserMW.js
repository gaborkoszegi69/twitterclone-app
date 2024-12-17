module.exports = (req, res, next)=> {
    return (req, res, next) => {
        let updateUser = false;
        var datetime = new Date();
        updateUser = userModel.findOne({usr_id: req.params.id });
        updateUser.usr_vezeteknev= req.body.user.usr_vezeteknev;
        updateUser.usr_keresztnev= req.body.user.usr_keresztnev;
        updateUser.usr_emailadress= req.body.usr_emailadress;
        updateUser.usr_updatedate =datetime;
        updateUser.usr_forignmessage= req.body.usr_forignmessage;
        //console.log(updateUser);
        userModel.update(updateUser);
        return db.saveDatabase((err) => {
            return next();
        });
    }
}