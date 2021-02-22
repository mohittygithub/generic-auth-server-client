const mongoose = require("mongoose");

const connect_db = () => {
  mongoose.connect(
    process.env.DB_CONNECTION_CLOUD,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    },
    () => {
      console.log("MongoDB Connected!!");
    }
  );
};

module.exports = connect_db;
