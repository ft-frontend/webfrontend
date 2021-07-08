import './App.css';
import {BrowserRouter as Router, Route,Redirect} from "react-router-dom";
import MainPage from "./MainPage";
import dashboard from "./dashboard/dashboard";
import dashboardHome from "./dashboard/dashboardHome";
import dashboardDevice from "./dashboard/device/dashboardDevice";
import signIn from "./auth/signIn";
import signUp from "./auth/signUp";
import signOut from "./auth/signOut";
import LedWall from "./module/ledwall/ledwall";
import Other from "./module/other/other";
import DeviceSettings from "./dashboard/device/DeviceSettings";
import DeviceSelect from "./dashboard/device/DeviceSelect";
import ModuleNavBar from "./module/moduleNavBar";
import droneControl from "./module/drone/droneControl";
import "./DarkMode.css"
import settingsBar from "./settings/settingsBar";
import AccountSettings from "./settings/account/accountSettings";
import Interaction from "./dashboard/interaction/interaction";
import Search from "./dashboard/search/search";
import DroneNavBar from "./module/drone/droneNavBar";
import SelectDrone from "./module/drone/selectDrone";
import MissionSelect from "./module/drone/missionPlaner/missionSelect";
import AddMissionButton from "./module/drone/missionPlaner/AddMissionButton";
import AddMission from "./module/drone/missionPlaner/AddMission";
import MissionPlanner from "./module/drone/missionPlaner/MissionPlanner";

function App() {

   // document.body.classList.add("dark-body") //remove this line to disable dark mode

    return (
        <Router>
            <Route exact path="/" component={MainPage} />

          <Route path="/dashboard" component={dashboard}/>

          <Route path="/dashboard/home" component={dashboardHome}/>

          <Route exact path="/dashboard/device" component={dashboardDevice}/>
          <Route exact path="/dashboard/device/:deviceType" component={DeviceSelect}/>
          <Route exact path="/dashboard/device/:deviceType/:device" component={DeviceSettings}/>

          <Route exact path="/dashboard/interaction" component={Interaction}/>

          <Route  path="/dashboard/search" component={Search}/>


            <Route exact path="/module">

                <Redirect to="/" />

            </Route>

            <Route path="/module/ledwall">
                <ModuleNavBar name="LedWall"/>
            </Route>

            <Route path="/module/drone">
                <DroneNavBar/>
            </Route>

            <Route path="/module/other" >
                <ModuleNavBar name="Sonstiges"/>
            </Route>

            <Route exact path="/module/drone/select" component={SelectDrone}/>
            <Route exact path="/module/drone/select/:device" component={droneControl}/>

            <Route exact path="/module/drone/missions/" component={MissionSelect}/>
            <Route exact path="/module/drone/missions/add" component={AddMission}/>
            <Route exact path="/module/drone/missions/planner/:mission" component={MissionPlanner}/>

            <Route exact path="/module/other" component={Other}/>
            <Route exact path="/module/ledwall" component={LedWall}/>


            <Route path="/dashboard/settings" component={settingsBar}/>

            <Route path="/dashboard/settings/account" component={AccountSettings}/>







            <Route exact path="/auth/signIn" component={signIn}/>
            <Route exact path="/auth/signUp" component={signUp}/>
            <Route exact path="/auth/signOut" component={signOut}/>



        </Router>

    );
}

export default App;
