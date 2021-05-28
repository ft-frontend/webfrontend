import React from "react";
import moduleStyle from "../moduleFont.module.css";
import droneControlStyle from "./droneControlStyle.module.css";

import settingsIcon from "../../res/settings.svg";
import backIcon from "../../res/back.svg";
import api from "../../api/api";
import GoogleMapReact from 'google-map-react';
import SimpelMap from "./SimpelMap";
import MapMarker from "./MapMarker";


class droneControl extends React.Component {
    constructor(props) {
        super(props);
        this.deviceType = "1770efae-9f94-11eb-87e8-0242ac110002";
        this.state = {
            deviceName: "Bitte Warten...",
            renderEverything: false,
            droneLong: 0,
            droneLat: 0,
            renderMap: false
        };

    }

    componentDidMount() {


        api.getUserSpecificDeviceInfo(this.props.match.params.device).then(result => {
            if (result.error) {
                this.setState({
                    deviceName: result.errorMessage
                });
            } else {
                this.setState({
                    deviceName: result.data.content.name,
                    renderEverything: true,
                    adminAccess: result.data.admin !== undefined,

                });

            }

        });

        api.getDeviceStatusInfo(this.props.match.params.device).then(result => {
            if (result.success) {
                let long = 0;
                let lat = 0;
                if (result.data.long) {
                    long = result.data.long;
                }
                if (result.data.lat) {
                    lat = result.data.lat;
                }

               this.setState({
                   droneLong: parseFloat(long.toString()),
                   droneLat: parseFloat(lat.toString())
                });
            }
        });

        this.websocket = api.connectToDroneWebsocket(this.props.match.params.device);
        this.websocket.onopen = () => {

        };
        this.websocket.onmessage = (message) => {
            console.log(message.data);

            const messageParsed = JSON.parse(message.data);
            console.log(messageParsed.long)
            console.log(messageParsed.lat);
            this.setState({
                droneLong: messageParsed.long,
                droneLat: messageParsed.lat
           })
        };


    }

    render() {
        return <div>
            <img onClick={() => window.location.href = "/module/drone/"}
                 className={droneControlStyle.DroneControlBackButton} src={backIcon} alt="Settings"/>
            <img
                onClick={() => window.location.href = "/dashboard/device/" + this.deviceType + "/" + this.props.match.params.device}
                className={droneControlStyle.DroneControlSettingsButton} src={settingsIcon} alt="Settings"/>
            <h1 className={moduleStyle.moduleFontCenter}>{this.state.deviceName} </h1>
            {
                this.state.renderEverything &&
                <div>


                    {
                        this.state.adminAccess && <h4 className={droneControlStyle.adminAccessInfo}>Admin-Zugriff</h4>
                    }
                    <SimpelMap  center={{lat:this.state.droneLat,lng:this.state.droneLong}}>
                        <MapMarker
                            lat={this.state.droneLat}
                            lng={this.state.droneLong}
                        />

                    </SimpelMap>


                </div>

            }

        </div>;
    }

}

export default droneControl;