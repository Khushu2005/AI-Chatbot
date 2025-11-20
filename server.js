require('dotenv').config();
const server = require("./src/app")
const { createServer } = require("http");
const { Server } = require("socket.io");

const generateResponse = require('./src/service/ai.service');

const httpServer = createServer(server);
const io = new Server(httpServer, { 
  cors: {
    origin: "http://localhost:5173"
  }
});



const ChatHistory = [];


io.on("connection", (socket) => {
  console.log("User Connected!");

  socket.on("Ai-message", async (data) => {
    console.log("Prompt received:", data);

    ChatHistory.push({
      role: "user",
      parts: [{ text: data }]
    });

    const response = await generateResponse(ChatHistory);

    ChatHistory.push({
      role: "model",
      parts: [{ text: response }]
    });
console.log('Ai-reply :' ,response)
    socket.emit("Ai-reply", response);
  });
});



httpServer.listen(3000,(req,res)=>{
    console.log("Server is running on http://localhost:3000")
})