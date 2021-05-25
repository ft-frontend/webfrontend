import React from "react";
import NavBar from "../NavBar/NavBar";
import AppSelector from "./appSelector/appSelector";
import api from "../api/api";

class dashboard extends React.Component {
    constructor(props) {
        super(props);
        api.checkSession().then(r => { if(!r) window.location.replace("/auth/signin");})

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