const express = require("express");
const bodyParser = require('body-parser')
const serverless = require("serverless-http");

const app = express();
const router = express.Router();
var Twit = require('twit')
require('dotenv').config()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

router.post('/tweet', (req, res) => {
  var T = new Twit({
    consumer_key:         process.env.C_KEY,
    consumer_secret:      process.env.C_SECRET_KEY,
    access_token:         process.env.A_TOKEN,
    access_token_secret:  process.env.A_SECRET_TOKEN,
    timeout_ms:           60*1000,
    strictSSL:            true,
  });

  T.post('statuses/update', { status: req.body.message }, function(err, data, response) {})

  res.send("ok");
});


app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
