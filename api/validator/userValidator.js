
const UserDAO = require('../dao/user.dao');
class UserValidator {
    /**
     * to check is valid user or not
     * @param {string} userId 
     */
    static async toCheckValidUserId(userId) {
        var result = await UserDAO.findOne(userId);
        if (!result) {
            throw new Error('Please Check User ID');
        }
    }
    /**
     * to check user role is admin or not
     * @param {string} userId 
     */
    static async isAdmin(userId) {
        var result = await UserDAO.findOne(userId);
        if (result) {
            if (result.role != 'ADMIN') {
                throw new Error('You Are Not Authorized');
            }
        } else {
            throw new Error('Please Enter Valid UserID');
        }
    }
}
module.exports = {
    toCheckValidUserId: UserValidator.toCheckValidUserId,
    isAdmin: UserValidator.isAdmin
}