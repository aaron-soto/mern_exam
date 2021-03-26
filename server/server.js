const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const dbName = "pets";

require("./config/mongoose.config")(dbName);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./routes/pet.routes")(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
