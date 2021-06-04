const express = require("express");
const server = express();

server.use(express.static("public"));

const nunjucks = require("nunjucks");   // Template engine
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render("index.html");
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})


const PORT = process.env.PORT||"3000"
server.listen(PORT, function() {
    console.log(`Go to: http://127.0.0.1:${PORT}/`);
})
