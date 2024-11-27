module.exports = (objRep) => {
    const {todoModel} = objRep;
    return (req, res, next) => {
        const oneTodo = todoModel.findOne({
            id: req.params.id
        });

        // 404 if not found
        if (!oneTodo) {
            return res.status(404).json({error: `Todo not found with id: ${req.params.id}`});
        }

        res.locals.todo = oneTodo;
        return next();
    }
}