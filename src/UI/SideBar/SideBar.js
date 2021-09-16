import React, {Component} from 'react';
import SideBarStyle from "./SideBare.module.css";
import HomeSelectorIcon from "../../res/home.svg";
import Flash from "../../res/flash.svg";
import LEDWallSelectorIcon from "../../res/item/ledwallicon.svg";
import DroneSelectorIcon from "../../res/item/droneicon.svg";
import SettingsSelectorIcon from "../../res/settings.svg";
import OtherSelectorIcon from "../../res/other.svg";
import DashboardIcon from "../../res/dashboard.svg";

class SideBar extends Component {
    render() {
        return (
            <div className={SideBarStyle.SideBarContainer}>
                <div className={SideBarStyle.SideBarItemContainer}>

                    <div className={SideBarStyle.SideBarItem} onClick={()=>window.location.href="/"}>
                        <img alt="" className={SideBarStyle.SideBarItemImage} src={HomeSelectorIcon}/>
                        <p className={SideBarStyle.SideBarItemText}>Home</p>
                    </div>

                    <div className={SideBarStyle.SideBarItem} onClick={()=>window.location.href="/dashboard"}>
                        <img alt="" className={SideBarStyle.SideBarItemImage} src={DashboardIcon}/>
                        <p className={SideBarStyle.SideBarItemText}>Dashboard</p>
                    </div>

                    <div className={SideBarStyle.SideBarItem} onClick={()=>window.location.href="#"}>
                        <img alt="" className={SideBarStyle.SideBarItemImage} src={Flash}/>
                        <p className={SideBarStyle.SideBarItemText}>Quick-Actions</p>
                    </div>

                    <div className={SideBarStyle.SideBarItem} onClick={()=>window.location.href="/module/ledwall"}>
                        <img alt="" className={SideBarStyle.SideBarItemImage} src={LEDWallSelectorIcon}/>
                        <p className={SideBarStyle.SideBarItemText}>LEDWall</p>
                    </div>

                    <div className={SideBarStyle.SideBarItem} onClick={()=>window.location.href="/module/drone"}>
                        <img alt="" className={SideBarStyle.SideBarItemImage} src={DroneSelectorIcon}/>
                        <p className={SideBarStyle.SideBarItemText}>Quadrocopter</p>
                    </div>
                    <div className={SideBarStyle.SideBarItem} onClick={()=>window.location.href="/module/other"}>
                        <img alt="" className={SideBarStyle.SideBarItemImage} src={OtherSelectorIcon}/>
                        <p className={SideBarStyle.SideBarItemText}>Other</p>
                    </div>

                    <div className={SideBarStyle.SideBarItem} onClick={()=>window.location.href="/dashboard/settings"}>
                        <img alt="" className={SideBarStyle.SideBarItemImage} src={SettingsSelectorIcon}/>
                        <p className={SideBarStyle.SideBarItemText}>Einstellungen</p>
                    </div>

                </div>
            </div>
        );
    }
}

export default SideBar;