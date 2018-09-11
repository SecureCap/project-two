module.exports = function(sequelize, DataTypes) {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
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

    return User;
};