import React from "react";
import NavBar from "../NavBar/NavBar";

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

        </NavBar>


    )
    }

}
export default dashboard;