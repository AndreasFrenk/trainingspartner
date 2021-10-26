"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = exports.io = exports.server = exports.app = void 0;
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose"));
var cors_1 = __importDefault(require("cors"));
var jwt_js_1 = require("./_helpers/jwt.js");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var path_1 = __importDefault(require("path"));
var users_js_1 = __importDefault(require("./routes/users.js"));
var posts_1 = __importDefault(require("./routes/posts"));
var errorHandler_js_1 = require("./_helpers/errorHandler.js");
//Configuration
var app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.urlencoded({ limit: "25mb", extended: true }));
app.use(express_1.default.json({ limit: "25mb" }));
app.use((0, cors_1.default)());
var folderName = "public";
app.use(express_1.default.static(__dirname + "/../" + folderName));
var folder = path_1.default.join(__dirname + "/../" + folderName);
console.log("folder: " + folder);
app.use((0, jwt_js_1.jwt)());
//Routes
app.use("/users", users_js_1.default);
app.use("/posts", posts_1.default);
//Error Handler
app.use(errorHandler_js_1.errorHandler);
var http = require("http");
var server = http.createServer(app);
exports.server = server;
var Server = require("socket.io").Server;
var io = new Server(server, {
    cors: {
        origin: "*",
    },
});
exports.io = io;
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
var chat = io.of("/chat");
exports.chat = chat;
// server.listen(3030, () => {
//   console.log("chat listening: 3030");
// });
var CONNECTION_URL = process.env.CONNECTION_URL;
var PORT = process.env.PORT;
mongoose_1.default
    .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    return app.listen(PORT, function () { return console.log("Server is running on port: " + PORT); });
})
    .catch(function (e) { return console.log(e.message); });
mongoose_1.default.set("useFindAndModify", false);