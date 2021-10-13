import { useState, useEffect, Key } from "react";
import { connection } from "./socket";
import { userService } from "../../services/userService";
import "../../styles/chat.scss";

interface chatMessage {
  username: string;
  message: string;
  sender: string;
  receiver: string;
}
interface user {
  username: string;
  userID: string;
  dbUserID: string;
}
interface chat {
  chat: string;
  chatMessages: chatMessage[];
}

const defaultUser = {
  username: "all",
  userID: "all",
  dbUserID: "all"
}

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [allMessages, setAllMessages] = useState<chat[]>([]);
  const [allUsers, setAllUsers] = useState<user[]>([]);
  const [messageReciever, setmessageReciever] = useState<user>(defaultUser);
  const userName = userService.getStoredUserName();
  const [dbUserID, setdbUserID] = useState<string>("");

  useEffect(() => {
    const dbUserID = userService.getStoredUserId();
    setdbUserID(dbUserID);
    connection.emit("new user", userName, dbUserID);
  }, []);
  useEffect(() => {
    connection.on("user connected", (user) => {
      setAllUsers((prevUsers: user[]) => {
        const users = [...prevUsers];
        const index = users.findIndex(
          (entry) => entry?.userID === user?.userID
        );
        if (index === -1) {
          users.push(user);
        }
        return users;
      });
    });

    const handleMessages = ({
      username,
      message,
      sender,
      receiver,
      chat,
    }: {
      username: string;
      message: string;
      sender: string;
      receiver: string;
      chat: string;
    }) => {
      setAllMessages((prevMessages: chat[]) => {
        const messages = [...prevMessages];
        let index;
          index = prevMessages.findIndex(
            (entry) => entry.chat === chat 
          );
        if (index !== -1) {
          const entry = [...prevMessages[index].chatMessages];
          entry.push({
            username: username,
            message: message,
            sender: sender,
            receiver: receiver,
          });
          messages[index] = { ...messages[index], chatMessages: entry };
          return messages;
        } else {
          messages.push({
            chat: chat,
            chatMessages: [
              {
                username: username,
                message: message,
                sender: sender,
                receiver: receiver
              },
            ],
          });

          return messages;
        }
      });
    };
    connection.on(
      "private message",
      ({
        username,
        message,
        sender,
        receiver,
        chat
      }: {
        username: string;
        sender: string;
        message: string;
        receiver: string;
        chat: string;
      }) => {
        handleMessages({
          username: username,
          receiver: receiver,
          sender: sender,
          message: message,
          chat: chat
        });
      }
    );
    connection.on(
      "private message sent",
      ({
        username,
        message,
        sender,
        receiver,
        chat
      }: {
        username: string;
        sender: string;
        message: string;
        receiver: string;
        chat: string;
      }) => {
        console.log("receiver: " + receiver);
        console.log("dbUserID: " + dbUserID);
        console.log(allUsers)
        
        handleMessages({
          username: username,
          receiver: receiver,
          sender: sender,
          message: message,
          chat: chat
        });
      }
    );

    connection.on("users", (recievedUsers: user[]) => {
      setAllUsers(() => {
        const users = [] as user[];
        recievedUsers.forEach((user: user) => {
          if (user.dbUserID !== dbUserID) {
            users.push(user);
          }
        });
        return users;
      });
    });

    connection.on(
      "chat message",
      ({
        username,
        sender,
        message,
        receiver,
        chat
      }: {
        username: string;
        sender: string;
        message: string;
        receiver: string;
        chat: string
      }) => {
        handleMessages({
          username: username,
          receiver: receiver,
          sender: sender,
          message: message,
          chat: chat
        });
      }
    );

    return () => {
      connection.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (!messageReciever) {
      alert("Message could not be sent");
      return;
    }
    if (message.length === 0) return;
    if (messageReciever.userID === "all") {
      connection.emit("chat message", {
        username: userName,
        msg: message,
        sender: dbUserID,
        receiver: messageReciever.userID,
        chat: messageReciever.dbUserID,
      });
    } else {
      connection.emit("private message", {
        username: userName,
        msg: message,
        sender: dbUserID,
        receiver: messageReciever.userID,
        chat: messageReciever.dbUserID,
      });
    }

    setMessage("");
  };

  const handleKeyDown = (e: Key) => {
    if (e === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex w-100 chat-container m-auto border-2 h-full">
      <div className="flex flex-col flex-1 border-r-2 p-4">
        <div>Users:</div>
        <div
          className={`p-4 w-full cursor-pointer ${
            messageReciever.dbUserID === "all" ? "active" : ""
          }`}
          onClick={() => setmessageReciever(defaultUser)}
        >
          all
        </div>
        {allUsers && allUsers.length > 0
          ? allUsers.map((user: user, index: number) => {
              return dbUserID === user.dbUserID ? null : (
                <div
                  key={index}
                  className={`p-4 w-full cursor-pointer ${
                    messageReciever.dbUserID === user.dbUserID ? "active" : ""
                  }`}
                  onClick={() => setmessageReciever(user)}
                >
                  <div className="flex">
                    <div className="">{user.username}</div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <div className="hidden sm:flex flex-col flex-2 p-4">
        <div className="message-container h-full">
          {allMessages && allMessages.length > 0
            ? allMessages[
                allMessages.findIndex(
                  (entry) => entry.chat === messageReciever.dbUserID
                )
              ]?.chatMessages?.map(
                (chatMessage: chatMessage, index: number) => {
                  return (
                    <div key={index} className="w-full">
                      {chatMessage.sender === dbUserID ? (
                        <div className="flex justify-end mb-2">
                          <div className="mr-3 message-send">
                            {chatMessage.message}
                          </div>
                          {/* <div>:You</div> */}
                        </div>
                      ) : (
                        <div className="flex">
                          <div className="message-received mr-3 flex flex-col mb-2">
                            <div>{chatMessage.username}:</div>
                            <div>{chatMessage.message}</div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
              )
            : null}
        </div>
        <div className="flex border-2 justify-between message-input-container">
          <input
            className="flex-1"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e.key)}
            type="text"
            placeholder="Message"
            id="username"
          />
          <button
            onClick={() => {
              sendMessage();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
