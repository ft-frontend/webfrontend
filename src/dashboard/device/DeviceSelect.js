import React from "react";
import api from "../../api/api";
import Selector from "./Selector/Selector";
import deviceDashboardFontStyle from "./deviceDashboardFont.module.css"
import DeviceImageDrawer from "./DeviceImageDrawer";

class DeviceSelect extends React.Component {

    constructor(props) {
        super(props);
        this.deviceType = this.props.match.params.deviceType;

        this.state = {
            deviceList: [],
            renderList: false,
            deviceType: "Bitte Warten..."
        };
    }

    componentDidMount() {
        api.listSpecificUserDevice(this.deviceType).then(r => {
        api.listAvailableDevices().then(devices => {
            const deviceTypeName = devices.find(o => o.UUID === this.deviceType);
            if(deviceTypeName!==undefined) {
                this.setState({
                    deviceType: deviceTypeName.name
                })
            }else{
                this.setState({
                    deviceType: "Fehler beim Übertragen der Daten!"
                })
                return;
            }


            r.forEach(device => {
                this.state.deviceList.push( {
                    link: "/dashboard/device/"+ this.deviceType+"/"+device.uuid,
                    text: device.name,
                    img: DeviceImageDrawer(deviceTypeName.name),
                    costumeClass: device.online?deviceDashboardFontStyle.onlineDevice:deviceDashboardFontStyle.offlineDevice

                });
            })
            this.setState({
                renderList: true
            })
        })
        })
    }

    render() {
        return (<div><h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>{this.state.deviceType}</h1>{ this.state.renderList &&<Selector items={this.state.deviceList}/>}</div>) ;
    }


}

export default DeviceSelect;