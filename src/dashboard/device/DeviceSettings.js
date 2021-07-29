import React from "react";

import deviceDashboardFontStyle from "./deviceDashboardFont.module.css";
import api from "../../api/api";
import ChangeableTextField from "../../UI/changeableTextField/ChangeableTextField";
import ConfirmButton from "../../UI/confirmButton/ConfirmButton";
import Trash from "../../res/trash.svg";


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
        return (<div>

            {
                this.state.renderEverything ?

                    <div>
                        <ChangeableTextField onNameUpdate={this.deviceNameChange}
                                             className={deviceDashboardFontStyle.deviceDashboardFontCenter}
                                             text={this.state.deviceName}/>
                        <ConfirmButton className={deviceDashboardFontStyle.deleteDeviceButtonDiv}
                                       confirmText={"Möchtest du das Gerät wirklich löschen?"}
                                       confirmAction={this.deleteDevice}><img
                            className={deviceDashboardFontStyle.deleteDeviceButton} src={Trash}
                            alt="Delete"/></ConfirmButton>
                        {
                            this.state.adminAccess &&
                            <h4 className={deviceDashboardFontStyle.adminAccessInfo}>Admin-Zugriff</h4>
                        }
                    </div> :
                    <h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>{this.state.deviceName}</h1>


            }

        </div>);

    }

}

export default DeviceSettings;