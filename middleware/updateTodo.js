module.exports = (objRep) => {
    const {todoModel, db} = objRep;
    return (req, res, next) => {
        if (typeof req.body.todo !== 'undefined') {
            res.locals.todo.todo = req.body.todo;
        }

        todoModel.update(res.locals.todo);
        db.saveDatabase(err => {
            //err?
            return next();
        });
    }
}