const { Sequelize, DataTypes: { INTEGER, STRING } } = require("sequelize");
const { getMovieById, getPersonById } = require("./repository");

let Person, Movie, DirectorMovie, ProducerMovie, ActorMovie;

(async () => {
   const sequelize = new Sequelize('sqlite::memory:', { logging: false });

   const baseTableDefinition = { id: { primaryKey: true, type: INTEGER, autoIncrement: true } };

   Person = sequelize.define('Person', { ...baseTableDefinition,
      name: STRING,
      lastName: STRING,
      age: INTEGER,
   });

   Movie = sequelize.define('Movie', { ...baseTableDefinition,
      title: STRING,
      year: INTEGER,
   });

   DirectorMovie = sequelize.define('DirectorMovie', { ...baseTableDefinition });
   ProducerMovie = sequelize.define('ProducerMovie', { ...baseTableDefinition });
   ActorMovie = sequelize.define('ActorMovie', { ...baseTableDefinition });

   Person.belongsToMany(Movie, { through: DirectorMovie, as: 'moviesAsDirector' });
   Movie.belongsToMany(Person, { through: DirectorMovie, as: 'directors' });
   
   Person.belongsToMany(Movie, { through: ProducerMovie, as: 'moviesAsProducer' });
   Movie.belongsToMany(Person, { through: ProducerMovie, as: 'producers' });
   
   Person.belongsToMany(Movie, { through: ActorMovie, as: 'moviesAsActor' });
   Movie.belongsToMany(Person, { through: ActorMovie, as: 'actors' });

   try {
      await sequelize.authenticate();
      console.log('\nConnection has been established successfully.\n');
   } catch (error) {
      console.error('Unable to connect to the database:', error);
   }

   await sequelize.sync()
      .catch(err => console.log(err));

   try {
      await Person.bulkCreate(
         [
            { name: 'Name1', lastName: 'LastName1', age: 21, },
            { name: 'Name2', lastName: 'LastName2', age: 22, },
            { name: 'Name3', lastName: 'LastName3', age: 23, },
            { name: 'Name4', lastName: 'LastName4', age: 24, },
            { name: 'Name5', lastName: 'LastName5', age: 25, },
            { name: 'Name6', lastName: 'LastName6', age: 26, },
            { name: 'Name7', lastName: 'LastName7', age: 27, },
            { name: 'Name8', lastName: 'LastName8', age: 28, },
            { name: 'Name9', lastName: 'LastName9', age: 29, },
            { name: 'Name10', lastName: 'LastName10', age: 30, },
         ],
      );
      await Movie.bulkCreate(
         [
            { title: 'Title1', year: 2001 },
            { title: 'Title2', year: 2002 },
            { title: 'Title3', year: 2003 },
            { title: 'Title4', year: 2004 },
            { title: 'Title5', year: 2005 },
            { title: 'Title6', year: 2006 },
         ],
      );
      await DirectorMovie.bulkCreate(
         [
            { PersonId: 1, MovieId: 1 },
            { PersonId: 2, MovieId: 2 },
            { PersonId: 2, MovieId: 3 },
         ],
      );
      await ProducerMovie.bulkCreate(
         [
            { PersonId: 2, MovieId: 1 },
            { PersonId: 2, MovieId: 2 },
            { PersonId: 2, MovieId: 4 },
         ],
      );
      await ActorMovie.bulkCreate(
         [
            { PersonId: 3, MovieId: 1 },
            { PersonId: 4, MovieId: 1 },
            { PersonId: 5, MovieId: 1 },
            { PersonId: 2, MovieId: 5 },
            { PersonId: 2, MovieId: 6 },
            { PersonId: 2, MovieId: 2 },
            { PersonId: 4, MovieId: 2 },
         ],
      );
   } catch (err) {
      console.log(err);
   }

   const movie = await getMovieById(2, { Movie, Person });
   console.log('Movie:');
   console.log(movie);

   const person = await getPersonById(2, { Movie, Person });
   console.log('\nPerson');
   console.log(person);
})();
