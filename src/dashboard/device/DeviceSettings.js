import React from "react";

import deviceDashboardFontStyle from "./deviceDashboardFont.module.css";
import api from "../../api/api";


class DeviceSettings extends React.Component {


    constructor(props) {
        super(props);
        this.state ={
            deviceUUID: this.props.match.params.device,
            deviceTypeUUID: this.props.match.params.deviceType,
            deviceName: "Bitte Warten..."
        };
    }

    componentDidMount() {
        api.getUserSpecificDeviceInfo(this.state.deviceUUID).then(result => {
            console.log(result);
            if(result.error) {
                this.setState({
                    deviceName: result.errorMessage
                })
                return;
            }else{
                this.setState({
                    deviceName: result.data.name
                })
            }


        })

    }


    render() {
        return (<div><h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>{this.state.deviceName}</h1></div>);

    }


}

export default DeviceSettings;