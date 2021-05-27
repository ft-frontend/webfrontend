import React from "react";

import deviceDashboardFontStyle from "./deviceDashboardFont.module.css";
import api from "../../api/api";
import ChangeableTextField from "../../changeableTextField/ChangeableTextField";
import ConfirmButton from "../confirmButton/ConfirmButton";
import Trash from "../../res/trash.svg"

class DeviceSettings extends React.Component {


    constructor(props) {
        super(props);
        this.state ={
            deviceUUID: this.props.match.params.device,
            deviceTypeUUID: this.props.match.params.deviceType,
            deviceName: "Bitte Warten...",
            renderEverything: false
        };
        this.deleteDevice = this.deleteDevice.bind(this);
    }

    componentDidMount() {
        api.getUserSpecificDeviceInfo(this.state.deviceUUID).then(result => {
            if(result.error) {
                this.setState({
                    deviceName: result.errorMessage
                })
            }else{
                this.setState({
                    deviceName: result.data.name,
                    renderEverything: true
                })
            }


        })

    }

    deleteDevice() {
    api.deleteDevice(this.state.deviceUUID).then(r => {
        if(r.success) {
            window.location.href="/dashboard/device/";
        }
    })
    }




    render() {
        return (<div>

            {
                this.state.renderEverything?

                    <div>
                        <ChangeableTextField className={deviceDashboardFontStyle.deviceDashboardFontCenter} deviceUUID={this.state.deviceUUID} text={this.state.deviceName}/>
                        <ConfirmButton className={deviceDashboardFontStyle.deleteDeviceButtonDiv}  confirmText={"Möchtest du das Gerät wirklich löschen?"} confirmAction={this.deleteDevice}><img  className={deviceDashboardFontStyle.deleteDeviceButton} src={Trash} alt="Delete"/></ConfirmButton>
                    </div>:
                        <h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>{this.state.deviceName}</h1>




            }

        </div>);

    }

}

export default DeviceSettings;