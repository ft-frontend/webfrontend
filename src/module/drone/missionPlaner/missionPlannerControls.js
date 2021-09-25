import React, {Component} from 'react';
import api from "../../../api/api";
import MissionPlannerControlsStyle from "./MissionPlannerControlsStlye.module.css";
import {withTranslation} from "react-i18next";

class MissionPlannerControls extends Component {
    constructor(props) {
        super(props);
        this.saveMission = this.saveMission.bind(this);
        this.downloadUtility = this.downloadUtility.bind(this);
        this.downloadMission = this.downloadMission.bind(this);
        this.heightSliderChange = this.heightSliderChange.bind(this);
        this.completeMissionDataJSON = this.completeMissionDataJSON.bind(this);
        this.handleMissionThingToDoAfterEndChange = this.handleMissionThingToDoAfterEndChange.bind(this);

        this.state = {
            selectedHeight: "0 m",
            selectedThingToDoAfterFinish: 0
        };
    }


 componentDidMount() {
        this.setState({
            selectedThingToDoAfterFinish: this.props.missionData.dal?this.props.missionData.dal:0
        })
     document.getElementById("SelectDroneMissionThingToDoAfterEnd").value = this.props.missionData.dal?this.props.missionData.dal:0
 }

    saveMission() {
        this.props.requestDataCallback().then(jsondata => {
            api.saveMissionData(this.props.missionUUID, JSON.stringify(this.completeMissionDataJSON(jsondata))).then((result) => {
                if (result.success) {
                    window.onbeforeunload = undefined;
                    console.log("saved");
                }
            });


        });


    }

    downloadMission() {
        this.props.requestDataCallback().then(res => {
            this.downloadUtility(this.props.missionName + ".dronemission", JSON.stringify(this.completeMissionDataJSON(res)));

        });

    }


    completeMissionDataJSON(mission) {
        return {
            wayPoints: mission,
            dal: this.state.selectedThingToDoAfterFinish
        };


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
            document.getElementById("droneMissionHeightSlider").value = this.props.selectedPushPin.height * 10;
            this.setState({
                selectedHeight: this.props.selectedPushPin.height + " m"
            });
        }

    }

    handleMissionThingToDoAfterEndChange(e) {
        this.setState({
            selectedThingToDoAfterFinish: e.target.value
        })
    }

    heightSliderChange(e) {
        this.setState({
            selectedHeight: e.target.value / 10 + " m"
        });

        this.props.heightChangeCallback(e.target.value / 10);
    }

    render() {
        const {t} = this.props;
        return (
            <div className={MissionPlannerControlsStyle.MissionPlannerControlsContainer}>
                <button onClick={this.saveMission}>{t('direct_translation_save')}</button>
                <button onClick={this.downloadMission}>{t('direct_translation_download')}</button>
                {this.props.selectedPushPin &&
                <div className={MissionPlannerControlsStyle.MissionPlannerControlsSilderContainer}>
                    <p>Höhe:</p>
                    <input type="range" min="0" max="1000" defaultValue="1" onChange={this.heightSliderChange}
                           id="droneMissionHeightSlider"/>
                    <p>{this.state.selectedHeight}</p>
                    <p>{"Makierter Wegpunkt: " + (this.props.selectedPushPin.index + 1)}</p>

                </div>}
                <select onChange={this.handleMissionThingToDoAfterEndChange}  name="mission" id="SelectDroneMissionThingToDoAfterEnd">
                    <option value="0">{t('direct_translation_land')}</option>
                    <option value="1">{t('direct_translation_hover')}</option>
                    <option value="2">RTH</option>
                    <option value="3">{t('direct_translation_repeat')}</option>
                    <option value="4">{t('landAtPointOne')}</option>
                    <option value="5">{t('landAtLastPoint')}</option>
                </select>
            </div>
        );
    }
}

export default withTranslation()(MissionPlannerControls);