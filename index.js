// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/:word?", function (req, res) {
  if (/\d{13}/.test(req.params.word)) {
    let date = new Date(Number(req.params.word));
    res.json({
      unix: Number(req.params.word),
      utc: date.toUTCString(),
    });
  } else {
    let date;
    typeof req.params.word === "undefined"
      ? (date = new Date())
      : (date = new Date(req.params.word));
    if (date.toString() === "Invalid Date") {
      res.json({ error: date.toString() });
    } else {
      res.json({
        unix: date.valueOf(),
        utc: date.toUTCString(),
      });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
