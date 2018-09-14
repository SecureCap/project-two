// This is middleware for restricting routes 
// a  user is not allowed to visit if not logged in

module.exports = (req, res, next) => {
    if (req.user) {
        return next();
    }
    // If the user isnt logged in, redirect them to the login page
    res.redirect("/invalid");
};
