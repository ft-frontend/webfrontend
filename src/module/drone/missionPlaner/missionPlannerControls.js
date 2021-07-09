import React, {Component} from 'react';
import api from "../../../api/api";

class MissionPlannerControls extends Component {
    constructor(props) {
        super(props);
        this.saveMission = this.saveMission.bind(this);
        this.downloadUtility = this.downloadUtility.bind(this);
        this.downloadMission = this.downloadMission.bind(this);
    }


    saveMission() {
        console.log(this.props.requestDataCallback())
        api.saveMissionData(this.props.missionUUID,JSON.stringify(this.props.requestDataCallback())).then((result)=> {
            if(result.success) {
                window.onbeforeunload = undefined;
            console.log("saved")
            }
        })
    }

    downloadMission() {
        this.downloadUtility(this.props.missionName+".dronemission",JSON.stringify(this.props.requestDataCallback()))
    }

    downloadUtility(filename,text) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    render() {
        return (
            <div>
                <button onClick={this.saveMission}>Speichern</button>
                <button onClick={this.downloadMission}>Herunterladen</button>
            </div>
        );
    }
}

export default MissionPlannerControls;