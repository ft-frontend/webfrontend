import React from "react";
import moduleStyle from "../moduleFont.module.css";
import droneControlStyle from "./droneControlStyle.module.css";

import settingsIcon from "../../res/settings.svg";
import backIcon from "../../res/back.svg";
import api from "../../api/api";
import SimpelMap from "./SimpelMap";
import MapMarker from "./MapMarker";
import SetPIDValue from "./SetPIDValue";
import drone from "./drone";
import DroneFlightParams from "./droneFlightParams";


class droneControl extends React.Component {
    constructor(props) {
        super(props);
        this.deviceType = "1770efae-9f94-11eb-87e8-0242ac110002";
        this.state = {
            deviceName: "Bitte Warten...",
            renderEverything: false,
            droneLong: 49,
            droneLat: 0,
            renderMap: false,
            showFlightSettings: false
        };

        this.switchViewMode = this.switchViewMode.bind(this);

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
                    droneOnline: result.data.content.online?"Online":"Offline",
                    renderEverything: true,
                    adminAccess: result.data.admin !== undefined,

                });

            }

        });

        api.getDeviceStatusInfo(this.props.match.params.device).then(result => {
            if (result.success) {
                let long = "?";
                let lat = "?";
                let alt = "?";
                let voltage = "?";
                let percentage = "?";
                let connectedSatellites = "?"
                let height = "?"

                if (result.data.long) {
                    long = parseFloat(result.data.long.toString())
                }
                if (result.data.lat) {
                   lat = parseFloat(result.data.lat.toString())

                }if (result.data.alt) {
                    alt = parseFloat(result.data.alt.toString())

                }

                if (result.data.batteryVoltage) {
                    voltage = parseFloat(result.data.batteryVoltage)
                }
                if (result.data.batteryPercentage) {
                   percentage = parseFloat( result.data.batteryPercentage)
                }
                if (result.data.height) {
                    height = parseFloat( result.data.height)
                }

                if(result.data.connectedSatellites) {
                    connectedSatellites = parseFloat( result.data.connectedSatellites)
                }

                this.setState({
                   droneLong: long,
                   droneLat: lat,
                   droneAlt: alt,
                   droneBatteryVoltage: voltage,
                   droneBatteryPercentage: percentage,
                    droneConnectedSatellites: connectedSatellites,
                    droneHeight: height,

                   renderMap: true
                });
            }
            console.log(this.state)

        });

        this.websocket = api.connectToDroneWebsocket(this.props.match.params.device);
        this.websocket.onopen = () => {

        };
        this.websocket.onmessage = (message) => {
            console.log(message.data);
            const messageParsed = JSON.parse(message.data);

            // eslint-disable-next-line default-case
        switch (messageParsed.type) {

            case "clientPos":
                console.log(messageParsed.long)
                console.log(messageParsed.lat);
                this.setState({
                    droneLong: messageParsed.long,
                    droneLat: messageParsed.lat,
                    droneAlt: messageParsed.alt,
                    droneConnectedSatellites: messageParsed.ConnectedSatellites
                })
                break;
            case "voltage":
                console.log(messageParsed.voltage)
                console.log(messageParsed.percentage);
                this.setState({
                    droneBatteryVoltage: messageParsed.voltage,
                    droneBatteryPercentage: messageParsed.percentage,
                })
                break;
            case "clientStatusUpdate":
                this.setState({
                    droneOnline: messageParsed.onlineState
                })


        }


        };


    }

    switchViewMode() {
    this.setState({
        showFlightSettings: !this.state.showFlightSettings
        })
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
                    {
                        this.state.renderMap &&
                    <div>
                        <div  title={this.state.droneBatteryVoltage+" V"} className={droneControlStyle.droneBatteryDiv}><div id="DroneBatteryIcon" className={droneControlStyle.droneBatteryIcon}><div className={droneControlStyle.droneBatteryLevel} style={{width: this.state.droneBatteryPercentage+"%"}}/></div><p id="DroneBatteryPercentageLabel" className={droneControlStyle.droneBatteryIconPercentageLabel}>{this.state.droneBatteryPercentage+" %"}</p></div>
                        <button onClick={this.switchViewMode}>Flugeinstellungen</button>
                        {
                            !this.state.showFlightSettings?
                            <SimpelMap  center={{latitude:this.state.droneLat,longitude:this.state.droneLong}}>


                            </SimpelMap>:
                                <div>
                                    <DroneFlightParams droneBatteryVoltage={this.state.droneBatteryVoltage} droneBatteryPercentage={this.state.droneBatteryPercentage} droneConnectedSatellites={this.state.droneConnectedSatellites} lat={this.state.droneLat} long={this.state.droneLong} alt={this.state.droneAlt} height={this.state.droneHeight} droneOnline={this.state.droneOnline}/>
                                <SetPIDValue ws={this.websocket}></SetPIDValue>

                                </div>
                        }

                    </div>
                        }



                </div>

            }

        </div>;
    }

}

export default droneControl;