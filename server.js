const server = require("./src/app")
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(server);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  // ...
});


httpServer.listen(3000,(req,res)=>{
    console.log("Server is running on http://localhost:3000")
})