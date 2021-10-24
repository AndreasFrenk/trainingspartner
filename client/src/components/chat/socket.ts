import io, { Socket } from "socket.io-client";
import { userService } from "../../services/userService";

let connection: Socket;
const user = userService.getStoredUser();
const token = user?.token;
console.log(user);
if (process.env.REACT_APP_CHAT_URL) {
  connection = io(process.env.REACT_APP_CHAT_URL);
} else {
  connection = io("localhost:3030");
}
connection = io('https://ancient-garden-24420.herokuapp.com');
connection.connect();

const userName = userService.getStoredUserName()
  ? userService.getStoredUserName()
  : "";
connection.emit("new user", userName);

export { connection };
