import React from "react";
import {withRouter} from "react-router";
import api from "../../api/api";
import Selector from "../Selector";


class DeviceSelect extends React.Component {

    constructor(props) {
        super(props);
        this.deviceType = this.props.match.params.deviceType;

        this.state = {
            deviceList: [],
            renderList: false
        };
    }

    componentDidMount() {
        api.listSpecificUserDevice(this.deviceType).then(r => {
            r.forEach(device => {
                this.state.deviceList.push( {
                    link: "/dashboard/device/"+ this.deviceType+"/"+device.uuid,
                    text: device.name
                });
            })
            this.setState({
                renderList: true
            })
        })
    }

    render() {
        return (<div><h1>{this.deviceType}</h1>{ this.state.renderList &&<Selector items={this.state.deviceList}/>}</div>) ;
    }


}

export default DeviceSelect;