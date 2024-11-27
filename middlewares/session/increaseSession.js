module.exports = (req, res, next) => {
    req.session.counter++;
    req.session.save((err) => {
        if (err) return next(err);
        res.redirect('/');
    });
};