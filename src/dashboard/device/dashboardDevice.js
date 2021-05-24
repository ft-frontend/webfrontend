import React from "react";
import Selector from "./Selector/Selector";
import api from "../../api/api";
import AddDevice from "./addDevice/AddDevice";
import DroneSelectorIcon from "../../res/droneicon.svg";
import LEDWallSelectorIcon from "../../res/ledwallicon.svg";

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
                let img;
                switch (device.name) {
                    case "Drone":
                        img = DroneSelectorIcon;
                        break;
                    case "LEDWall":
                        img = LEDWallSelectorIcon;
                        break;

                }

                this.state.deviceTypeList.push( {
                    link: "/dashboard/device/"+device.UUID,
                    text: device.name,
                    img:img
                });
            })
            this.setState({
                renderList: true
            })
        })
    }

    render() {
        return (<div><AddDevice/>{ this.state.renderList &&<Selector items={this.state.deviceTypeList}/>}</div>)
    }

}

export default dashboardDevice;