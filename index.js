const http = require("http");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.route('/').get((req, res) => res.render("index.html"))

const PORT = 3030 || process.env.PORT;

const start = async () => {
  try {
    http.createServer({}, app).listen(PORT);

    console.log(`Server is running at port: ${PORT}...`);
  } catch (e) {
    throw new Error(e);
  }
};

start();
