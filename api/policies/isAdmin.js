
const UserValidator = require("../validator/userValidator");
module.exports = async function (req, res, proceed) {
    let loggedInUserId = req.query.loggedInUserId;
    if (loggedInUserId) {
        try {
            await UserValidator.isAdmin(loggedInUserId);
            req.me = loggedInUserId;
            return proceed();
        } catch (err) {
            console.log(err);
            res.status(401).json({ message: err.message });
        }
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }

}