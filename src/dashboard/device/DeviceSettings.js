import React from "react";

import deviceDashboardFontStyle from "./deviceDashboardFont.module.css";
import api from "../../api/api";
import ChangeableTextField from "../../changeableTextField/ChangeableTextField";


class DeviceSettings extends React.Component {


    constructor(props) {
        super(props);
        this.state ={
            deviceUUID: this.props.match.params.device,
            deviceTypeUUID: this.props.match.params.deviceType,
            deviceName: "Bitte Warten...",
            renderEverything: false
        };
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




    render() {
        return (<div>

            {
                this.state.renderEverything?

                    <div>
                        <ChangeableTextField className={deviceDashboardFontStyle.deviceDashboardFontCenter} deviceUUID={this.state.deviceUUID} text={this.state.deviceName}/>
                    </div>:
                        <h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>{this.state.deviceName}</h1>




            }

        </div>);

    }


}

export default DeviceSettings;