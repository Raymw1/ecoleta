const express = require("express");
const server = express();

server.use(express.static("public"))

server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})


const PORT = process.env.PORT||"3000"
server.listen(PORT, function() {
    console.log(`Go to: http://127.0.0.1:${PORT}/`)
})
