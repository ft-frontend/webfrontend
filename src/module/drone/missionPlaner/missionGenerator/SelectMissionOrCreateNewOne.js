import React, {Component} from 'react';
import api from "../../../../api/api";
import DeviceImageDrawer from "../../../../dashboard/device/DeviceImageDrawer";
import missionSelectStyle from "../missionSelectStyle.module.css";
import AddMissionButton from "../AddMissionButton";
import Selector from "../../../../UI/Selector/Selector";
import {withTranslation} from "react-i18next";

class SelectMissionOrCreateNewOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            missionList: [],
            renderList: false
        };
    }

    componentDidMount() {
        api.listMissions().then(r => {
            if(r.success) {
                r.missions.forEach(mission => {


                    this.state.missionList.push( {
                        link: "/module/drone/missions/generators/"+mission.uuid+"/list",
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
                    <h2 className={missionSelectStyle.missionSelectTitle}>{t('selectFromExistingMissionOrCreateNewOne')}</h2>
                </div>
                {this.state.renderList&& <Selector items={this.state.missionList}/>}
            </div>
        );
    }
}

export default withTranslation()(SelectMissionOrCreateNewOne);