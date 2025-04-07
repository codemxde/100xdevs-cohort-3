import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);
  const inputRef = useRef(null);

  const sendMessage = () => {
    // @ts-ignore
    const data = inputRef.current.value;
    // @ts-ignore
    socket.send(data);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    // @ts-ignore
    setSocket(ws);

    ws.onmessage = (event) => {
      alert(event.data);
    };
  }, []);
  return (
    <div>
      <h1>Introduction to Websockets</h1>
      <input ref={inputRef} type="text" placeholder="type message" />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default App;
