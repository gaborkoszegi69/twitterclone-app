const express = require('express');
const crypto = require('node:crypto');
const  addRoutes   = require('./router');
var session = require('express-session');
const {initDatabase} = require('./services/db');
const app = express();
var dotenv = require('dotenv')
dotenv.config()
app.listen(process.env.PORT, () => {
    console.log('Server is running on port '+process.env.PORT);
});

initDatabase((err, { db, userModel,twitterModel}) => {
    if (err) {
        return console.err(err);
    }

    addRoutes(app, db, userModel,twitterModel);
   // app.listen(process.env.PORT, () => {
    //     console.log('Server is running on port '+process.env.PORT);
    // });
});



/*
// LokiJS adatbázis
const db = new Loki('loki.db.json', {
    autoload: true,
    autoloadCallback: initDb,
    autosave: true,
    autosaveInterval: 4000,
});

let users; // Felhasználók gyűjteménye

function initDb() {
    users = db.getCollection('users') || db.addCollection('users');
}

// Middleware
app.use(bodyParser.json());
/*app.use(
    session({
        store: new LokiStore({ path: './sessions.db' }), // Loki alapú session tárolás
        secret: 'titkos-kulcs', // Cseréld le egy erős kulcsra
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 }, // 1 óra
    })
);

// Új felhasználó regisztrálása
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Felhasználónév és jelszó szükséges!');
    }

    // Ellenőrizd, hogy a felhasználónév már létezik-e
    if (users.findOne({ username })) {
        return res.status(400).send('Felhasználónév már foglalt!');
    }

    // Jelszó kódolása bcrypt-tel
    const hashedPassword = crypto.hash('sha1', password);
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Új felhasználó mentése
    const user = users.insert({ username, password: hashedPassword });
    res.send({ message: 'Regisztráció sikeres!', userId: user.$loki });
});



// Kilépés
app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Hiba történt a kilépés során!');
        }
        res.send({ message: 'Sikeres kilépés!' });
    });
});


// Csak bejelentkezett felhasználóknak elérhető végpont
app.get('/profile', authMiddleware, (req, res) => {
    const user = users.get(req.session.userId);
    if (!user) {
        return res.status(404).send('Felhasználó nem található!');
    }

    res.send({ message: 'Profil információk:', username: user.username });
});*/