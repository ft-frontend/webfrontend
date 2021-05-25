import React from "react";
import NavBar from "../NavBar/NavBar";
import AppSelector from "../dashboard/appSelector/appSelector";
import ModuleStyle from "./moduleNavBar.module.css"
import api from "../api/api";

class ModuleNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name
        };
        api.checkSession().then(r => { if(!r) window.location.replace("/auth/signin");})

    }

    render() {
        return (
            <NavBar links={[
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
                <AppSelector/>

            </NavBar>


        );
    }

}

export default ModuleNavBar;