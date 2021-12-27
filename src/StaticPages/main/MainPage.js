import React from "react";
import NavBar from "../../UI/NavBar/NavBar";
import api from "../../api/api";
import UserLoginButtonControl from "../../UI/NavBar/UserLoginButtonControl";
import accountSettingsHandler from "../../settings/accountSettingsHandler";
import VersionNumber from "../../UI/Version/VersionNumber";
import SideBar from "../../UI/SideBar/SideBar";
import { withTranslation } from 'react-i18next';
import i18next from "i18next";
import StaticPageUi from "../StaticPageUI";

class MainPage extends React.Component {



    render() {
        return <>
            <StaticPageUi renderSideBar={true}/>

            </>;

    }
}

export default withTranslation()(MainPage);