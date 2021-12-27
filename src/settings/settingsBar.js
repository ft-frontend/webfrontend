import React from "react";
import HorizontalTabBar from "./HorizontalSettingsTabBar/HorizontalTabBar";
import AccountSettings from "./account/accountSettings";
import {withTranslation} from "react-i18next";
import AuthenticationSettings from "./authentication/AuthenticationSettings";

class SettingsBar extends React.Component {
    render() {
        const {t} = this.props;
        return<HorizontalTabBar tabContent={[
            {
                content: <></>,
                name: "Informationen"
            },{
                content: <></>,
                name: "Zugriff"
            },{
                content: <></>,
                name: "Abonnement"
            },{
                content: <AuthenticationSettings></AuthenticationSettings>,
                name: t('direct_translation_authentication')
            },{
                content: <AccountSettings/>,
                name: t('accountSettings')
            }
        ]}/>
    }
}

export default withTranslation()(SettingsBar);
