
const express = require('express');
const cors = require('cors');
const busboy = require("then-busboy");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const dt = require('./api');


var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root123",
	database: "ecommerce"
  });
con.connect();
const port = process.env.PORT || 3200;
var app  =  express();
	app.use(cors())
	app.use(express.urlencoded({ extended: true }));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json())
	app.use(dt(con));
	app.use(fileUpload());
	app.use(function (req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'POST');
		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		res.setHeader('Access-Control-Allow-Credentials', true);
		res.writeHead(200); //Status code HTTP 200 / OK
		next();
		res.end();
	  });
app.listen(port, () => {
	console.log(`Express server listening on port ${port}`);
  });