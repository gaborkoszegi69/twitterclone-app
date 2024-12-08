module.exports = (objRep) => {
    const {userModel} = objRep;
    return (req, res, next) => {
        const oneUser = userModel.findOne({
            id: req.params.id
        });

        // 404 if not found
        if (!oneUser) {
            return res.status(404).json({error: `oneUser not found with id: ${req.params.id}`});
        }

        res.locals.user = oneUser;
        return next();
    }
}