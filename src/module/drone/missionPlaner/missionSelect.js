import React, {Component} from 'react';
import deviceDashboardFontStyle from "../../../dashboard/device/deviceDashboardFont.module.css";
import AddMissionButton from "./AddMissionButton";
import Selector from "../../../UI/Selector/Selector";
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
            <div>
                <h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>{t('selectMission')}</h1>
                <AddMissionButton/>
                {this.state.renderList&& <Selector items={this.state.deviceTypeList}/>}
            </div>
        );
    }
}

export default withTranslation()(MissionSelect);