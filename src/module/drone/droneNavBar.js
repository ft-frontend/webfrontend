import React, {Component} from 'react';
import api from "../../api/api";
import accountSettingsHandler from "../../settings/accountSettingsHandler";
import NavBar from "../../UI/NavBar/NavBar";
import ModuleStyle from "../moduleNavBar.module.css";
import AppSelector from "../../UI/appSelector/appSelector";

class DroneNavBar extends Component {

    componentDidMount() {
        var loc = window.location.pathname;

        api.checkSession().then(r => { if(!r) window.location.href = "/auth/signin?redirect="+loc.substring(0, loc.length) })
        api.getAccountSettings(false).then(r => accountSettingsHandler.handlerSettings(r.settings));

    }

    render() {
        return (
            <div>
                <NavBar links={[
                    {
                        name: "Drohnen",
                        link: "/module/drone/select"
                    },
                    {
                        name: "Missions",
                        link: "/module/drone/missions"
                    }
                ]} buttons={[
                    {
                        name: "Ausloggen",
                        link: "/auth/signout"
                    }
                ]}>
                    <p className={ModuleStyle.moduleHeaderNavBarText}>Quadrocopter</p>

                </NavBar>
            </div>
        );
    }
}

export default DroneNavBar;