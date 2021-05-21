import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"
import Mainpage from "./Mainpage";

function App() {
  return (
<Router>
  <Route path='/' component={Mainpage}/>
</Router>
  );
}

export default App;
