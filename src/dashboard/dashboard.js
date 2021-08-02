import React from "react";
import NavBar from "../UI/NavBar/NavBar";
import AppSelector from "../UI/appSelector/appSelector";
import api from "../api/api";
import accountSettingsHandler from "../settings/accountSettingsHandler";

class dashboard extends React.Component {
    constructor(props) {
        super(props);
        var loc = window.location.pathname;

        api.checkSession().then(r => { if(!r) window.location.href = "/auth/signin?redirect="+loc.substring(0, loc.length) })
        api.getAccountSettings(false).then(r => accountSettingsHandler.handlerSettings(r.settings));

    }
    componentDidMount() {

    }

    render() {
        return (
            <NavBar renderAppSelector links={[
                {
                    name: "Home",
                    link: "/dashboard/home"
                },

                {
                    name: "Geräte",
                    link: "/dashboard/device"
                },

                {
                    name: "Suche (Beta)",
                    link: "/dashboard/search"
                }
            ]} buttons={[
                {
                    name: "Ausloggen",
                    link: "/auth/signout"
                }
            ]}>


            </NavBar>


        );
    }

}

export default dashboard;