const UserValidator = require('../validator/userValidator');
module.exports = async function (req, res, proceed) {
    console.log(req.query);
    let loggedInUserId = req.query.loggedInUserId;
    if (loggedInUserId) {
        try {
            await UserValidator.toCheckValidUserId(loggedInUserId);
            req.me = loggedInUserId;
            return proceed();
        } catch (err) {
            console.log(err);
            res.status(401).json({ message: err.message });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};