import React from "react";
import NavBar from "../UI/NavBar/NavBar";
import AppSelector from "../UI/appSelector/appSelector";
import api from "../api/api";
import accountSettingsHandler from "../settings/accountSettingsHandler";
import UserLoginButtonControl from "../UI/NavBar/UserLoginButtonControl";

class dashboard extends React.Component {
    constructor(props) {
        super(props);
        var loc = window.location.pathname;


        this.state = {
            buttons: [],
            renderNavBar: false
        }

        UserLoginButtonControl().then(buttons => this.setState({buttons:buttons,renderNavBar:true}))

        api.checkSession().then(r => { if(!r) window.location.href = "/auth/signin?redirect="+loc.substring(0, loc.length) })
        api.getAccountSettings(false).then(r => accountSettingsHandler.handlerSettings(r.settings));

    }
    componentDidMount() {

    }

    render() {
        return (

            <NavBar  renderElements={this.state.renderNavBar} renderAppSelector links={[
                {
                    name: "Übersicht",
                    link: "/dashboard/home"
                },

                {
                    name: "Geräte",
                    link: "/dashboard/device"
                },

                {
                    name: "Suche",
                    link: "/dashboard/search"
                }
            ]} buttons={this.state.buttons}>


            </NavBar>


        );
    }

}

export default dashboard;