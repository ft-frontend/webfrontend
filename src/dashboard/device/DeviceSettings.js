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
        api.listSpecificUserDevice(this.state.deviceTypeUUID).then(result => {
         const device =  result.find(o=> o.uuid===this.state.deviceUUID);
         if(device===undefined) {
             this.setState({
                 deviceName: "Fehler beim Übertragen der Daten!"
             })
             return;
         }else{
             this.setState({
                 deviceName: device.name
             })

             

         }

        })

    }


    render() {
        return (<div><h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>{this.state.deviceName}</h1></div>);

    }


}

export default DeviceSettings;