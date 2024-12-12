module.exports = (req, res, next) => {
    return  (req, res, next) => {
      //  console.log(userModel);
        res.locals.users = userModel.find();
        return next();

    }
}