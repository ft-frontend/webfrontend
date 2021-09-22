import React from "react";
import HorizontalTabBar from "./HorizontalSettingsTabBar/HorizontalTabBar";
import AccountSettings from "./account/accountSettings";
import SideBar from "../UI/SideBar/SideBar";

class SettingsBar extends React.Component {
    render() {
        return<HorizontalTabBar tabContent={[
            {
                content: <AccountSettings/>,
                name: "Account Einstellungen"
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
                content: <></>,
                name: "Test"
            }
        ]}/>
    }
}

export default SettingsBar;
