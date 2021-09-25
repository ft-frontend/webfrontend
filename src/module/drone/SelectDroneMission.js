import React, {Component} from 'react';
import api from "../../api/api";
import {withTranslation} from "react-i18next";

class SelectDroneMission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: []
        }

        this.handleMissionChange = this.handleMissionChange.bind(this);

    }
    componentDidMount() {
        const options = [];
        const {t} = this.props;

        options.push(<option  value={-1}>{t('direct_translation_none')}</option>);

        api.listMissions().then(res=>{
           res.missions.forEach(mission=>{
               const name = mission.name;
               const uuid = mission.uuid;
              options.push(<option value={uuid}>{name}</option>);

           })
            this.setState({ options:options });
        })

        api.getDeviceConfig(this.props.deviceUUID).then(res=>{
            console.log(res);
            if(res.config.currentMission) {
                const selectBox = document.getElementById("SelectDroneMissionBox")
                if((selectBox.innerHTML.indexOf('value="' + res.config.currentMission + '"') > -1)){
                    selectBox.value = res.config.currentMission;
                }else{
                    selectBox.value = -1;
                }
            }
        })



    }

    handleMissionChange(e) {
        api.saveDeviceConfig(this.props.deviceUUID,"currentMission",e.target.value).then(res=>{
            this.props.updateMissionCallback(e.target.value)
        });
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <label htmlFor="mission">{t('direct_translation_currentMission')}</label>

                <select onChange={this.handleMissionChange}  name="mission" id="SelectDroneMissionBox">
                    {this.state.options}
                </select>
            </div>
        );
    }
}

export default withTranslation()(SelectDroneMission);