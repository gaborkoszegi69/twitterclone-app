module.exports =  (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            if (err) return next(err);
        }
        res.redirect('/'); // will always fire after session is destroyed
    });
};
