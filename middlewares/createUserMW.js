module.exports = (objRep) => {
    const {userModel, db, uuid} = objRep;
    return (req, res, next) => {
        if (typeof req.body.user == 'undefined' ) {
            // error case
            return res.status(400).json({error: 'Missing User'});
        }

        const newUser = {
            usr_id: uuid.v4(),
            usr_username: req.body.user.usr_username,
            usr_vezeteknev: req.body.user.usr_vezeteknev,
            usr_keresztnev: req.body.user.usr_keresztnev,
            usr_emailadress: req.body.user.usr_emailadress,
            usr_token: "",
            usr_forignpassword: false,
            usr_forigndate: "",
            usr_changepassword: "",
            usr_deleted: false,
            usr_visible: true,
            usr_createdate: "",
            usr_updatedate: "",
        };
        userModel.insert(newUser);
        return db.saveDatabase((err) => {
            //err?
            res.locals.user = newUser;
            return next();
        })
    }
}