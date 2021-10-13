import io from "socket.io-client";
import { userService } from "../../services/userService";

const connection = io("localhost:3030");
connection.connect();

const userName = userService.getStoredUserName()
  ? userService.getStoredUserName()
  : "";
connection.emit("new user", userName);

export { connection };
