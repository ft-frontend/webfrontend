import React, {Component} from 'react';
import api from "../../api/api";
import accountSettingsHandler from "../../settings/accountSettingsHandler";
import NavBar from "../../UI/NavBar/NavBar";
import ModuleStyle from "../moduleNavBar.module.css";
import UserLoginButtonControl from "../../UI/NavBar/UserLoginButtonControl";
import {withTranslation} from "react-i18next";

class DroneNavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttons: [],
            renderNavBar: false
        }

    }


    componentDidMount() {
        api.checkSession().then(r => {
            if (!r) {

            const currentDomain = document.domain.split('.').reverse().splice(0, 2).reverse().join('.');

            window.location.href = `https://login.${currentDomain}/auth/signin?redirect=https://${document.domain}:${window.location.port}${window.location.pathname}`
        }

            this.setState({buttons:UserLoginButtonControl(r),renderNavBar:true})
        })

        this.setState({buttons:UserLoginButtonControl(api.isSessionCookieAvailable()),renderNavBar:true})


        api.getAccountSettings(false).then(r => accountSettingsHandler.handlerSettings(r.settings));



    }

    render() {
        const {t} = this.props;
        return (
                <NavBar renderElements={this.state.renderNavBar} renderAppSelector links={[
                    {
                        name: t('direct_translation_drones'),
                        link: "/module/drone/select"
                    },
                    {
                        name: t('direct_translation_missions'),
                        link: "/module/drone/missions"
                    }
                ]} buttons={this.state.buttons}>
                    <p className={ModuleStyle.moduleHeaderNavBarText}>Quadrocopter</p>

                </NavBar>
        );
    }
}

export default withTranslation()(DroneNavBar);