"use strict";

/**
 * Created by dev_1 on 9/30/2019.
 */
var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var passport = require("passport");

var users = require('./route/api/users');

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(passport.initialize()); // Passport config

require("./config/passport")(passport); // Routes


app.use("/api/users", users);

function main() {
  var port = process.env.PORT || 5000;
  var uri = 'mongodb+srv://uni:Sydapeotjs@cluster0-yndee.mongodb.net/test?retryWrites=true&w=majority';
  mongoose.connect(uri, {
    useNewUrlParser: true
  }).then(function () {
    app.listen(port, function () {
      return console.log("Server is listening on port: ".concat(port));
    });
  })["catch"](function (err) {
    console.log(err);
  });
}

main();