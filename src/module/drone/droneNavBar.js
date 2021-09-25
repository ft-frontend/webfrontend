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
        const loc = window.location.pathname;
        api.checkSession().then(r => { if(!r) window.location.href = "/auth/signin?redirect="+loc.substring(0, loc.length)

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