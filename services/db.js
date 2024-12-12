const loki = require('lokijs');

 db =  new loki(__dirname + '/../Data/users.db');
 dbtwitter =  new loki(__dirname + '/../Data/twitters.db');
function  initDatabase(cb) {

    db.loadDatabase({}, err => {
        if (err){
            return cb(err);
        }

        userModel =  db.getCollection("users");
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
    });
    dbtwitter.loadDatabase({}, err => {
        if (err){
            return cb(err);
        }

        twitterModel = dbtwitter.getCollection("twitters");
        if (twitterModel === null) {
            twitterModel = dbtwitter.addCollection("twitters",[
                "twtr_id",
                "twtr_usr_id",
                "twtr_message",
                "twtr_deleted",
                "twtr_visible",
                "twtr_createdate",
                "twtr_updatedate"
            ]);
        }

        dbtwitter.saveDatabase(err => {
            cb(err, {dbtwitter, twitterModel});
        });
    });

}

module.exports.initDatabase = initDatabase;