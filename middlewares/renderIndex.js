module.exports =   (req, res) => {
    res.render('index', {
        counter: req.session.counter,
        sessionId: req.sessionID,
    });
};