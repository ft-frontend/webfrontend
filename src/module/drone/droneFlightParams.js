import React, {Component} from 'react';
import DroneFlightParamsStyle from "./droneFlightParams.module.css"
import {withTranslation} from "react-i18next";

class DroneFlightParams extends Component {
    render() {
        const {t} = this.props;

        return (
            <div>
                <table className={DroneFlightParamsStyle.droneFlightParamsTable}>
                    <tr>
                        <th >{t('direct_translation_parameter')}</th>
                        <th>{t('direct_translation_currentValue')}</th>
                    </tr>
                    <tr>
                        <td colSpan={2} className={DroneFlightParamsStyle.droneFlightParamsTableSep}>{t('direct_translation_status')}</td>
                    </tr>
                    <tr>
                        <td>{t('direct_translation_onlineState')}</td>
                        <td>{this.props.droneOnline}</td>
                    </tr>

                    <tr>
                        <td>{t('direct_translation_flightMode')}</td>
                        <td>{this.props.droneFlightMode}</td>
                    </tr>

                    <tr>
                        <td>{t('direct_translation_emergencyStop')}</td>
                        <td>{this.props.droneEmergencyMode}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={DroneFlightParamsStyle.droneFlightParamsTableSep}>{t('direct_translation_akku')}</td>
                    </tr>
                    <tr>
                        <td>{t('direct_translation_akkuVoltage')}</td>
                        <td>{this.props.droneBatteryVoltage+" V"}</td>
                    </tr>
                    <tr>
                        <td>{t('direct_translation_akkuLevel')}</td>
                        <td>{this.props.droneBatteryPercentage+" %"}</td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={DroneFlightParamsStyle.droneFlightParamsTableSep}>{t('direct_translation_availableSatellites')}</td>
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
                        <td>{this.props.alt+" m (NN)"}</td>
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

export default withTranslation()(DroneFlightParams);