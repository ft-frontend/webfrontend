import React, {Component} from 'react';
import SimpleMap from "../SimpelMap";
import deviceDashboardFontStyle from "../../../dashboard/device/deviceDashboardFont.module.css";
import api from "../../../api/api";
import ConfirmButton from "../../../UI/confirmButton/ConfirmButton";
import Trash from "../../../res/trash.svg";

class MissionPlanner extends Component {

    constructor(props) {
        super(props);
        this.state = {

            renderMap: false,
            missionName: "Bitte Warten"
        };

        this.deleteMission = this.deleteMission.bind(this);


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



    render() {
        return (
            <div>
                <h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>{this.state.missionName}</h1>
                <ConfirmButton className={deviceDashboardFontStyle.deleteDeviceButtonDiv}  confirmText={"Möchtest du die Mession wirklich löschen?"} confirmAction={this.deleteMission}><img  className={deviceDashboardFontStyle.deleteDeviceButton} src={Trash} alt="Delete"/></ConfirmButton>

                {this.state.renderMap && <SimpleMap planner={true} missionName={this.state.missionName} missionUUID={this.props.match.params.mission} missionData={ this.state.data}  />}
            </div>
        );
    }
}

export default MissionPlanner;