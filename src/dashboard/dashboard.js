import React from "react";
import NavBar from "../NavBar/NavBar";
import dashboardStyle from "./dashboard.module.css"
import AppSelector from "./appSelector/appSelector"
class dashboard extends React.Component {

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
                link: "#"
            }
        ]}>

            <AppSelector/>

        </NavBar>


    )
    }

}
export default dashboard;