const { Sequelize, DataTypes } = require("sequelize");

(async () => {
   // Instantiate Sequelize with SQLite.
   const sequelize = new Sequelize('sqlite::memory:');

   const { NUMBER, STRING } = DataTypes;
   const Person = sequelize.define('Person', {
      id: NUMBER,
      name: STRING,
      lastName: STRING,
      age: NUMBER,
   });
   const Movie = sequelize.define('Movie', {
      id: NUMBER,
      title: STRING,
      year: NUMBER,
   });
   const DirectorMovie = sequelize.define('DirectorMovie', {
      id: NUMBER,
      personId: NUMBER,
      movieId: NUMBER,
   });
   const ProducerMovie = sequelize.define('ProducerMovie', {
      id: NUMBER,
      personId: NUMBER,
      movieId: NUMBER,
   });
   const CastMovie = sequelize.define('CastMovie', {
      id: NUMBER,
      personId: NUMBER,
      movieId: NUMBER,
   });
})();
