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
                    renderEverything: true,
                    adminAccess: result.data.admin !== undefined,

                });

            }

        });

        api.getDeviceStatusInfo(this.props.match.params.device).then(result => {
            if (result.success) {
                let long = 0;
                let lat = 0;
                let voltage = "?";
                let percentage = "?";
                if (result.data.long) {
                    long = parseFloat(result.data.long.toString())
                }
                if (result.data.lat) {
                   lat = parseFloat(result.data.lat.toString())

                }

                if (result.data.batteryVoltage) {
                    voltage = parseFloat(result.data.batteryVoltage)
                }
                if (result.data.batteryPercentage) {
                   percentage = parseFloat( result.data.batteryPercentage)
                }

                this.setState({
                   droneLong: long,
                   droneLat: lat,
                   droneBatteryVoltage: voltage,
                   droneBatteryPercentage: percentage,
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


        switch (message) {

            case "clientPos":
                console.log(messageParsed.long)
                console.log(messageParsed.lat);
                this.setState({
                    droneLong: messageParsed.long,
                    droneLat: messageParsed.lat
                })
                break;
            case "volate":
                console.log(messageParsed.voltage)
                console.log(messageParsed.percentage);
                this.setState({
                    droneBatteryVoltage: messageParsed.voltage,
                    droneBatteryPercentage: messageParsed.percentage,
                })
                break;

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
                        <div  title={this.state.droneBatteryVoltage+" V"} className={droneControlStyle.droneBatteryDiv}><div className={droneControlStyle.droneBatteryIcon}><div className={droneControlStyle.droneBatteryLevel} style={{width: this.state.droneBatteryPercentage+"%"}}/></div><p className={droneControlStyle.droneBatteryIconPercentageLabel}>{this.state.droneBatteryPercentage+" %"}</p></div>
                        <button onClick={this.switchViewMode}>Flugeinstellungen</button>
                        {
                            !this.state.showFlightSettings?
                            <SimpelMap  center={{latitude:this.state.droneLat,longitude:this.state.droneLong}}>


                            </SimpelMap>:
                                <div>
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