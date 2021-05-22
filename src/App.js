import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import MainPage from "./MainPage";
import dashboard from "./dashboard/dashboard";
import dashboardHome from "./dashboard/dashboardHome";
import dashboardSettings from "./dashboard/dashboardSettings";
import dashboardDevice from "./dashboard/dashboardDevice";
import ledwall from "./module/ledwall/ledwall";
import drone from "./module/drone/drone";

function App() {
    return (
        <Router>
            <Route exact path="/"  component={MainPage}/>

          <Route path="/dashboard" component={dashboard}/>
          <Route path="/dashboard/home" component={dashboardHome}/>
          <Route path="/dashboard/settings" component={dashboardSettings}/>
          <Route path="/dashboard/device" component={dashboardDevice}/>

          <Route path="/module/ledwall" component={ledwall}/>

          <Route path="/module/drone" component={drone}/>



        </Router>
    );
}

export default App;
