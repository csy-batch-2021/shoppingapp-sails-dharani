class UserRepository {
    // get one user based on id
    static async findOne(id) {
        console.log(id);
        // let ds = await sails.getDatastore();
        // const result = await ds.sendNativeQuery('SELECT * FROM users where id=$1', [id]);
        // let data = result.rows;
        // return data.length > 0 ? data[0] : null;
    }
}
module.exports = {
    findOne: UserRepository.findOne
}