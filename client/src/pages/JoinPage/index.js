import { User } from "../../chat_pb";
import { useRef } from "react";

export default function JoinPage({ client, setUsername, setSubmitted }) {
  const inputRef = useRef(null);

  function joinHandler() {
    const username = inputRef.current.value;

    const user = new User();
    user.setId(Date.now());
    user.setName(username);

    setUsername(username)

    client.join(user, null, (err, response) => {
      if (err) return console.log(err);
      const error = response.getError();
      const msg = response.getMsg();

      if (error === 1) {
        console.log(error, msg);
        setSubmitted(true);
        return;
      }
      setSubmitted(true);
    });
  }

  return (
    <div>
      <div>
        <h1>Join Chat As...</h1>
      </div>
      <div style={{ padding: "10px 0" }}>
        <input
          style={{ fontSize: "1.3rem" }}
          type="text"
          ref={inputRef}
          placeholder="Your username..."
        />
      </div>
      <div>
        <button
          onClick={joinHandler}
          style={{
            padding: "7px 38px",
            fontSize: "1.2em",
            boxSizing: "content-box",
            borderRadius: "4px",
          }}
        >
          Join
        </button>
      </div>
    </div>
  );
}
