module.exports = (sequelize, DataTypes) => {
  const Jobs = sequelize.define("jobs", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pay_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Jobs;
};
