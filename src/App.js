import './App.css';
import {BrowserRouter as Router, Route,Redirect} from "react-router-dom";
import MainPage from "./MainPage";
import dashboard from "./dashboard/dashboard";
import dashboardHome from "./dashboard/dashboardHome";
import dashboardSettings from "./dashboard/dashboardSettings";
import dashboardDevice from "./dashboard/device/dashboardDevice";
import signIn from "./auth/signIn";
import signUp from "./auth/signUp";
import signOut from "./auth/signOut";
import LedWall from "./module/ledwall/ledwall";
import Drone from "./module/drone/drone";
import Other from "./module/other/other";
import DeviceSettings from "./dashboard/device/DeviceSettings";
import DeviceSelect from "./dashboard/device/DeviceSelect";
import ModuleNavBar from "./module/moduleNavBar";



function App() {


    return (
        <Router>
            <Route exact path="/" component={MainPage} />

          <Route path="/dashboard" component={dashboard}/>
          <Route path="/dashboard/home" component={dashboardHome}/>
          <Route path="/dashboard/settings" component={dashboardSettings}/>
          <Route exact path="/dashboard/device" component={dashboardDevice}/>
          <Route exact path="/dashboard/device/:deviceType" component={DeviceSelect}/>
          <Route exact path="/dashboard/device/:deviceType/:device" component={DeviceSettings}/>


            <Route exact path="/module">

                <Redirect to="/" />

            </Route>

            <Route path="/module/ledwall">
                <ModuleNavBar name="LedWall"/>
                <LedWall/>
            </Route>

            <Route path="/module/drone">
                <ModuleNavBar name="Drone"/>

                <Drone/>
            </Route>

            <Route path="/module/other" >
                <ModuleNavBar name="Sonstiges"/>

                <Other/>
            </Route>




            <Route exact path="/auth/signIn" component={signIn}/>
            <Route exact path="/auth/signUp" component={signUp}/>
            <Route exact path="/auth/signOut" component={signOut}/>



        </Router>

    );
}

export default App;
