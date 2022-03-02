import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';
import api from "../../../api/api";
import uuid from "uuid";

import DeviceStateTableStyle from "./DeviceStateTableStyle.module.css"

class DeviceStatusTable extends Component {



    constructor(props) {
        super(props);
        this.state = {

            deviceStatus: [],

        }






    }


    /**
     * 
     * "data":{"_id":"617c583a4e39c96c60f3bd34","deviceUUID":"e58d06a1-a960-4352-90b4-117b4524065b","name":"Neue Drohne","uuid":"a362e353-3bc9-46b2-9b19-a352a533695e","status":[{"UUID":"fd847120-e3f8-4896-84e8-c93fa49517b8","variables":[{"UUID":"6e35c494-b7d0-4eb3-9c22-69a7d5313bf4","value":"1235"}]},{"UUID":"e7665479-b649-4730-a4d4-8e0fa21272df","variables":[{"UUID":"9fa79bf9-15f3-4055-b494-b391e3cb4502","value":"1286"}]}]}
     * 
     */

    componentDidMount() {


        api.getDeviceStatusModules(this.props.deviceTypeUUID).then(module => {
            api.getDeviceStatus(this.props.deviceUUID).then(status => {
                const tableElements = [];
                status.data.forEach((element) => {
                   

                    const currentModuleElement = module.data.find(element2 => element2.UUID === element.UUID);






                    const variables = [];
                    element.variables.forEach((variable) => {

                        const currentVariableElement = currentModuleElement.variables.find(element2 => element2.UUID === variable.UUID);
                        //TODO handle GPS Position or other complex types in the future

                        if(currentVariableElement!=null) {
                            if((currentVariableElement.type === "number"||currentVariableElement.type === "string")&&Object(variable.value)!==variable.value){

                                variables.push({
                                    uuid: variable.UUID,
                                    name: currentVariableElement.name,
                                    value: variable.value
                                })
        
                            }else{
                                variables.push({
                                    uuid: variable.UUID,
                                    name: currentVariableElement.name,
                                    value: "Data Type not supported yet",
                                    dataError: true
                                })  
                            }
        
                        }


                    });


                    tableElements.push({
                        uuid: element.UUID,
                        name: currentModuleElement.name,
                        variables: variables
                    })




                });

                this.setState({
                    deviceStatus: tableElements
                });

            })
        })

        const obj = this;
        this.liveWebsocket = api.deviceLiveUpdate(this.props.deviceUUID);
        this.liveWebsocket.onmessage = (event) => {
            const data = JSON.parse(event.data).data;


            //iterate over all modules
            data.status.forEach((element) => {
                const currentModuleElement = obj.state.deviceStatus.find(element2 => element2.uuid === element.UUID);
                console.log(element)
                //check if module is in table
                if (currentModuleElement != null) {
                    //iterate over all variables
                    element.variables.forEach((variable) => {
                        const currentVariableElement = currentModuleElement.variables.find(element2 => element2.uuid === variable.UUID);

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
                deviceStatus: this.state.deviceStatus
            });



        };





    }

    render() {
        return (
            <div>

                <table className={DeviceStateTableStyle.deviceStatusTable}>
                    <tbody>

                        <tr><th>Status</th><th>Aktueller Wert</th></tr>
                        {

                            this.state.deviceStatus.map((element) => (

                                <>
                                    <tr uuid={element.UUID} key="{element.UUID}">
                                        <td colSpan={2} className={DeviceStateTableStyle.deviceStatusTableSep}>{element.name}</td>
                                    </tr>


                                    {element.variables.map((variable) => (<tr uuid={variable.uuid} key="{variable.uuid}">
                                        {/*  debug <td>{variable.UUID}</td>*/}
                                        <td uuid={variable.uuid}>{variable.name}</td>
                                        <td>{variable.value}</td>
                                    </tr>))}

                                </>


                            ))


                        }


                    </tbody>

                </table>

            </div>
        )
    }
}


export default withTranslation()(DeviceStatusTable);
