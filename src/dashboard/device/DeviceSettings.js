import React from "react";

import deviceDashboardFontStyle from "./deviceDashboardFont.module.css";
import api from "../../api/api";
import ChangeableTextField from "../../UI/changeableTextField/ChangeableTextField";
import ConfirmButton from "../../UI/confirmButton/ConfirmButton";
import Trash from "../../res/trash.svg";
import {withTranslation} from "react-i18next";
import DeviceStatusTable from "./deviceState/DeviceStatusTable";
import DeviceSettingsTable from "./deviceState/DeviceSettingsTable";


class DeviceSettings extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            deviceUUID: this.props.match.params.device,
            deviceTypeUUID: this.props.match.params.deviceType,
            deviceName: "Bitte Warten...",
            renderEverything: false
        };
        this.deleteDevice = this.deleteDevice.bind(this);
        this.deviceNameChange = this.deviceNameChange.bind(this);
    }

    componentDidMount() {
        api.getUserSpecificDeviceInfo(this.state.deviceUUID).then(result => {
            console.log(result);
            if (result.error) {
                this.setState({
                    deviceName: result.errorMessage
                });
            } else {
                this.setState({
                    deviceName: result.data.content.name,
                    renderEverything: true,
                    adminAccess: (result.data.admin !== undefined)
                });
            }


        });

    }

    deleteDevice() {
        api.deleteDevice(this.state.deviceUUID).then(r => {
            if (r.success) {
                window.location.href = "/dashboard/device/";
            }
        });
    }

    deviceNameChange(text) {

        if (text.length > 2&&text.length<23) {
            api.updateDeviceName(this.state.deviceUUID, text).then((result) => {
                return result.success;
            });
        }
    }


    render() {
        const {t} = this.props;
        return (<div>

            {
                this.state.renderEverything ?

                    <div>
                        <div  className={deviceDashboardFontStyle.deviceDashboardFontCenter}>
                        <ChangeableTextField onNameUpdate={this.deviceNameChange}

                                             text={this.state.deviceName}/>
                        </div>
                        <ConfirmButton className={deviceDashboardFontStyle.deleteDeviceButtonDiv}
                                       confirmText={t('deleteConfirmation')}
                                       confirmAction={this.deleteDevice}><img
                            className={deviceDashboardFontStyle.deleteDeviceButton} src={Trash}
                            alt="Delete"/></ConfirmButton>
                        {
                            this.state.adminAccess &&
                            <h4 className={deviceDashboardFontStyle.adminAccessInfo}>Admin-Zugriff</h4>
                        }


                        <DeviceStatusTable deviceTypeUUID={this.state.deviceTypeUUID} deviceUUID={this.state.deviceUUID}/>
                        <DeviceSettingsTable deviceTypeUUID={this.state.deviceTypeUUID} deviceUUID={this.state.deviceUUID}/>

                    </div> :
                    <h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>{this.state.deviceName}</h1>




            }

        </div>);

    }

}

export default withTranslation()(DeviceSettings);