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
            <ApplistItem redirect="/dashboard" iconsrc={HomeSelectorIcon}>HOME</ApplistItem>,
            <ApplistItem redirect="/module/ledwall" iconsrc={LEDWallSelectorIcon}>LEDWALL</ApplistItem>,
            <ApplistItem redirect="/module/drone" iconsrc={DroneSelectorIcon}>DRONE</ApplistItem>,
            <ApplistItem redirect="/module/other" iconsrc={OtherSelectorIcon}>SONSTIGES</ApplistItem>,
            <ApplistItem redirect="#" iconsrc={SettingsSelectorIcon}>EINSTELLUNGEN</ApplistItem>
        ];




    }

    componentDidMount() {
        const obj = this;

        $(document).on('click', function (e) {
            if ($(e.target).closest("."+appSelectorStyle.appSelectionBox).length === 0&&$(e.target).closest("."+appSelectorStyle.appSelectionToggleButton).length === 0) {
                obj.setState({
                    open: false
                })

            }
        });
    }


    toggleSelector() {
        this.setState({open: !this.state.open});
    }

    render() {


        return (
            <div>
                <a className={appSelectorStyle.appSelectionToggleButton} onClick={this.toggleSelector}>
                    <img src={AppSelectorIcon} width={45} height={45}/>
                </a>
                {
                    this.state.open &&

                    <div className={appSelectorStyle.appSelectionBox}>{this.items}</div>


                }
            </div>
        );
    }

}

export default appSelector;