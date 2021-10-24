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
io.on("connection", function (socket) {
    var users = [];
    socket.on("new user", function (username, dbUserID) {
        socket.username = username;
        socket.dbUserID = dbUserID;
        io.of("/").sockets.forEach(function (entry) {
            var index = users.findIndex(function (user) { return user.userID === entry.id; });
            if (!!entry.username && index === -1 && !!entry.dbUserID) {
                users.push({
                    userID: entry.id,
                    username: entry.username,
                    dbUserID: entry.dbUserID,
                });
            }
        });
        socket.broadcast.emit("users", users);
    });
    io.of("/").sockets.forEach(function (entry) {
        var index = users.findIndex(function (user) { return user.dbUserID === entry.dbUserID; });
        if (!!entry.username && index === -1 && entry.id !== socket.id && !!entry.dbUserID) {
            users.push({
                userID: entry.id,
                username: entry.username,
                dbUserID: entry.dbUserID,
            });
        }
        if (!!entry.username && index > -1 && !!entry.dbUserID) {
            users[index] = {
                userID: entry.id,
                username: entry.username,
                dbUserID: entry.dbUserID,
            };
        }
    });
    console.log('users: ');
    socket.emit("users", users);
    socket.on("private message", function (_a) {
        var username = _a.username, receiver = _a.receiver, msg = _a.msg, sender = _a.sender, chat = _a.chat;
        io.of("/").sockets.forEach(function (entry) {
            var index = users.findIndex(function (user) { return user.userID === entry.id; });
            if (!!entry.username && index === -1 && !!entry.dbUserID) {
                users.push({
                    userID: entry.id,
                    username: entry.username,
                    dbUserID: entry.dbUserID,
                });
            }
        });
        socket.to(receiver).emit("private message", {
            username: username,
            message: msg,
            receiver: receiver,
            sender: sender,
            chat: socket.dbUserID
        });
        console.log('socket.id: ' + socket.id);
        socket.emit("private message sent", {
            username: username,
            message: msg,
            sender: sender,
            chat: chat,
            receiver: receiver
        });
    });
    socket.on("chat message", function (_a) {
        var username = _a.username, msg = _a.msg, sender = _a.sender, receiver = _a.receiver, chat = _a.chat;
        io.emit("chat message", { username: username, sender: sender, message: msg, receiver: receiver, chat: chat });
    });
    socket.on("disconnect", function () {
        console.log("user disconnected");
    });
});
var chat = io.of("/chat");
exports.chat = chat;
server.listen(3030, function () {
    console.log("chat listening: 3030");
});
var CONNECTION_URL = process.env.CONNECTION_URL;
var PORT = process.env.PORT;
mongoose_1.default
    .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function () {
    return app.listen(PORT, function () { return console.log("Server is running on port: " + PORT); });
})
    .catch(function (e) { return console.log(e.message); });
mongoose_1.default.set("useFindAndModify", false);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG9EQUE4QjtBQUM5QixzREFBZ0M7QUFDaEMsOENBQXdCO0FBQ3hCLDRDQUF3QztBQUN4QyxrREFBNEI7QUFDNUIsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUVoQiw4Q0FBd0I7QUFDeEIsK0RBQTJDO0FBQzNDLHlEQUF3QztBQUN4Qyw4REFBMEQ7QUFFMUQsZUFBZTtBQUNmLElBQU0sR0FBRyxHQUFHLElBQUEsaUJBQU8sR0FBRSxDQUFDO0FBNkhiLGtCQUFHO0FBNUhaLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFBLGNBQUksR0FBRSxDQUFDLENBQUM7QUFDaEIsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDO0FBQzVCLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBRXpELElBQU0sTUFBTSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQztBQUMxRCxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQztBQUNqQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUEsWUFBRyxHQUFFLENBQUMsQ0FBQztBQUVmLFFBQVE7QUFDUixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxr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