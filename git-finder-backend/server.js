const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
const port = process.env.PORT ||4000
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

app.get('/', (req, res) => {
    res.send("hii");
})
// Code being passed from the frontend
app.get("/getAccessToken", async (req, res) => {
 
  // console.log(req.query.code);
  const params =
    "?client_id=" +
    CLIENT_ID +
    "&client_secret=" +
    CLIENT_SECRET +
    "&code=" +
    req.query.code;
    // console.log(params);
  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        // console.log(data);
      res.json(data);
    });
});

//Access Token is going to pass in as Authorization header
app.get("/getUserData", async (req, res) => {
  req.get("Authorization"); //Bearer ACCESS_TOKEN
  // console.log(req.get("Authorization"))
  await fetch("https://api.github.com/user", {
    method: "GET",
    headers: { Authorization: req.get("Authorization") },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      res.json(data);
    });
});

app.listen(port, (req, res) => {
  console.log(`listening on port ${port}`);
});
