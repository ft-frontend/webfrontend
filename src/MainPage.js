import React from "react";
import NavBar from "./UI/NavBar/NavBar";
import api from "./api/api";
import UserLoginButtonControl from "./UI/NavBar/UserLoginButtonControl";
import accountSettingsHandler from "./settings/accountSettingsHandler";
import VersionNumber from "./UI/Version/VersionNumber";


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: [],
            renderNavBar: false,
            signIn: false
        }





    }


    componentDidMount() {
      //  api.checkSession().then(r => { if(r) window.location.replace("/dashboard");})
        api.toggleRedirect(false);
        this.setState({buttons:UserLoginButtonControl(api.isSessionCookieAvailable()),renderNavBar:true})
        api.checkSession().then(r => {
            this.setState({buttons:UserLoginButtonControl(r),renderNavBar:true,signIn:r})
        })
        api.getAccountSettings(false).then(r => {if(r.settings!==undefined)accountSettingsHandler.handlerSettings(r.settings)});

    }
    componentWillUnmount() {
        api.toggleRedirect(true);

    }

    render() {
        return <><NavBar renderElements={this.state.renderNavBar} links={[
            {
                name: "Home",
                link: "#"
            },
            {
                name: "Software",
                link: "https://www.github.com/ft-cloud"
            }
        ]} buttons={this.state.buttons}/>
            <div style={{marginLeft: "0px"}}>
        <button onClick={() => {api.setBackendAddress("https://testingapi.arnold-tim.de/api")}}>Testing Backend</button>
        <button onClick={() => {api.setBackendAddress("https://api.arnold-tim.de/api")}}>Production Backend</button>
        <button onClick={() => {api.setBackendAddress("http://localhost/api")}}>Local Backend</button>
            <VersionNumber/>

        </div>
            {
                this.state.signIn && <a href="/dashboard">Zum Dashboard</a>
            }
            </>;

    }
}

export default MainPage;