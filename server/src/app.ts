import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { jwt } from "./_helpers/jwt.js";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts";
import { errorHandler } from "./_helpers/errorHandler.js";

//Configuration
const app = express();
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(express.json({ limit: "25mb" }));
app.use(cors());
const folderName = "public";
app.use(express.static(__dirname + "/../" + folderName));

const folder = path.join(__dirname + "/../" + folderName);
app.use(jwt());

//Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

//Error Handler
app.use(errorHandler);
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// io.on("connection", (socket: any) => {
//   const users = [] as any;
//   socket.on("new user", (username: string, dbUserID: string) => {
//     socket.username = username;
//     socket.dbUserID = dbUserID;
//   io.of("/").sockets.forEach((entry: any) => {
//     const index = users.findIndex((user: any) => user.userID === entry.id)
//     if (!!entry.username && index === -1 && !!entry.dbUserID) {
//       users.push({
//         userID: entry.id,
//         username: entry.username,
//         dbUserID: entry.dbUserID,
//       });
//     }
//   });
//   socket.broadcast.emit("users", users);
//   });
//   io.of("/").sockets.forEach((entry: any) => {
//     const index = users.findIndex((user: any) => user.dbUserID === entry.dbUserID)
//     if (!!entry.username && index === -1 && entry.id !== socket.id && !!entry.dbUserID) {
//       users.push({
//         userID: entry.id,
//         username: entry.username,
//         dbUserID: entry.dbUserID,
//       });
//     }
//     if (!!entry.username && index > -1 && !!entry.dbUserID) {
//       users[index] = {
//         userID: entry.id,
//         username: entry.username,
//         dbUserID: entry.dbUserID,
//       }
//     }
//   });
//   console.log('users: ')
//   socket.emit("users", users);

//   socket.on(
//     "private message",
//     ({ username, receiver, msg, sender, chat }: {  username: string; receiver: string; msg: string, sender: string, chat: string}) => {
//       io.of("/").sockets.forEach((entry: any) => {
//         const index = users.findIndex((user: any) => user.userID === entry.id)
//         if (!!entry.username && index === -1 && !!entry.dbUserID) {
//           users.push({
//             userID: entry.id,
//             username: entry.username,
//             dbUserID: entry.dbUserID,
//           });
//         }
//       })
//       socket.to(receiver).emit("private message", {
//         username: username,
//         message: msg,
//         receiver: receiver, 
//         sender: sender,
//         chat: socket.dbUserID
//       });
//       console.log('socket.id: ' + socket.id)

//       socket.emit("private message sent", {
//         username: username,
//         message: msg,
//         sender: sender,
//         chat: chat,
//         receiver: receiver 
//       });
//     }
//   );

//   socket.on(
//     "chat message",
//     ({username, msg, sender, receiver, chat}: {username: string, msg: string; sender: string; receiver: string, chat: string}) => {
//       io.emit("chat message", {username: username, sender: sender, message: msg, receiver: receiver, chat: chat});
//     }
//   );

//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

const chat = io.of("/chat");

// server.listen(3030, () => {
//   console.log("chat listening: 3030");
// });

const CONNECTION_URL = process.env.CONNECTION_URL!;
const PORT = process.env.PORT!;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
  )
  .catch((e) => console.log(e.message));

mongoose.set("useFindAndModify", false);

export { app, server, io, chat };
