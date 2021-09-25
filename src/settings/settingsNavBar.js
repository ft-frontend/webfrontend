import React from "react";
import NavBar from "../UI/NavBar/NavBar";
import api from "../api/api";
import accountSettingsHandler from "../settings/accountSettingsHandler";
import UserLoginButtonControl from "../UI/NavBar/UserLoginButtonControl";
import SideBar from "../UI/SideBar/SideBar";
import {withTranslation} from "react-i18next";

class SettingsNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            buttons: [],
            renderNavBar: false

        };


    }

    componentDidMount() {
        const loc = window.location.pathname;
        api.checkSession().then(r => {
            if (!r) window.location.href = "/auth/signin?redirect=" + loc.substring(0, loc.length);

            this.setState({buttons: UserLoginButtonControl(r), renderNavBar: true});
        });

        this.setState({buttons: UserLoginButtonControl(api.isSessionCookieAvailable()), renderNavBar: true});


        api.getAccountSettings(false).then(r => accountSettingsHandler.handlerSettings(r.settings));
    }

    render() {
        const {t} = this.props;
        return (
            <>
                <NavBar renderElements={this.state.renderNavBar} renderAppSelector links={[
                    {
                        name: t('backToDashboard'),
                        link: "/dashboard/"
                    }
                ]} buttons={this.state.buttons}>

                </NavBar>
                <SideBar/>
            </>

        );
    }

}

export default withTranslation()(SettingsNavBar);