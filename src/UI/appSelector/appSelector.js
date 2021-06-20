import React from "react";
import AppSelectorIcon from "../../res/appSelector.svg";
import DroneSelectorIcon from "../../res/droneicon.svg";
import LEDWallSelectorIcon from "../../res/ledwallicon.svg";
import HomeSelectorIcon from "../../res/home.svg";
import SettingsSelectorIcon from "../../res/settings.svg";
import OtherSelectorIcon from "../../res/other.svg";

import appSelectorStyle from "./appSelector.module.css";
import ApplistItem from "./AppListItem";

import $ from "jquery";

class appSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.toggleSelector = this.toggleSelector.bind(this);
        this.items = [
            <ApplistItem key="1" redirect="/dashboard" iconsrc={HomeSelectorIcon}>HOME</ApplistItem>,
            <ApplistItem key="2" redirect="/module/ledwall" iconsrc={LEDWallSelectorIcon}>LEDWALL</ApplistItem>,
            <ApplistItem key="3" redirect="/module/drone" iconsrc={DroneSelectorIcon}>DRONE</ApplistItem>,
            <ApplistItem key="4" redirect="/module/other" iconsrc={OtherSelectorIcon}>SONSTIGES</ApplistItem>,
            <ApplistItem key="5" redirect="/dashboard/settings/account" iconsrc={SettingsSelectorIcon}>EINSTELLUNGEN</ApplistItem>
        ];




    }

    componentDidMount() {
        const obj = this;
        this.handler = function (e) {
            if ($(e.target).closest("."+appSelectorStyle.appSelectionBox).length === 0&&$(e.target).closest("."+appSelectorStyle.appSelectionToggleButton).length === 0) {
                obj.setState({
                    open: false
                })

            }
        };
        $(document).on('click',  this.handler);
    }
    componentWillUnmount() {
        $(document).off('click',  this.handler);

    }



    toggleSelector() {
        this.setState({open: !this.state.open});
    }

    render() {


        return (
            <div>
                <p className={appSelectorStyle.appSelectionToggleButton} onClick={this.toggleSelector}>
                    <img alt="" src={AppSelectorIcon} width={45} height={45}/>
                </p>
                {
                    this.state.open &&

                    <div className={appSelectorStyle.appSelectionBox}><div className={appSelectorStyle.appSelectionBoxItemHolder}>{this.items}</div></div>


                }
            </div>
        );
    }
}

export default appSelector;