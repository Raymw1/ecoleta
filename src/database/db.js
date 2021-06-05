const sqlite3 = require("sqlite3").verbose();   // Get sql

const db = new sqlite3.Database("./src/database/database.db");  // Create db

db.serialize( () => {
    // Create table
    db.run(`CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, image TEXT, 
        address TEXT NOT NULL, number TEXT NOT NULL, uf TEXT NOT NULL, city TEXT NOT NULL, 
        items  TEXT
    )`);
    // Insert data
    let query = `INSERT INTO places (name, image, address, number, uf, city, items) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    let items = ["Paperside", "public/assets/results/colectoria.png", 
    "Guilherme Gemballa, Jardim América", "Nº 260", "Santa Catarina", "Rio do Sul", "Papéis e Papelão"];
    function afterInsert(err) {
        if (err) {
            return console.log(err)
        }
        console.log("Success");
        console.log(this)
    }
    // db.run(query, items, afterInsert);
    
    // Select data
    // db.all("SELECT * FROM places", function(err, rows) {
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Here we go:");
    //     console.log(rows);
    // });
    
    // Delete data
    // db.run(`DELETE FROM places`);
})

module.exports = db;