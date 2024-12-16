const Cryptr = require('cryptr');

module.exports = (req, res, next) => {
    return async  (req, res, next) => {
           // console.log(req.body);

        if (typeof req.body.usr_username == 'undefined') {
            req.session.ErrorMsg ='Felhasználónév szükséges!';
            console.log(req.session.ErrorMsg);
            req.session.save((err) => {
                if (err) return next(err);

            });
            return next();
        }

        if (!req.body.usr_username || !req.body.usr_password) {
            req.session.ErrorMsg ='Felhasználónév és jelszó szükséges!';
            console.log(req.session.ErrorMsg);
            req.session.save((err) => {
                if (err) return next(err);
            });
            return next();
        }
        const user = userModel.findOne({usr_username:req.body.usr_username });
        if (!user) {
            req.session.ErrorMsg ='Nincs felhasználó';
            console.log(req.session.ErrorMsg);
            req.session.save((err) => {
                if (err) return next(err);
            });
            res.redirect('/');
        } else {
                const cryptr = new Cryptr(process.env.HASSECRET);
                const isPasswordValid =  req.body.usr_password ==cryptr.decrypt(user.usr_password);
                if (!isPasswordValid) {
                    req.session.ErrorMsg = 'Hibás felhaesználónév vagy jelszó!';
                    req.session.save((err) => {
                        if (err) return next(err);

                    });
                    return next();
                } else {
                    req.session.inlogin = 'login';


                    // Session mentése
                    req.session.counter++;
                    req.session.userId = user.usr_id;
                    req.session.usr_keresztnev = user.usr_keresztnev;
                    req.session.usr_vezeteknev = user.usr_vezeteknev;

                    req.session.save((err) => {
                        //if (err) return next(err);
                        return next();
                        //console.log(req.session.userId);
                        //res.send({message: 'Sikeres bejelentkezés!'+req.body.usr_username});

                    });
                }
        }
        //console.log(req.session);

    }
}
