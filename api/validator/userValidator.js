
const UserDAO = require("../dao/user.dao");
class UserValidator {
    static async toCheckValidUserId(userId) {
        var result = await UserDAO.findOne(userId);

        if (!result) {
            throw new Error("Please Check User ID");
        }
    }
    
}

module.exports = {
    toCheckValidUserId: UserValidator.toCheckValidUserId

}