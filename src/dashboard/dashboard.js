import React from "react";
import NavBar from "../NavBar/NavBar";
import AppSelector from "./appSelector/appSelector";
import api from "../api/api";
import settingsHandler from "../settings/settingsHandler";

class dashboard extends React.Component {
    constructor(props) {
        super(props);
        var loc = window.location.pathname;

        api.checkSession().then(r => { if(!r) window.location.href = "/auth/signin?redirect="+loc.substring(0, loc.length) })
        api.getAccountSettings(false).then(r => settingsHandler.handlerSettings(r.settings));

    }
    componentDidMount() {

    }

    render() {
        return (
            <NavBar links={[
                {
                    name: "Home",
                    link: "/dashboard/home"
                },
                {
                    name: "Einstellungen",
                    link: "/dashboard/settings"
                },
                {
                    name: "Geräte",
                    link: "/dashboard/device"
                }
            ]} buttons={[
                {
                    name: "Ausloggen",
                    link: "/auth/signout"
                }
            ]}>

                <AppSelector/>

            </NavBar>


        );
    }

}

export default dashboard;