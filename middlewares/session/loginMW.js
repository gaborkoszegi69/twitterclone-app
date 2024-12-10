const Cryptr = require('cryptr');

module.exports =  (objRep) => {
    const {userModel, db, uuid} = objRep;
    return async  (req, res, next) => {
            console.log(req.body);

        if (typeof req.body.usr_username == 'undefined') {
            return res.status(400).json(req.body);
        }

        if (!req.body.usr_username || !req.body.usr_password) {
            return res.status(400).send('Felhasználónév és jelszó szükséges!');
        }
        const user = userModel.findOne({usr_username:req.body.usr_username });
        if (!user) {
            //return res.status(401).send('Hibás felhasználwwónév vagy jelszó!');
            return res.status(401).send('Nincs felhasználó');
        }
        const cryptr = new Cryptr(process.env.HASSECRET);
        const isPasswordValid =  req.body.usr_password ==cryptr.decrypt(user.usr_password);
        if (!isPasswordValid) {
            return res.status(401).send('Hibás felhaesználónév vagy jelszó!');
        }

        // Session mentése
        req.session.userId = user.usr_id;
        console.log(req.session.userId);
        res.send({message: 'Sikeres bejelentkezés!'+req.body.usr_username});

    }
}
