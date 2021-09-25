import React, {Component} from 'react';
import SideBarStyle from "./SideBare.module.css";
import HomeSelectorIcon from "../../res/home.svg";
import Flash from "../../res/flash.svg";
import LEDWallSelectorIcon from "../../res/item/ledwallicon.svg";
import DroneSelectorIcon from "../../res/item/droneicon.svg";
import SettingsSelectorIcon from "../../res/settings.svg";
import OtherSelectorIcon from "../../res/other.svg";
import DashboardIcon from "../../res/dashboard.svg";
import {withTranslation} from "react-i18next";

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.redirect = this.redirect.bind(this);
        this.state = {
            locationIndex: 1
        }


    }


    componentDidMount() {
        let tempVar = 0;
        const paths = [ "/dashboard", "placeholder1233", "/module/ledwall", "/module/drone", "/module/other", "/settings"];
        for (let i in paths) {
            if (window.location.pathname.startsWith(paths[i])) {
                tempVar = parseInt(i)+1;
            }
        }
        this.setState({
            locationIndex: tempVar
        })
    }

    redirect(url, index) {
        window.localStorage.setItem("current_location", url);
        window.localStorage.setItem("current_location_sidebar_index", index);
        window.location.href = url;
    }


    render() {
        const {t} = this.props;
        return (
            <div className={SideBarStyle.SideBarContainer}>
                <div className={SideBarStyle.SideBarItemContainer}>

                    <div
                        className={SideBarStyle.SideBarItem + " " + (this.state.locationIndex === 0 ? SideBarStyle.SideBarItemActive : "")}
                        onClick={() => this.redirect("/", 0)}>
                        <img alt="" className={SideBarStyle.SideBarItemImage} src={HomeSelectorIcon}/>
                        <p className={SideBarStyle.SideBarItemText}>{t('direct_translation_home')}</p>
                    </div>

                    <div
                        className={SideBarStyle.SideBarItem + " " + (this.state.locationIndex === 1 ? SideBarStyle.SideBarItemActive : "")}
                        onClick={() => this.redirect("/dashboard", 1)}>
                        <img alt="" className={SideBarStyle.SideBarItemImage} src={DashboardIcon}/>
                        <p className={SideBarStyle.SideBarItemText}>{t('direct_translation_dashboard')}</p>
                    </div>

                    <div
                        className={SideBarStyle.SideBarItem + " " + (this.state.locationIndex === 2 ? SideBarStyle.SideBarItemActive : "")}
                        onClick={() => this.redirect("#", 2)}>
                        <img alt="" className={SideBarStyle.SideBarItemImage} src={Flash}/>
                        <p className={SideBarStyle.SideBarItemText}>{t('direct_translation_quickactions')}</p>
                    </div>

                    <div
                        className={SideBarStyle.SideBarItem + " " + (this.state.locationIndex === 3 ? SideBarStyle.SideBarItemActive : "")}
                        onClick={() => this.redirect("/module/ledwall", 3)}>
                        <img alt="" className={SideBarStyle.SideBarItemImage} src={LEDWallSelectorIcon}/>
                        <p className={SideBarStyle.SideBarItemText}>{t('direct_translation_ledwall')}</p>
                    </div>

                    <div
                        className={SideBarStyle.SideBarItem + " " + (this.state.locationIndex === 4 ? SideBarStyle.SideBarItemActive : "")}
                        onClick={() => this.redirect("/module/drone", 4)}>
                        <img alt="" className={SideBarStyle.SideBarItemImage} src={DroneSelectorIcon}/>
                        <p className={SideBarStyle.SideBarItemText}>{t('direct_translation_quadrocopter')}</p>
                    </div>
                    <div
                        className={SideBarStyle.SideBarItem + " " + (this.state.locationIndex === 5 ? SideBarStyle.SideBarItemActive : "")}
                        onClick={() => this.redirect("/module/other", 5)}>
                        <img alt="" className={SideBarStyle.SideBarItemImage} src={OtherSelectorIcon}/>
                        <p className={SideBarStyle.SideBarItemText}>{t('direct_translation_other')}</p>
                    </div>

                    <div
                        className={SideBarStyle.SideBarItem + " " + (this.state.locationIndex === 6 ? SideBarStyle.SideBarItemActive : "")}
                        onClick={() => this.redirect("/settings", 6)}>
                        <img alt="" className={SideBarStyle.SideBarItemImage} src={SettingsSelectorIcon}/>
                        <p className={SideBarStyle.SideBarItemText}>{t('direct_translation_settings')}</p>
                    </div>

                </div>
            </div>
        );
    }
}

export default withTranslation()(SideBar);