import React from "react";
import NavBar from "./UI/NavBar/NavBar";
import api from "./api/api";
import UserLoginButtonControl from "./UI/NavBar/UserLoginButtonControl";
import accountSettingsHandler from "./settings/accountSettingsHandler";


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: [],
            renderNavBar: false
        }





    }


    componentDidMount() {
      //  api.checkSession().then(r => { if(r) window.location.replace("/dashboard");})
        api.toggleRedirect(false);
        this.setState({buttons:UserLoginButtonControl(api.isSessionCookieAvailable()),renderNavBar:true})
        api.checkSession().then(r => {
            this.setState({buttons:UserLoginButtonControl(r),renderNavBar:true})
        })
        api.getAccountSettings(false).then(r => {if(r.settings!==undefined)accountSettingsHandler.handlerSettings(r.settings)});

    }
    componentWillUnmount() {
        api.toggleRedirect(true);

    }

    render() {
        return <div><NavBar renderElements={this.state.renderNavBar} links={[
            {
                name: "Home",
                link: "#"
            },
            {
                name: "Software",
                link: "https://www.github.com/ft-cloud"
            }
        ]} buttons={this.state.buttons}/>
        <button onClick={() => {api.setBackendAddress("https://testingapi.arnold-tim.de/api")}}>Testing Backend</button>
        <button onClick={() => {api.setBackendAddress("https://api.arnold-tim.de/api")}}>Production Backend</button>


        </div>;

    }
}

export default MainPage;