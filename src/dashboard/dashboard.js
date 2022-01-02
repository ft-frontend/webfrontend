import React from "react";
import NavBar from "../UI/NavBar/NavBar";
import api from "../api/api";
import accountSettingsHandler from "../settings/accountSettingsHandler";
import UserLoginButtonControl from "../UI/NavBar/UserLoginButtonControl";
import {withTranslation} from "react-i18next";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);


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
                const currentDomain = document.domain.split('.').reverse().splice(0,2).reverse().join('.');

                window.location.href=`https://login.${currentDomain}/auth/signin?redirect=https://${document.domain}:${window.location.port}${window.location.pathname}`

            }
        })

        api.getAccountSettings(false).then(r => accountSettingsHandler.handlerSettings(r.settings));

    }

    render() {
        const {t} = this.props;
        return (

            <NavBar  renderElements={this.state.renderNavBar} renderAppSelector links={[
                {
                    name: t('direct_translation_overview'),
                    link: "/dashboard"
                },

                {
                    name: t('direct_translation_devices'),
                    link: "/dashboard/device"
                },

                {
                    name: t('direct_translation_search'),
                    link: "/dashboard/search"
                }
            ]} buttons={this.state.buttons}>

            </NavBar>



        );
    }

}

export default withTranslation()(Dashboard);