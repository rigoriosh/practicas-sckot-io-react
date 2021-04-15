import { useContext } from "react";
import BandChart from "./components/BandChart";
import { SocketContext } from "./context/SocketContext";

const { default: BandAdd } = require("./components/BandAdd");
const { default: BandList } = require("./components/BandList");


function App() {
  
  const {online} = useContext(SocketContext);
  
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

      <div className="row ">
        <div className="col" style={{textAlign: '-webkit-center'}}>
          <BandChart/>
        </div>
      </div>

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
