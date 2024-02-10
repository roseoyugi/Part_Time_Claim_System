module.exports = (sequelize, DataTypes) => {
  const Roles = sequelize.define("roles", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Roles;
};
