import React from "react";
import moduleStyle from "../moduleFont.module.css"
import droneControlStyle from "./droneControlStyle.module.css"

import settingsIcon from "../../res/settings.svg"
import backIcon from "../../res/back.svg"
import api from "../../api/api";

class droneControl extends React.Component {
    constructor(props) {
        super(props);
        this.deviceType = "1770efae-9f94-11eb-87e8-0242ac110002"
        this.state = {
            deviceName: "Bitte Warten...",
            renderEverything: false
        }

    }

    componentDidMount() {


        api.getUserSpecificDeviceInfo( this.props.match.params.device).then(result => {
            if(result.error) {
                this.setState({
                    deviceName: result.errorMessage
                })
            }else{
                this.setState({
                    deviceName: result.data.content.name,
                    renderEverything: true,
                    adminAccess: result.data.admin!==undefined
                })
            }


        })
    }

    render() {
        return <div>
            <img  onClick={() => window.location.href="/module/drone/"} className={droneControlStyle.DroneControlBackButton} src={backIcon}  alt="Settings"/>
            <img  onClick={() => window.location.href="/dashboard/device/"+this.deviceType+"/"+this.props.match.params.device} className={droneControlStyle.DroneControlSettingsButton} src={settingsIcon} alt="Settings"/>
            <h1 className={moduleStyle.moduleFontCenter}>{this.state.deviceName} </h1>
            {
                this.state.renderEverything &&
                    <div>

                    <h1 className={moduleStyle.moduleFontCenter}> Das Gerät wurde gefunden und hier wird mal eine Karte mit der Position angezeigt!</h1>
                        <h4 className={droneControlStyle.adminAccessInfo}>Admin-Zugriff</h4>

                    </div>

            }

        </div>
    }

}

export default droneControl