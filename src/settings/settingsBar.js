import React from "react";
import HorizontalTabBar from "./HorizontalSettingsTabBar/HorizontalTabBar";
import AccountSettings from "./account/accountSettings";

class SettingsBar extends React.Component {
    render() {
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
                name: "Account Einstellungen"
            }
        ]}/>
    }
}

export default SettingsBar;
