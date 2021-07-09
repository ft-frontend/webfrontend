import React, {Component} from 'react';
import api from "../../api/api";

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
        options.push(<option value={-1}>Keine</option>);

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
                document.getElementById("SelectDroneMissionBox").value = res.config.currentMission;
            }
        })



    }

    handleMissionChange(e) {
        api.saveDeviceConfig(this.props.deviceUUID,"currentMission",e.target.value).then(res=>{
            this.props.updateMissionCallback(e.target.value)
        });
    }

    render() {
        return (
            <div>
                <label htmlFor="mission">Aktuelle Mission:</label>

                <select onChange={this.handleMissionChange} name="mission" id="SelectDroneMissionBox">
                    {this.state.options}
                </select>
            </div>
        );
    }
}

export default SelectDroneMission;