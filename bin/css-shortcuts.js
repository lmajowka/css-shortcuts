#!/usr/bin/ node

var shell = require("shelljs");

let args = process.argv.slice(2);

shell.exec(`node lib/app.js ${args}`);	