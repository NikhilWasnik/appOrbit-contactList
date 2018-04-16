const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const nodemon = require("nodemon");
const app = express();

// cross origin requests
const cors = require('cors');
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

// route files'
const api = require('./server/routes/api');

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'dist')));

// routes
app.use("/api",api);

// port
const port = process.env.PORT || 9090;
app.set("port",port);

// create server
const server = http.createServer(app);
server.listen(port, ()=>{
	console.log(`Server listening on port: ${port}`);
})