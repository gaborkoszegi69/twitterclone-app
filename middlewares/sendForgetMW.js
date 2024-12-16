const uuid = require("uuid");
module.exports = (req, res, next) => {
    return async  (req, res, next) => {
        let sendUser = false;
        console.log(req.body);
        sendUser = userModel.findOne({usr_emailadress: req.body.emailadress });
        if (typeof sendUser.usr_id !== 'undefined') {
            console.log(sendUser.usr_id);
            sendUser.usr_token= uuid.v4();
            console.log('sendUser--');
            console.log('/forget/'+sendUser.usr_token);
            userModel.update(sendUser);
            console.log('/forget/'+sendUser.usr_token);
            return db.saveDatabase((err) => {
                return next();
            });




            return next();
        }
    }
}