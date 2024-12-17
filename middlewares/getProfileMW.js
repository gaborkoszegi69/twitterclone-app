module.exports = (req, res, next) => {
    return async  (req, res, next) => {
      if  (typeof req.session.userId === 'undefined') {
          req.session.ErrorMsg ='Nincs felhasználó';
          console.log(req.session.ErrorMsg);
          req.session.save((err) => {
              if (err) return next(err);
          });
          res.redirect('/');

      }
        console.log(req.params.id);
        res.locals.user =  userModel.findOne({usr_id: req.session.userId });
        if (typeof res.locals.user === 'undefined') {
            //req.session.ErrorMsg ='Nincs felhasználó';
            console.log(req.session.ErrorMsg);
            req.session.save((err) => {
                if (err) return next(err);
            });
            res.redirect('/');
        } else {

            console.log(res.locals.user);
            return next();
        };
    }
}
