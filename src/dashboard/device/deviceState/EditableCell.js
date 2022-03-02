import React, { Component } from 'react'
import DeviceSettingsTableStyle from "./DeviceSettingsTableStyle.module.css"
import uuid from "uuid";
import { BsFillPencilFill } from 'react-icons/bs';
import EditableCellStyle from "./EditableCellStyle.module.css";
import api from '../../../api/api';


export default class EditableCell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            value: this.props.value
        }

        this.onStartEditing = this.onStartEditing.bind(this);
        this.onStopEditing = this.onStopEditing.bind(this);
    
    }

    

    onStartEditing = () => {
        this.setState({
            isEditing: true
        });
    }

    onStopEditing = (event) => {
      

        const value = event.target.value
        console.log(value)

        this.setState({
            isEditing: false,
            value: "..."

        });

        api.updateDeviceSettings(this.props.device, this.props.module, this.props.uuid,value).then(result => {
            console.log(result);
            if (result.error) {
                this.setState({
                    value: result.errorMessage
                });
            } else {
                this.setState({
                    value: value
                });
            }


        });

    }



    static getDerivedStateFromProps(props, current_state) {
        if (current_state.value !== props.value) {
            return {
              value: props.value
            }
          }
          return null
        
    }



  render() {
    return (
        <>
        <tr className={DeviceSettingsTableStyle.deviceSettingsRow} uuid={this.props.uuid} key={this.props.uuid}>
        {/*  debug <td>{variable.UUID}</td>*/}
        <td key={uuid()} uuid={this.props.uuid}>{this.props.name}</td>
        <td key={uuid()}>

           {
                !this.state.isEditing ?
                <>{this.state.value}<BsFillPencilFill key={uuid()} onClick={this.onStartEditing} className={DeviceSettingsTableStyle.editPencilIcon}/></>:
                <>
                <input autoFocus key={uuid()} type="text" className={EditableCellStyle.variableInput} defaultValue={this.state.value} onKeyUp={(event)=>{if(event.key=== "Enter"){this.onStopEditing(event)}}}/>
                <button key={uuid()} className={EditableCellStyle.okButton} onClick={this.onStopEditing}>ok</button>
                </>
           }
            
            
            </td>
    </tr>
    </>
    )
  }
}
