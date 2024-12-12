const Cryptr = require('cryptr');
const uuid = require('uuid');
module.exports = (req, res, next) => {
    return (req, res, next) => {
        if (typeof req.body.usr_username == 'undefined' ) {
            // error case
            //**return res.status(400).json({error: 'Missing User'});
            return res.status(400).json(req.body);
        }
        if (typeof req.body.usr_password == 'undefined' || typeof req.body.usr_veryfypassword == 'undefined' ) {
            return res.status(400).json(req.body);
            //return res.status(400).json({error: 'A két jelszó nem egyezik meg'});
        }
        if (req.body.usr_password != req.body.usr_veryfypassword ) {
            //return res.status(400).json(req.body);
            return res.status(400).json({error: 'A két jelszó nem egyezik meg'});
        }
        const cryptr = new Cryptr(process.env.HASSECRET);
        const newUser = {
            usr_id: uuid.v4(),
            usr_username: req.body.usr_username,
            /*usr_vezeteknev: req.body.user.usr_vezeteknev,
            usr_keresztnev: req.body.user.usr_keresztnev,*/
            usr_emailadress: req.body.usr_emailadress,
            usr_token: "",
            usr_password:  cryptr.encrypt(req.body.usr_password),
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