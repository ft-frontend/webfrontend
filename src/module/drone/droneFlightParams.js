import React, {Component} from 'react';
import DroneFlightParamsStyle from "./droneFlightParams.module.css"

class DroneFlightParams extends Component {
    render() {
        return (
            <div>
                <table className={DroneFlightParamsStyle.droneFlightParamsTable}>
                    <tr>
                        <th >Parameter</th>
                        <th>Aktueller Wert</th>
                    </tr>
                    <tr>
                        <td colSpan={2} className={DroneFlightParamsStyle.droneFlightParamsTableSep}>Status</td>
                    </tr>
                    <tr>
                        <td>Online-Status</td>
                        <td>{this.props.droneOnline}</td>
                    </tr>

                    <tr>
                        <td>Flugmodus</td>
                        <td>{this.props.droneEmergencyMode}</td>
                    </tr>

                    <tr>
                        <td>Emergency Stop</td>
                        <td>{this.props.droneFlightMode}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={DroneFlightParamsStyle.droneFlightParamsTableSep}>Akku</td>
                    </tr>
                    <tr>
                        <td>Akku-Spannung</td>
                        <td>{this.props.droneBatteryVoltage+" V"}</td>
                    </tr>
                    <tr>
                        <td>Akku-Ladung</td>
                        <td>{this.props.droneBatteryPercentage+" %"}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={DroneFlightParamsStyle.droneFlightParamsTableSep}>Position</td>
                    </tr>
                    <tr>
                        <td>Verbunde Satelliten</td>
                        <td>{this.props.droneConnectedSatellites}</td>
                    </tr>
                    <tr>
                        <td>Latitude</td>
                        <td>{this.props.lat}</td>
                    </tr>
                    <tr>
                        <td>Longitude</td>
                        <td>{this.props.long}</td>
                    </tr>

                    <tr>
                        <td>Altitude</td>
                        <td>{this.props.alt}</td>
                    </tr>
                    <tr>
                        <td>Höhe</td>
                        <td>{this.props.height+" m"}</td>
                    </tr>

                </table>
            </div>
        );
    }
}

export default DroneFlightParams;