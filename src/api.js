const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();
var Twit = require('twit')
require('dotenv').config()

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

router.post('/tweet', function(req, res, next) {
  console.log(req.body)
  var T = new Twit({
    consumer_key:         process.env.C_KEY,
    consumer_secret:      process.env.C_SECRET_KEY,
    access_token:         process.env.A_TOKEN,
    access_token_secret:  process.env.A_SECRET_TOKEN,
    timeout_ms:           60*1000,
    strictSSL:            true,
  });

  T.post('statuses/update', { status: req.body.message }, function(err, data, response) {
    console.log(data)
    console.log( `req ${req.body.message}, res ${response}`)
  })

  res.json({
    hello: response
  });
});


app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
