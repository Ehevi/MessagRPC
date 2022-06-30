import "./App.css";
import Header from "./components/Header";

import { ChatServiceClient } from "./chat_grpc_web_pb";
import ChatPage from "./pages/ChatPage";
import JoinPage from "./pages/JoinPage";
import { useState } from "react";

export const client = new ChatServiceClient(
  "http://localhost:8080",
  null,
  null
);

export default function App() {
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(null);

  return (
    <>
      <Header />
      <div className="container">
        <main className="main">
          {username !== '' && submitted ? <ChatPage client={client} username={username}/> : <JoinPage client={client} setUsername={setUsername} setSubmitted={setSubmitted} />}
        </main>
      </div>
    </>
  );
}
