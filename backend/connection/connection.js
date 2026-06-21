const mongoose = require("mongoose");

function mongoConnection(URL) {
  mongoose
    .connect(URL)
    .then(() => {
      console.log("Database connected succesfully");
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  mongoConnection,
};
