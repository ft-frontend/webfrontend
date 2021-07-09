import React, {Component} from 'react';
import api from "../../../api/api";
import MissionPlannerControlsStyle from "./MissionPlannerControlsStlye.module.css";

class MissionPlannerControls extends Component {
    constructor(props) {
        super(props);
        this.saveMission = this.saveMission.bind(this);
        this.downloadUtility = this.downloadUtility.bind(this);
        this.downloadMission = this.downloadMission.bind(this);
        this.heightSliderChange = this.heightSliderChange.bind(this);

        this.state = {
            selectedHeight: "0 m"
        };
    }


    saveMission() {
        this.props.requestDataCallback().then(jsondata => {
            api.saveMissionData(this.props.missionUUID, JSON.stringify(jsondata)).then((result) => {
                if (result.success) {
                    window.onbeforeunload = undefined;
                    console.log("saved")
                }
            });


        });


    }

    downloadMission() {
        this.props.requestDataCallback().then(res=>{
            this.downloadUtility(this.props.missionName + ".dronemission", JSON.stringify(res));

        })

    }

    downloadUtility(filename, text) {
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedPushPin !== this.props.selectedPushPin && this.props.selectedPushPin !== undefined && this.props.selectedPushPin !== null) {
            document.getElementById("droneMissionHeightSlider").value = this.props.selectedPushPin.height*10;
            this.setState({
                selectedHeight: this.props.selectedPushPin.height + " m"
            });
        }

    }

    heightSliderChange(e) {
        this.setState({
            selectedHeight: e.target.value/10 + " m"
        });

        this.props.heightChangeCallback(e.target.value/10);
    }

    render() {
        return (
            <div className={MissionPlannerControlsStyle.MissionPlannerControlsContainer}>
                <button onClick={this.saveMission}>Speichern</button>
                <button onClick={this.downloadMission}>Herunterladen</button>
                {this.props.selectedPushPin &&
                <div className={MissionPlannerControlsStyle.MissionPlannerControlsSilderContainer}>
                    <p>Höhe:</p>
                    <input type="range" min="0" max="1000" defaultValue="1" onChange={this.heightSliderChange}
                           id="droneMissionHeightSlider"/>
                    <p>{this.state.selectedHeight}</p>
                    <p>{"Makierter Wegpunkt: " + (this.props.selectedPushPin.index + 1)}</p>
                </div>}
            </div>
        );
    }
}

export default MissionPlannerControls;