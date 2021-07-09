import React, {Component} from 'react';
import SimpleMap from "../SimpelMap";
import deviceDashboardFontStyle from "../../../dashboard/device/deviceDashboardFont.module.css";
import api from "../../../api/api";

class MissionPlanner extends Component {

    constructor(props) {
        super(props);
        this.state = {

            renderMap: false,
            missionName: "Bitte Warten"
        };



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




    render() {
        return (
            <div>
                <h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>{this.state.missionName}</h1>
                {this.state.renderMap && <SimpleMap planner={true} missionName={this.state.missionName} missionUUID={this.props.match.params.mission} missionData={ this.state.data}  />}
            </div>
        );
    }
}

export default MissionPlanner;