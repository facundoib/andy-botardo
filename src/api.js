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

router.post('/tweet', (req, res) => {
  var T = new Twit({
    consumer_key: process.env.C_KEY,
    consumer_secret: process.env.C_SECRET_KEY,
    access_token: process.env.A_TOKEN,
    access_token_secret: process.env.A_SECRET_TOKEN,
    timeout_ms: 60 * 1000,
    strictSSL: true,
  });
  const body = []

  try {
    req.on('data', (data) => {
      body.push(data)
    })

    req.on('end', () => {
      T.post('statuses/update', { status: JSON.parse(Buffer.concat(body).toString()).message }, function (err, data, response) {
        console.log(data)
        console.log(JSON.parse(Buffer.concat(body).toString()).message)
        console.log(response)
      })
    })
  } catch (error) {
    res.send("Error");
  }

  res.send("Ok");
});


app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
