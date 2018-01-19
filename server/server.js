const express     = require('express');
const Sequelize   = require('sequelize');
const bodyParser  = require("body-parser")

const sequelize = new Sequelize("database","username","password", {
  host: "localhost",
  dialect: "sqlite",
  storage: "database.sqlite"
});

sequelize.authenticate()
  .then(() => {
    console.log("Connection has been established through SQLITE")
  })
  .catch(err => {
    console.log("An error has occured", err);
  })

const app = express();
const port = process.env.PORT || 5000;

//Body Parser for Express
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/register' , (req, res) => {
  let data = req.body;
  console.log(data);
  res.status(200).json({message: "Hello World"});
});

app.listen(port, () => console.log(`Listening on port ${port}`));