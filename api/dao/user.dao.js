class UserDAO {
    static async findOne(id) {
        let ds = await sails.getDatastore();
        const result = await ds.sendNativeQuery("select * from users where id=$1", [id]);
        let data = result.rows;
        let user = data.length > 0 ? data[0] : null;
        return user;
    }

}
module.exports = {
    findOne: UserDAO.findOne
}