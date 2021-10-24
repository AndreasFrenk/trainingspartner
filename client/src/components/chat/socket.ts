import io, { Socket } from "socket.io-client";
import { userService } from "../../services/userService";

let connection: Socket;
const user = userService.getStoredUser();
const token = user?.token;
console.log(user)
if(process.env.REACT_APP_BASE_URL){
// connection = io(process.env.REACT_APP_BASE_URL + ":3030");
connection = io(process.env.REACT_APP_BASE_URL, {
  // query: {user}
  transportOptions: {
    polling: {
      extraHeaders: {
        'Authorization': 'Bearer ' + token,
      },
    },
  }
});
}
else {
connection = io("localhost:3030", {
  query: {user}
});
}
// connection = io("localhost:3030", {
//   query: {user}
// });
console.log(connection)
connection.connect(
);

const userName = userService.getStoredUserName()
  ? userService.getStoredUserName()
  : "";
connection.emit("new user", userName);

export { connection };
