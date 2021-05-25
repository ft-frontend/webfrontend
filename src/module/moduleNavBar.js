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
        var loc = window.location.pathname;

        api.checkSession().then(r => { if(!r) window.location.href = "/auth/signin?redirect="+loc.substring(0, loc.length) })

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