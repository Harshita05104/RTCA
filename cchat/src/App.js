import Join from "./component/Join/Join";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import './App.css';
import Chat from "./component/Chat/Chat";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element = {<Join/>} />
        <Route exact path="/chat" element = {<Chat/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
