const bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        access_token: {
            type: DataTypes.STRING
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Picture, {
            onDelete: "cascade"
        });
    };

    User.prototype.validPassword = function(password) {
        const match = bcrypt.compareSync(password, this.password);
        console.log("Is password valid?", match);
        return match;
    };

    User.hook("beforeCreate", function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
};