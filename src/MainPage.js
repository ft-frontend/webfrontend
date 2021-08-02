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

        UserLoginButtonControl().then(buttons => this.setState({buttons:buttons,renderNavBar:true}))

    }


    componentDidMount() {
      //  api.checkSession().then(r => { if(r) window.location.replace("/dashboard");})
        api.getAccountSettings(false).then(r => accountSettingsHandler.handlerSettings(r.settings));

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
        <button onClick={() => {api.setBackendAddress("https://testingapi.arnold-tim.de")}}>Testing Backend</button>
        <button onClick={() => {api.setBackendAddress("https://api.arnold-tim.de")}}>Production Backend</button>


        </div>;

    }
}

export default MainPage;