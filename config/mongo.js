const mongoose = require("mongoose");
// const {
//   loadConfigFromDbToCache,
// } = require("../app/controllers/configuration/helpers");
const DB_URL = process.env.MONGO_URI;
console.log(DB_URL);
// const loadModels = require("../app/models");

module.exports = () => {
  const connect = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect(
      DB_URL,
      {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      async (err) => {
        let dbStatus = "";
        if (err) {
          dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`;
        }
        dbStatus = `*    DB Connection: OK\n****************************\n`;
        if (process.env.NODE_ENV !== "test") {
          // Prints initialization
          console.log("****************************");
          console.log("*    Starting Server");
          console.log(`*    Port: ${process.env.PORT || 3000}`);
          console.log(`*    NODE_ENV: ${process.env.NODE_ENV}`);
          console.log(`*    Database: MongoDB`);
          console.log(dbStatus);
        }
        // await loadConfigFromDbToCache();
        // typeof cb === "function" && cb();
      }
    );
    // mongoose.set("useCreateIndex", true);
    // mongoose.set("useFindAndModify", false);
  };
  connect();

  mongoose.connection.on("error", console.log);
  mongoose.connection.on("disconnected", connect);

  // loadModels();
};
