const { Sequelize, DataTypes } = require("sequelize");

(async () => {
   // Instantiate Sequelize with SQLite.
   const sequelize = new Sequelize('sqlite::memory:');

   const { STRING, NUMBER } = DataTypes;
   const User = sequelize.define('User', {
      id: STRING,
      name: STRING,
      lastName: STRING,
      age: NUMBER,
   });
   const Movie = sequelize.define('Movie', {
      id: STRING,
      title: STRING,
      year: NUMBER,
   });
})();