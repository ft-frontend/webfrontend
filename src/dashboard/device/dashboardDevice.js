import React from "react";
import Selector from "./Selector/Selector";
import api from "../../api/api";
import AddDevice from "./addDevice/AddDevice";

import deviceDashboardFontStyle from "./deviceDashboardFont.module.css"
import DeviceImageDrawer from "./DeviceImageDrawer";

class dashboardDevice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deviceTypeList: [],
            renderList: false
        };
    }
    componentDidMount() {
        api.listAvailableDevices().then(r => {
            r.forEach(device => {


                this.state.deviceTypeList.push( {
                    link: "/dashboard/device/"+device.UUID,
                    text: device.name,
                    img:DeviceImageDrawer(device.name)
                });
            })
            this.setState({
                renderList: true
            })
        })
    }

    render() {
        return (<div><h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>Bitte Gerät wählen:</h1><AddDevice/>{ this.state.renderList &&<Selector items={this.state.deviceTypeList}/>}</div>)
    }

}

export default dashboardDevice;