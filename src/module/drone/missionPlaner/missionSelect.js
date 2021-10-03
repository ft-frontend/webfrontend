import React, {Component} from 'react';
import deviceDashboardFontStyle from "../../../dashboard/device/deviceDashboardFont.module.css";
import AddMissionButton from "./AddMissionButton";
import Selector from "../../../UI/Selector/Selector";
import missionSelectStyle from "./missionSelectStyle.module.css";
import api from "../../../api/api";
import DeviceImageDrawer from "../../../dashboard/device/DeviceImageDrawer";
import {withTranslation} from "react-i18next";

class MissionSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceTypeList: [],
            renderList: false
        };
    }


    componentDidMount() {
        api.listMissions().then(r => {
            if(r.success) {
                r.missions.forEach(mission => {


                    this.state.deviceTypeList.push( {
                        link: "/module/drone/missions/planner/"+mission.uuid,
                        text: mission.name,
                        img:DeviceImageDrawer("Drone")
                    });
                })
                this.setState({
                    renderList: true
                })
            }else{

            }

        })
    }

    render() {
        const {t} = this.props;
        return (
            <div className={missionSelectStyle.pageContainer}>
                <div className={missionSelectStyle.missionSelectTopLine}>
                    <h1 className={missionSelectStyle.missionSelectTitle}>{t('selectMission')}</h1>
                </div>
                <div onClick={()=>window.location.href="/module/drone/missions/generators/selectMission"} className={missionSelectStyle.startMissionGenerators}><span className={"ignoreDarkMode "+missionSelectStyle.startMissionGeneratorsText}>{t('startMissionGenerator')}</span></div>


                <AddMissionButton/>
                {this.state.renderList&& <Selector items={this.state.deviceTypeList}/>}
            </div>
        );
    }
}

export default withTranslation()(MissionSelect);