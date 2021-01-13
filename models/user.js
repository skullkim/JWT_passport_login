const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name: {
                type: Sequelize.STRING(20),
                allowNULL: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(1000),
                allowNULL: false,
            }
        }, {
            sequelize,
            timestamps: false,
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    // static associate(db){
    //     db.User.hasMany(db.Todo, {foreginkey: 'commenter', sourcekey: 'id'});
    // }
}