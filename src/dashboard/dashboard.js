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
            renderNavBar: false,
        }




    }
    componentDidMount() {
        this.setState({buttons:UserLoginButtonControl(api.isSessionCookieAvailable()),renderNavBar:true})
        api.checkSession().then(r => {
            this.setState({buttons:UserLoginButtonControl(r),renderNavBar:true})
            if(!r) {
                window.location.href = "/auth/signin?redirect=" + window.location.pathname;

            }
        })

        api.getAccountSettings(false).then(r => accountSettingsHandler.handlerSettings(r.settings));

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