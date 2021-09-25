import React from "react";
import HorizontalTabBar from "./HorizontalSettingsTabBar/HorizontalTabBar";
import AccountSettings from "./account/accountSettings";
import {withTranslation} from "react-i18next";

class SettingsBar extends React.Component {
    render() {
        const {t} = this.props;
        return<HorizontalTabBar tabContent={[
            {
                content: <></>,
                name: "Test"
            },{
                content: <></>,
                name: "Test"
            },{
                content: <></>,
                name: "Test"
            },{
                content: <></>,
                name: "Test"
            },{
                content: <AccountSettings/>,
                name: t('accountSettings')
            }
        ]}/>
    }
}

export default withTranslation()(SettingsBar);
