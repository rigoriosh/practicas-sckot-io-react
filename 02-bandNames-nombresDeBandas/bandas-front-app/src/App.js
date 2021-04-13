import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const { default: BandAdd } = require("./components/BandAdd");
const { default: BandList } = require("./components/BandList");

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8081', {
    transports: ['websocket']
  });
  return socket;
}


function App() {

  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);
/* 
  useEffect(() => {
    setOnline(socket.connected);
  }, [socket])
 */
  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    })
    //return socket.disconnect(); // para cuando se haga logout se desconecte del socket
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    })
  }, [socket])


  return (
    <div className="container">

      <div className="alert">
        <p>Service status:
          {
            (online)
            ? <span className="text-success"> Online</span>
            : <span className="text-danger"> Offline</span>
          }
        </p>
      </div>

      <h1>BadNames</h1>
      <hr/>

      <div className="row">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">
          <BandAdd />
        </div>
      </div>




    </div>
  );
}

export default App;
