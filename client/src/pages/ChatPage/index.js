/* eslint-disable */

import Chat from "./../../components/Chat";
import UsersList from "./../../components/UsersList";
import "./ChatPage.css";
import { ChatMessage, ReceiveMsgRequest, Empty } from "./../../chat_pb";
import { useEffect, useState } from "react";

export default function ChatPage({ client }) {
  const [users, setUsers] = useState([]);
  const [msgList, setMsgList] = useState([]);
  const username = window.localStorage.getItem("username");

  useEffect(() => {
    client.getAllUsers(new Empty(), null, (err, response) => {
      let usersList = response?.getUsersList() || [];
      usersList = usersList
        .map((user) => {
          return {
            id: user.array[0],
            name: user.array[1],
          };
        })
        .filter((u) => u.name !== username);
      setUsers(usersList);
    });
/*
    client.getMessages(new Empty(), null, (err, response) => {
      const msges = response?.getMessages() || [];
      setMsgList(msges);
    });
  */  
  }, []);

  function getAllUsers() {
    console.log("getting all users");
    client.getAllUsers(new Empty(), null, (err, response) => {
      let usersList = response?.getUsersList() || [];
      usersList = usersList
        .map((user) => {
          return {
            id: user.array[0],
            name: user.array[1],
          };
        })
        .filter((u) => u.name !== username);
      setUsers(usersList);
    });
  }

  function sendMessage(message) {
    const msg = new ChatMessage();
    msg.setMsg(message);
    msg.setFrom(username);
    msg.setTime(new Date().toLocaleString());

    client.sendMsg(msg, null, (err, response) => {
      console.log(response);
    });
  }

  function getMessages() {
    console.log("getting messages");
    client.getMessages(new Empty(), null, (err, response) => {
      let msges = response?.getMessagesList() || [];
      msges = msges
        .map((msg) => {
          return {
            from: msg.array[0],
            msg: msg.array[1],
            time: msg.array[2],
          };
        });
      setMsgList(msges);
    });
  }

  return (
    <div className="chatpage">
      <div className="userslist-section">
        <div
          style={{ paddingBottom: "4px", borderBottom: "1px solid darkgray" }}
        >
          <div>
            <button onClick={getMessages}>REFRESH</button>
          </div>
          <div>
            <span>
              Logged in as <b>{username}</b>
            </span>
          </div>
        </div>
        <UsersList users={users} />
      </div>
      <div className="chatpage-section">
        <Chat msgList={msgList} sendMessage={sendMessage} />
      </div>
    </div>
  );
}
