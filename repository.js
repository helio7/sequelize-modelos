exports.getMovieById = async (movieId, models) => {
   const { Movie, Person } = models;
   const movie = await Movie.findOne({
      where: { id: movieId },
      attributes: ['title', 'year'],
      include: [
         {
            model: Person,
            as: 'directors',
            attributes: ['name', 'lastName', 'age'],
         },
         {
            model: Person,
            as: 'producers',
            attributes: ['name', 'lastName', 'age'],
         },
         {
            model: Person,
            as: 'actors',
            attributes: ['name', 'lastName', 'age'],
         },
      ],
   })
      .catch((err) => {
         console.log(err);
      });

   const { dataValues: { title, year, directors, producers, actors } } = movie;

   return {
      title,
      year,
      directors: directors.map(({ name, lastName, age }) => ({ name, lastName, age })),
      producers: producers.map(({ name, lastName, age }) => ({ name, lastName, age })),
      casting: actors.map(({ name, lastName, age }) => ({ name, lastName, age })),
   };
}

exports.getPersonById = async (personId, models) => {
   const { Person, Movie } = models;
   const person = await Person.findOne({
      where: { id: personId },
      attributes: ['name', 'lastName', 'age'],
      include: [
         {
            model: Movie,
            as: 'moviesAsDirector',
            attributes: ['title', 'year'],
         },
         {
            model: Movie,
            as: 'moviesAsProducer',
            attributes: ['title', 'year'],
         },
         {
            model: Movie,
            as: 'moviesAsActor',
            attributes: ['title', 'year'],
         },
      ]
   })
      .catch((err) => {
         console.log(err);
      });

   const { dataValues: { name, lastName, age, moviesAsDirector, moviesAsProducer, moviesAsActor } } = person;
   
   return {
      name,
      lastName,
      age,
      moviesAsDirector: moviesAsDirector.map(({ title, year }) => ({ title, year })),
      moviesAsProducer: moviesAsProducer.map(({ title, year }) => ({ title, year })),
      moviesAsActor: moviesAsActor.map(({ title, year }) => ({ title, year })),
   };
}
