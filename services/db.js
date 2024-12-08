const loki = require('lokijs');
let db =  false;
let userModel =false;
let twitterModel =false;
db =  new loki('twitter.db');
function initDatabase(cb) {

    db.loadDatabase({}, err => {
        if (err){
            return cb(err);
        }

        let userModel = db.getCollection("users");
        if (userModel === null) {
            userModel = db.addCollection("users",[
                "usr_id",
                "usr_username",
                "usr_vezeteknev",
                "usr_keresztnev",
                "usr_emailadress",
                "usr_token",
                "usr_forignpassword",
                "usr_forigndate",
                "usr_changepassword",
                "usr_deleted",
                "usr_visible",
                "usr_createdate",
                "usr_updatedate"
              ],
                { indices: ["usr_id","usr_username","usr_emailadress"], unique: ["usr_id","usr_emailadress"]} );
        }
        db.saveDatabase(err => {
            cb(err, {db, userModel});
        });

        let twitterModel = db.getCollection("twitters");
        if (twitterModel === null) {
            twitterModel = db.addCollection("twitters",[
                "twtr_id",
                "twtr_usr_id",
                "twtr_message",
                "twtr_deleted",
                "twtr_visible",
                "twtr_createdate",
                "twtr_updatedate"
            ]);
        }

        db.saveDatabase(err => {
            cb(err, {db, twitterModel});
        });
    });
}

module.exports.initDatabase = initDatabase;