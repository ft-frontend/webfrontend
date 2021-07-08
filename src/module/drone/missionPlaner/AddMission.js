import React, {Component} from 'react';
import deviceDashboardFontStyle from "../../../dashboard/device/deviceDashboardFont.module.css";
import AddMissionStyle from "./AddMissionStyle.module.css"
import api from "../../../api/api";

class AddMission extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        const mission = document.getElementById("addMissionNameInput").value;
        api.addNewMission(mission).then(result => {
            console.log(result);
            if(result.success) {
                window.location.href= "/module/drone/missions/planner/"+result.uuid

            }

        })

    }

    render() {
        return (
            <div>
                <h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>Wähle einen Namen für deine neue Mission:</h1>

                <form className={AddMissionStyle.AddMissionForm} onSubmit={this.handleSubmit}>

                    <input className={AddMissionStyle.AddMissionTextInput} id="addMissionNameInput"  maxLength={40} type="text" placeholder={"Name"} defaultValue={"New Mission"}/>
                    <button className={AddMissionStyle.AddMissionSubmit} type="submit" >Erstellen</button>
                </form>
                <hr style={{marginTop:"30px"}}/>

                <h4 className={deviceDashboardFontStyle.deviceDashboardFontCenter} style={{marginTop:"30px"}}>Oder Importieren aus einer Datei</h4>

                <p>SOON</p>



            </div>
        );
    }
}

export default AddMission;