module.exports = function (sequelize, DataTypes) {
  var Picture = sequelize.define('Picture', {
    name: {
      type: DataTypes.STRING,
      // AllowNull is a flag that restricts a todo from being entered if it doesn't
      // have a text value
      allowNull: false,
      // len is a validation that checks that our todo is between 1 and 140 characters
      validate: {
        len: [1, 140]
      }
    },
    image: {
      type: DataTypes.BLOB,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    location: {
      type: DataTypes.STRING
    },
  });

  Picture.associate = function(models) {
    Picture.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Picture;
};
