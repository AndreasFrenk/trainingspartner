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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUE4QjtBQUM5QixzREFBZ0M7QUFDaEMsOENBQXdCO0FBQ3hCLDRDQUF3QztBQUN4QyxrREFBNEI7QUFDNUIsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQiw4Q0FBd0I7QUFDeEIsK0RBQTJDO0FBQzNDLHlEQUF3QztBQUN4Qyw4REFBMEQ7QUFFMUQsZUFBZTtBQUNmLElBQU0sR0FBRyxHQUFHLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBNEhiLGtCQUFHO0FBM0haLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGNBQUksR0FBRSxDQUFDLENBQUM7QUFDaEIsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDO0FBQzVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBRXpELElBQU0sTUFBTSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQztBQUMxRCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsWUFBRyxHQUFFLENBQUMsQ0FBQztBQUVmLFFBQVE7QUFDUixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxrQkFBVSxDQUFDLENBQUM7QUFDOUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUs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