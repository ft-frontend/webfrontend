import React, { Component } from 'react'
import { withTranslation } from 'react-i18next';
import api from "../../../api/api";

import DeviceStatusTableStyle from "./DeviceStatusTableStyle.module.css"

class DeviceStatusTable extends Component {



    constructor(props){
        super(props);
        this.state = {

            tableElements: []

        }
        api.getDeviceStatusModules(this.props.deviceTypeUUID).then(module=>{
            api.getDeviceStatus(this.props.deviceUUID).then(status=>{
                const tableElements = [];
                status.data.forEach((element,it1) => {
                    console.log(module);

                        const currentModuleElement = module.data.find(element2 => element2.UUID === element.UUID);

                    tableElements.push(
                        <tr key={it1}>
                        <td colSpan={2} className={DeviceStatusTableStyle.deviceStatusTableSep}>{currentModuleElement.name}</td>
                    </tr>)

                    element.variables.forEach((variable,it2) => {

                        const currentVariableElement = currentModuleElement.variables.find(element2 => element2.UUID === variable.UUID);

                        tableElements.push(

                            <tr key={it1*(it2+1)+1}>
                                  {/*  debug <td>{variable.UUID}</td>*/}  
                                  <td>{currentVariableElement.name}</td>
                                <td>{variable.value}</td>
                            </tr>
    
                        )


                    });


                    
                
                 
    
                });

                this.setState({
                    tableElements: tableElements
                });
                
            })
        })

        

    }



  render() {
    return (
      <div>

        <table className={DeviceStatusTableStyle.deviceStatusTable}>
            <tr><th>Status </th>  <th>Aktueller Wert</th></tr>
            {this.state.tableElements}

        </table>

      </div>
    )
  }
}


export default withTranslation()(DeviceStatusTable);
