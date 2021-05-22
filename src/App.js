import './App.css';
import {BrowserRouter as Router, Route,Redirect} from "react-router-dom";
import MainPage from "./MainPage";
import dashboard from "./dashboard/dashboard";
import dashboardHome from "./dashboard/dashboardHome";
import dashboardSettings from "./dashboard/dashboardSettings";
import dashboardDevice from "./dashboard/dashboardDevice";
import signIn from "./auth/signIn";
import signUp from "./auth/signUp";
import signOut from "./auth/signOut";
import ledwall from "./module/ledwall/ledwall";
import drone from "./module/drone/drone";

function App() {




    return (
        <Router>
            <Route exact path="/" >
                <MainPage/>

            </Route>

          <Route path="/dashboard" component={dashboard}/>
          <Route path="/dashboard/home" component={dashboardHome}/>
          <Route path="/dashboard/settings" component={dashboardSettings}/>
          <Route path="/dashboard/device" component={dashboardDevice}/>

          <Route path="/module/ledwall" component={ledwall}/>

          <Route path="/module/drone" component={drone}/>

          <Route exact path="/module" component={drone}>

              <Redirect to="/" />

          </Route>


            <Route exact path="/auth/signIn" component={signIn}/>
            <Route exact path="/auth/signUp" component={signUp}/>
            <Route exact path="/auth/signOut" component={signOut}/>



        </Router>
    );
}

export default App;
