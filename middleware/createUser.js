module.exports = (objRep) => {
    const {userModel, db, uuid} = objRep;
    return (req, res, next) => {
        if (typeof req.body.todo == 'undefined' ) {
            // error case
            return res.status(400).json({error: 'Missing todo'});
        }

        const newUser = {
            usr_id: uuid.v4(),
            usr_username: req.body.usr_username,
            usr_vezeteknev: req.body.usr_vezeteknev,
            usr_keresztnev: req.body.usr_keresztnev,
            usr_emailadress: req.body.usr_emailadress,
            usr_token: "",
            usr_forignpassword: false,
            usr_forigndate: req.body.usr_username,
            usr_changepassword: req.body.usr_username,
            usr_deleted: req.body.usr_username,
            usr_visible: req.body.usr_username,
            usr_createdate: req.body.usr_username,
            usr_updatedate: req.body.usr_username
        };
        userModel.insert(newUser);
        return db.saveDatabase((err) => {
            //err?
            res.locals.todo = newTodo;
            return next();
        })
    }
}