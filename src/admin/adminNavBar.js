import React from "react";
import NavBar from "../UI/NavBar/NavBar";
import ModuleStyle from "./adminNavBar.module.css"
import api from "../api/api";
import accountSettingsHandler from "../settings/accountSettingsHandler";
import UserLoginButtonControl from "../UI/NavBar/UserLoginButtonControl";

class AdminNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            buttons: [],
            renderNavBar: false

        };


    }
    componentDidMount() {
        const loc = window.location.pathname;
        api.checkSession().then(r => { if(!r) window.location.href = "/auth/signin?redirect="+loc.substring(0, loc.length)
            if(r) {
                api.isUserAdmin().then(r => {
                    console.log(r);
                    if(!r.result) window.location.href = "/";
                })
            }
        })




        this.setState({buttons:UserLoginButtonControl(api.isSessionCookieAvailable()),renderNavBar:true})




        api.getAccountSettings(false).then(r => accountSettingsHandler.handlerSettings(r.settings));

    }

    render() {
        return (

            <NavBar renderElements={this.state.renderNavBar} renderAppSelector links={[
                {
                    name: "Home",
                    link: "/admin/"
                },
                {
                    name: "Meeting",
                    link: "/admin/meet"
                }
            ]} buttons={this.state.buttons}>
                <p className={ModuleStyle.moduleHeaderNavBarText}>Admin</p>

            </NavBar>


        );
    }

}

export default AdminNavBar;