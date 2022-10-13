const { Sequelize } = require("sequelize");

(async () => {
   // Instantiate Sequelize with SQLite.
   const sequelize = new Sequelize('sqlite::memory:');
})();
