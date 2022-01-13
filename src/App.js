import './App.css';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import MainPage from "./StaticPages/main/MainPage";
import Dashboard from "./dashboard/dashboard";
import dashboardHome from "./dashboard/dashboardHome";
import dashboardDevice from "./dashboard/device/dashboardDevice";

import LedWall from "./module/ledwall/ledwall";
import Other from "./module/other/other";
import DeviceSettings from "./dashboard/device/DeviceSettings";
import DeviceSelect from "./dashboard/device/DeviceSelect";
import ModuleNavBar from "./module/moduleNavBar";
import DroneControl from "./module/drone/droneControl";
import "./DarkMode.css";
import SettingsBar from "./settings/settingsBar";
import AccountSettings from "./settings/account/accountSettings";
import Interaction from "./dashboard/interaction/interaction";
import Search from "./dashboard/search/search";
import DroneNavBar from "./module/drone/droneNavBar";
import SelectDrone from "./module/drone/selectDrone";
import MissionSelect from "./module/drone/missionPlaner/missionSelect";
import AddMission from "./module/drone/missionPlaner/AddMission";
import MissionPlanner from "./module/drone/missionPlaner/MissionPlanner";
import AdminMeet from "./admin/adminMeet";
import AdminNavBar from "./admin/adminNavBar";
import AdminDashboard from "./admin/adminDashboard";
import SideBar from "./UI/SideBar/SideBar";
import SettingsNavBar from "./settings/settingsNavBar";
import SettingsPageWrapper from "./settings/pageWrapper/SettingsPageWrapper";
import SelectMissionOrCreateNewOne from "./module/drone/missionPlaner/missionGenerator/SelectMissionOrCreateNewOne";
import SelectGenerator from "./module/drone/missionPlaner/missionGenerator/SelectGenerator";
import ZigZagMap from "./module/drone/missionPlaner/missionGenerator/ZigZag/ZigZagMap";
import QuickActionsSelector from "./module/QuickActions/QuickActionsSelector";
import MissionGeneratorResultViewer from "./module/drone/missionPlaner/missionGenerator/MissionGeneratorResultViewer";
import Cloud from "./module/cloud/cloud";
import CloudFatalError from "./module/cloud/CloudFatalError/CloudFatalError";
import Rekari from "./StaticPages/rekari/Rekari";
import PrivacyPolicy from "./StaticPages/privacyPolicy/PrivacyPolicy";
import Home from "./StaticPages/main/Home";
import SignIn from "./auth/signIn";

function App() {
    if (window.location.protocol !== 'https:' && window.location.hostname !== "localhost") {
       // window.location.replace(`https:${window.location.href.substring(window.location.protocol.length)}`);
    }

    return (
        <Router>
            <Route exact path="/rekari" component={Rekari}/>
            <Route exact path="/home" component={Home}/>
            <Route exact path="/privacyPolicy" component={PrivacyPolicy}/>
            <Route exact path="/" component={Rekari}/>

            <Route path="/dashboard">

                <Dashboard/>
                <SideBar/>
                <Route exact path="/dashboard" component={dashboardHome}/>

                <Route exact path="/dashboard/device" component={dashboardDevice}/>
                <Route exact path="/dashboard/device/:deviceType" component={DeviceSelect}/>
                <Route exact path="/dashboard/device/:deviceType/:device" component={DeviceSettings}/>

                <Route exact path="/dashboard/interaction" component={Interaction}/>

                <Route path="/dashboard/search" component={Search}/>


            </Route>

            <Route path="/settings">
                <SettingsNavBar/>

                <SettingsPageWrapper>
                    <SettingsBar/>
                    <Route path="/settings/account" component={AccountSettings}/>

                </SettingsPageWrapper>
                
            </Route>



            <Route exact path="/module">
                <Redirect to="/"/>
            </Route>

            <Route  path="/module/ledwall">
                <SideBar/>
                <ModuleNavBar name="LedWall"/>
            </Route>

            <Route exact path="/module/cloud">


                <ModuleNavBar name="Cloud"/>
                <Cloud/>
            </Route>

            <Route path="/module/cloud/error">

                <SideBar/>
                <ModuleNavBar name="Cloud"/>
                <CloudFatalError/>

            </Route>

            <Route path="/module/drone">
                <DroneNavBar/>
            </Route>

            <Route exact path="/module/drone">
                <SideBar/>
            </Route>

            <Route exact path="/module/quickActions">
                <SideBar/>

                <ModuleNavBar name=""/>
                <QuickActionsSelector/>
            </Route>


            <Route path="/module/other">
                <SideBar/>
                <ModuleNavBar name="Sonstiges"/>
            </Route>

            <Route exact path="/module/drone/select">
                <SideBar/>
                <SelectDrone/>
            </Route>
            <Route exact path="/module/drone/select/:device" component={DroneControl}/>

            <Route exact path="/module/drone/missions/">
                <SideBar/>
                <MissionSelect/>
            </Route>
            <Route exact path="/module/drone/missions/add">
                <SideBar/>
                <AddMission/>
            </Route>
            <Route exact path="/module/drone/missions/generators/selectMission">
                <SideBar/>
                <SelectMissionOrCreateNewOne/>

            </Route>

            <Route exact path="/module/drone/missions/generators/:mission/list/" component={SelectGenerator}/>
            <Route  path="/module/drone/missions/generators/:mission/list/">
                <SideBar/>

            </Route>
            <Route exact path="/module/drone/missions/generators/:mission/missionViewer/" component={MissionGeneratorResultViewer}/>

            <Route  path="/module/drone/missions/generators/:mission/missionViewer/">
                <SideBar/>


            </Route>

            <Route exact path="/module/drone/missions/generators/:mission/runGenerator/zigzag" component={ZigZagMap}/>

            <Route exact path="/module/drone/missions/generators/:mission/runGenerator/zigzag">
                <SideBar/>

            </Route>







            <Route exact path="/module/drone/missions/planner/:mission" component={MissionPlanner}/>


            <Route exact path="/module/other" component={Other}/>
            <Route exact path="/module/ledwall" component={LedWall}/>


            <Route path="/admin" component={AdminNavBar}/>
            <Route exact path="/admin" >
                <SideBar/>
                <AdminDashboard/>
            </Route>

            <Route path="/admin/meet" component={AdminMeet}/>

            {/* Signin for local testing */}

            <Route exact path="/test/auth/signin" component={SignIn}></Route>



        </Router>

    );
}

export default App;
