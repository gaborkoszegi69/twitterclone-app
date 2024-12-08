const bcrypt = require('bcrypt');
module.exports =  async (req, res, next) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).send('Felhasználónév és jelszó szükséges!');
    }

    const user = users.findOne({username});
    if (!user) {
        return res.status(401).send('Hibás felhasználónév vagy jelszó!');
    }

    // Ellenőrizd a jelszót
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).send('Hibás felhasználónév vagy jelszó!');
    }

    // Session mentése
    req.session.userId = user.$loki;
    res.send({message: 'Sikeres bejelentkezés!', username});
};