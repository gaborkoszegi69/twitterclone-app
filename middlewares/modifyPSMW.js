const Cryptr = require("cryptr");
module.exports = (req, res, next) => {
    return (req, res, next) => {
        console.log(req.params);
        if (typeof req.body.usr_password == 'undefined' || typeof req.body.usr_veryfypassword == 'undefined' ) {
            req.session.ErrorMsg ='A két jelszó nem egyezik meg';
            console.log(req.session.ErrorMsg);
            req.session.save((err) => {
                if (err) return next(err);
            });
            res.redirect('/');
        }
        if (req.body.usr_password != req.body.usr_veryfypassword ) {
            req.session.ErrorMsg ='A két jelszó nem egyezik meg';
            console.log(req.session.ErrorMsg);
            req.session.save((err) => {
                if (err) return next(err);
            });
            res.redirect('/');
        }        var datetime = new Date();

        const cryptr = new Cryptr(process.env.HASSECRET);

        let updateUser = false;
            console.log(req.body);
            console.log(req.session);
            updateUser = userModel.findOne({usr_token: req.params.tokenid });

            var datetime = new Date();
            updateUser.usr_password=cryptr.encrypt(req.body.usr_password),
            updateUser.usr_forignpassword= false;
            updateUser.usr_forigndate= "";
            updateUser.usr_updatedate =datetime;
            userModel.update(updateUser);
            return db.saveDatabase((err) => {
                return next();
            });
        req.session.inlogin = 'login';


        // Session mentése
        req.session.counter++;
        req.session.userId = updateUser.usr_id;
        req.session.usr_keresztnev = updateUser.usr_keresztnev;
        req.session.usr_vezeteknev = updateUser.usr_vezeteknev;

        req.session.save((err) => {
            //if (err) return next(err);
            return next();

        });

        return next();
    }
}