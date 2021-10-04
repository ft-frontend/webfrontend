import React, {Component} from 'react';
import deviceDashboardFontStyle from "../../../dashboard/device/deviceDashboardFont.module.css";
import api from "../../../api/api";
import ConfirmButton from "../../../UI/confirmButton/ConfirmButton";
import Trash from "../../../res/trash.svg";
import ChangeableTextField from "../../../UI/changeableTextField/ChangeableTextField";
import MissionMap from "./MissionMap";
import {withTranslation} from "react-i18next";
import missionPlannerStyle from "./missionPlannerStyle.module.css"

class MissionPlanner extends Component {

    constructor(props) {
        super(props);
        this.state = {

            renderMap: false,
            missionName: "Bitte Warten"
        };

        this.deleteMission = this.deleteMission.bind(this);
        this.handleMissionNameChange = this.handleMissionNameChange.bind(this);


    }

    componentDidMount() {
        const that = this;
        api.getMissionData(this.props.match.params.mission).then((res) => {
            console.log(res);
            that.setState({
                missionName: res.mission.name

            });

            if (!res.mission.error) {
                that.setState({
                    renderMap: true,
                    data: res.mission.data

                });

            }

        });

    }

    deleteMission() {

        api.deleteMission(this.props.match.params.mission).then(()=>{
            window.location.href = "/module/drone/missions"
        })

    }

    handleMissionNameChange(text) {

        if (text.length > 2&&text.length<23) {
            api.renameMission(this.props.match.params.mission, text).then((result) => {
                console.log(result);

                return result.success;
            });
        }
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                {this.state.renderMap? <>
                    <div className={deviceDashboardFontStyle.deviceDashboardFontCenter}>
                    <ChangeableTextField  text={this.state.missionName} onNameUpdate={this.handleMissionNameChange}/>
                        <div onClick={()=>window.location.href="/module/drone/missions/generators/"+this.props.match.params.mission+"/list"} className={missionPlannerStyle.missionPlannerAddGenerator}><span className={"ignoreDarkMode "+missionPlannerStyle.missionPlannerAddGeneratorText}>{t('startMissionGenerator')}</span></div>

                    </div>
                        <ConfirmButton className={deviceDashboardFontStyle.deleteDeviceButtonDiv}  confirmText={"Möchtest du die Mession wirklich löschen?"} confirmAction={this.deleteMission}><img  className={deviceDashboardFontStyle.deleteDeviceButton} src={Trash} alt="Delete"/></ConfirmButton>
                    </>
                    :
                    <h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>{this.state.missionName}</h1>
                }
                {this.state.renderMap && <MissionMap planner={true} missionName={this.state.missionName} missionUUID={this.props.match.params.mission} missionData={ this.state.data}  />}
            </div>
        );
    }
}

export default withTranslation()(MissionPlanner);