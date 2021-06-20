import React from "react";
import Selector from "../../UI/Selector/Selector";
import api from "../../api/api";
import DeviceImageDrawer from "../../dashboard/device/DeviceImageDrawer";

class drone extends React.Component {

    constructor(props) {
        super(props);
        this.deviceType = "1770efae-9f94-11eb-87e8-0242ac110002"
        this.state = {
            deviceList: [],
            renderList: false
        };
    }

    componentDidMount() {
        api.listSpecificUserDevice(this.deviceType).then(r => {

                r.forEach(device => {
                    this.state.deviceList.push( {
                        link: "/module/drone/"+device.uuid,
                        text: device.name,
                        img: DeviceImageDrawer("Drone")

                    });
                })
                this.setState({
                    renderList: true
                })

        })
    }

    render() {
        return <div>

            {this.state.renderList && <Selector items={this.state.deviceList}/>}
        </div>;
    }

}

export default drone;