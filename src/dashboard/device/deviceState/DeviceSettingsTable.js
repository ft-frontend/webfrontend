import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';
import api from "../../../api/api";
import uuid from "uuid";
import EditableCell from './EditableCell';

import DeviceSettingsTableStyle from "./DeviceSettingsTableStyle.module.css"
import { BsFillPencilFill } from 'react-icons/bs';

class DeviceSettingsTable extends Component {



    constructor(props) {
        super(props);
        this.state = {

            deviceSettings: [],

        }


    }



    componentDidMount() {


        api.getDeviceSettingsModules(this.props.deviceTypeUUID).then(module => {
            api.getDeviceSettings(this.props.deviceUUID).then(settings => {
                const tableElements = [];
                settings.data.forEach((element) => {


                    const currentModuleElement = module.data.find(element2 => element2.UUID === element.UUID);

                    const variables = [];
                    element.variables.forEach((variable) => {

                        const currentVariableElement = currentModuleElement.variables.find(element2 => element2.UUID === variable.UUID);
                        //TODO handle GPS Position or other complex types in the future

                        if((currentVariableElement.type === "number"||currentVariableElement.type === "string")&&Object(variable.value)!==variable.value){

                        variables.push({
                            UUID: variable.UUID,
                            name: currentVariableElement.name,
                            value: variable.value
                        })

                    }else{
                        variables.push({
                            UUID: variable.UUID,
                            name: currentVariableElement.name,
                            value: "Data Type not supported yet",
                            dataError: true
                        })  
                    }



                    });


                    tableElements.push({
                        UUID: element.UUID,
                        name: currentModuleElement.name,
                        variables: variables
                    })




                });

                this.setState({
                    deviceSettings: tableElements
                });

            })
        })

        const obj = this;
        this.liveWebsocket = api.deviceLiveUpdate(this.props.deviceUUID);
        this.liveWebsocket.onmessage = (event) => {

            if(JSON.parse(event.data).operation==="ping") return;

            const data = JSON.parse(event.data).data;


            //iterate over all modules
            data.settings.forEach((element) => {
                const currentModuleElement = obj.state.deviceSettings.find(element2 => element2.UUID === element.UUID);  
                //check if module is in table
                if (currentModuleElement != null) {
                    //iterate over all variables
                    element.variables.forEach((variable) => {
                        const currentVariableElement = currentModuleElement.variables.find(element2 => element2.UUID === variable.UUID);
                        //check if variable is in table
                        if (currentVariableElement != null) {
                            //check if there is not an error and the new value is a primitive type
                            //TODO handle GPS Position or other complex types in the future
                            if(!currentVariableElement.dataError&&Object(variable.value)!==variable.value){

                            currentVariableElement.value = variable.value;

                            }

                        }

                    });
                }

            });

            this.setState({
                deviceSettings: this.state.deviceSettings
            });



        };





    }

    render() {
        return (
            <div>

                <table className={DeviceSettingsTableStyle.deviceSettingsTable}>
                    <tbody>

                        <tr><th>Einstellung</th><th>Aktueller Wert</th></tr>
                        {

                            this.state.deviceSettings.map((element) => (
                               

                                <>
                                    <tr className={DeviceSettingsTableStyle.deviceSettingsRow} uuid={element.UUID} key={element.UUID}>
                                        <td colSpan={2} className={DeviceSettingsTableStyle.deviceSettingsTableSep}>{element.name}</td>
                                    </tr>

                                    {element.variables.map((variable) => (<EditableCell uuid={variable.UUID} module={element.UUID} device={this.props.deviceUUID} name={variable.name} value={variable.value}/>))}

                                </>


                            ))


                        }


                    </tbody>

                </table>

            </div>
        )
    }
}


export default withTranslation()(DeviceSettingsTable);
