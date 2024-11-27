module.exports = (objRep) => {
    const {TodoModel, db} = objRep;
    return (req, res, next) => {
        const deletedTodo = res.locals.todo;
        TodoModel.remove(deletedTodo)
        db.saveDatabase(err => {
            // err?
            res.locals.todo = deletedTodo;
            return next();
        })
    }
}