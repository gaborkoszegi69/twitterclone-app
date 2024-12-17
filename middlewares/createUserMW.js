const Cryptr = require('cryptr');
const uuid = require('uuid');
module.exports = (req, res, next) => {
    return (req, res, next) => {
        let ok = true;
        console.log(req.body);
        if (typeof req.body.usr_username == 'undefined' ) {
            ok = false;
            req.session.ErrorMsg ='Nincs felhasználó';
            console.log(req.session.ErrorMsg);
            req.session.save((err) => {
                if (err) return next(err);
            });

        }
        if (typeof req.body.usr_password == 'undefined' || typeof req.body.usr_veryfypassword == 'undefined' ) {
            ok = false;
            req.session.ErrorMsg ='A két jelszó nem egyezik meg';
            console.log(req.session.ErrorMsg);
            req.session.save((err) => {
                if (err) return next(err);
            });
        }
        if (req.body.usr_password != req.body.usr_veryfypassword ) {
            ok = false;
            req.session.ErrorMsg ='A két jelszó nem egyezik meg';
            console.log(req.session.ErrorMsg);
            console.log(req.body.usr_password);
            console.log(req.body.usr_veryfypassword);
            req.session.save((err) => {
                if (err) return next(err);
            });

        }
        if (ok) {
                var datetime = new Date();

                const cryptr = new Cryptr(process.env.HASSECRET);
                const newUser = {
                    usr_id: uuid.v4(),
                    usr_username: req.body.usr_username,
                    usr_vezeteknev: req.body.usr_vezeteknev,
                    usr_keresztnev: req.body.usr_keresztnev,
                    usr_emailadress: req.body.usr_emailadress,
                    usr_token: "",
                    usr_forignmessage: req.body.usr_forignmessage,
                    usr_password:  cryptr.encrypt(req.body.usr_password),
                    usr_forignpassword: false,
                    usr_forigndate: "",
                    usr_changepassword: "",
                    usr_deleted: false,
                    usr_visible: true,
                    usr_createdate: datetime,
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
}