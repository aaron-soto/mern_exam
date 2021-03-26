const mongoose = require("mongoose");

module.exports = (dbName) => {
    mongoose
        .connect(`mongodb://localhost/${dbName}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
        .then(() => console.log(`Established a connection to ${dbName}`))
        .catch((err) =>
            console.log(
                "Something went wrong when connecting to the database",
                err
            )
        );
};
