import React from "react";
import NavBar from "../UI/NavBar/NavBar";
import AppSelector from "../UI/appSelector/appSelector";
import ModuleStyle from "./moduleNavBar.module.css"
import api from "../api/api";
import accountSettingsHandler from "../settings/accountSettingsHandler";

class ModuleNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        };

    }
    componentDidMount() {
        var loc = window.location.pathname;

        api.checkSession().then(r => { if(!r) window.location.href = "/auth/signin?redirect="+loc.substring(0, loc.length) })
        api.getAccountSettings(false).then(r => accountSettingsHandler.handlerSettings(r.settings));

    }

    render() {
        return (
            <NavBar renderAppSelector links={[
                {
                    name: "<- Zurück zum Dashboard",
                    link: "/dashboard/home"
                }
            ]} buttons={[
                {
                    name: "Ausloggen",
                    link: "/auth/signout"
                }
            ]}>
                <p className={ModuleStyle.moduleHeaderNavBarText}>{this.state.name}</p>

            </NavBar>


        );
    }

}

export default ModuleNavBar;