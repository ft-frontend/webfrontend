import React, {Component} from 'react';
import deviceDashboardFontStyle from "../../../dashboard/device/deviceDashboardFont.module.css";
import AddMissionStyle from "./AddMissionStyle.module.css"
import api from "../../../api/api";
import {withTranslation} from "react-i18next";

class AddMission extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();
        const mission = document.getElementById("addMissionNameInput").value;
        api.addNewMission(mission,'{}').then(result => {
            if(result.success) {
                window.location.href= "/module/drone/missions/planner/"+result.uuid

            }

        })

    }

    handleFileUpload(event) {
        const reader = new FileReader()
        reader.onload = (e) =>{

            api.addNewMission(event.target.files[0].name.split('.').slice(0, -1).join('.'),e.target.result).then(result=>{
                if(result.success) {
                    window.location.href= "/module/drone/missions/planner/"+result.uuid

                }
            })
        }

        for (let file of event.target.files) {
            reader.readAsText(file)
        }
    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>{t('selectANameForNewMission')}</h1>

                <form className={AddMissionStyle.AddMissionForm} onSubmit={this.handleSubmit}>

                    <input className={AddMissionStyle.AddMissionTextInput} id="addMissionNameInput"  maxLength={40} type="text" placeholder={"Name"} defaultValue={"New Mission"}/>
                    <button className={AddMissionStyle.AddMissionSubmit} type="submit" >{t('direct_translation_create')}</button>
                </form>
                <hr style={{marginTop:"30px"}}/>

                <h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter} style={{marginTop:"30px"}}>{t('importMissionFromFile')}</h1>

                <input type='file' accept=".dronemission" onChange={this.handleFileUpload}  className={AddMissionStyle.AddMissionForm}/>



            </div>
        );
    }
}

export default withTranslation()(AddMission);