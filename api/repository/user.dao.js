class UserRepository {
    /**
     * find one values based in id
     * @param {string} id
     */
    static async findOne(id) {
        return DAOUtil.findOne('/users/' + id);

        // let ds = await sails.getDatastore();
        // const result = await ds.sendNativeQuery('SELECT * FROM users where id=$1', [id]);
        // let data = result.rows;
        // return data.length > 0 ? data[0] : null;
    }
}
module.exports = {
    findOne: UserRepository.findOne
}