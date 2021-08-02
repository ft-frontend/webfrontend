import React from "react";
import NavBar from "../UI/NavBar/NavBar";
import AppSelector from "../UI/appSelector/appSelector";
import ModuleStyle from "./moduleNavBar.module.css"
import api from "../api/api";
import accountSettingsHandler from "../settings/accountSettingsHandler";
import UserLoginButtonControl from "../UI/NavBar/UserLoginButtonControl";

class ModuleNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            buttons: [],
            renderNavBar: false

        };

        UserLoginButtonControl().then(buttons => this.setState({buttons:buttons,renderNavBar: true}))

    }
    componentDidMount() {
        var loc = window.location.pathname;

        api.checkSession().then(r => { if(!r) window.location.href = "/auth/signin?redirect="+loc.substring(0, loc.length) })
        api.getAccountSettings(false).then(r => accountSettingsHandler.handlerSettings(r.settings));

    }

    render() {
        return (

            <NavBar renderElements={this.state.renderNavBar} renderAppSelector links={[
                {
                    name: "<- Zurück zum Dashboard",
                    link: "/dashboard/home"
                }
            ]} buttons={this.state.buttons}>
                <p className={ModuleStyle.moduleHeaderNavBarText}>{this.state.name}</p>

            </NavBar>


        );
    }

}

export default ModuleNavBar;