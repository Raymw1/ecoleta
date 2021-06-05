const express = require("express");
const server = express();

const db = require("./database/db");

server.use(express.static("public"));

server.use(express.urlencoded({ extended: true })) // req.body

const nunjucks = require("nunjucks");   // Template engine
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render("index.html");
})

server.get("/create-point", (req, res) => {
    // req.query
    return res.render("create-point.html");
})

server.post("/create-point", (req, res) => {
    let query = `INSERT INTO places (name, image, address, number, uf, city, items) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const place = [req.body.name, req.body.image, req.body.address, req.body.number, req.body.state, req.body.cities, req.body.items];
    function afterInsert(err) {
        if (err) {
            return res.send("Erro no cadastro!");
        }
        return res.render("create-point.html", { new: true });
    }
    db.run(query, place, afterInsert);
})

server.get("/search", (req, res) => {
    const search = req.query.search;
    if (search.trim() == "") {
        return res.render("search-results.html", { amount: 0 });
    }
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if (err) {
            return console.log(err);
        }
        return res.render("search-results.html", { places: rows, amount: rows.length });
    })
})


const PORT = process.env.PORT||"3000"
server.listen(PORT, function() {
    console.log(`Go to: http://127.0.0.1:${PORT}/`);
})
