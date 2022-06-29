/* eslint-disable */

import Chat from "./../../components/Chat";
import UsersList from "./../../components/UsersList";
import "./ChatPage.css";
import { ChatMessage, Empty } from "./../../chat_pb";
import { useEffect, useState } from "react";

export default function ChatPage({ client, username }) {
  const [users, setUsers] = useState([]);
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    client.getAllUsers(new Empty(), null, (err, response) => {
      let usersList = response?.getUsersList() || [];
      usersList = usersList
        .map((user) => {
          return {
            id: user.array[0],
            name: user.array[1],
          };
        });
      setUsers(usersList);
    });

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
  }, []);

  function getAllUsers() {
    client.getAllUsers(new Empty(), null, (err, response) => {
      let usersList = response?.getUsersList() || [];
      usersList = usersList
        .map((user) => {
          return {
            id: user.array[0],
            name: user.array[1],
          };
        });
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
    getMessages();
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

  function refresh() {
    console.log("refreshing...");
    getMessages();
    getAllUsers();
  }

  return (
    <div className="chatpage">
      <div className="userslist-section">
        <div
          style={{ paddingBottom: "4px", borderBottom: "1px solid darkgray" }}
        >
          <div>
            <button onClick={refresh}>REFRESH</button>
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
        <Chat msgList={msgList} sendMessage={sendMessage} username={username} />
      </div>
    </div>
  );
}
