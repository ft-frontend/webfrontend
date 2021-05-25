import React from "react";
import editIcon from "../res/edit.svg";
import ChangeableTextFieldStyle from "./ChangeableTextField.module.css";
import api from "../api/api";
import $ from "jquery"
class ChangeableTextField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            currentText: this.props.text,
            originalText: this.props.text
        };

        this.checkInputKeyPress = this.checkInputKeyPress.bind(this);
        this.toggleMode = this.toggleMode.bind(this);
        this.updateText = this.updateText.bind(this);

    }

    updateName() {
        if (this.state.currentText.length > 2&&this.state.currentText.length<23) {
            api.updateDeviceName(this.props.deviceUUID, this.state.currentText).then((result) => {
                this.setState({
                    isEditing: false,
                    originalText: this.state.currentText
                });
                $(document).off(".interrupt");
                if (!result.success) {
                    this.setState({
                        currentText: this.state.originalText
                    });
                }
            });
        }
    }

    checkInputKeyPress(event) {
        const keyCode = event.code || event.key;

        if (keyCode === 'Enter') {

            this.updateName();
            return false;
        }
    }


    toggleMode() {

        if (this.state.isEditing) {
            this.updateName();
        } else {
            this.setState({
                isEditing: true
            });

            const obj = this;
            $(document).on("keyup.interrupt",function(e) {
                if (e.key === "Escape") {
                    obj.setState({
                        isEditing: false,
                        currentText: obj.props.text
                    })
                }
            });


        }
    }

    componentWillUnmount() {

    }

    updateText(event) {
        if(event.target.value.length>22&&event.target.value.length>this.state.currentText.length) return
        this.setState({currentText: event.target.value});
        event.target.style.width = ((event.target.value.length)) + 'ch';
    }

    render() {
        return <div className={ChangeableTextFieldStyle.ChangeableTextFieldDiv}>
            {
                !this.state.isEditing ?
                    <h1 onDoubleClick={this.toggleMode} className={ChangeableTextFieldStyle.ChangeableTextFieldText}>{this.state.currentText}</h1>
                    :
                    <input onKeyPress={this.checkInputKeyPress}
                           className={ChangeableTextFieldStyle.ChangeableTextFieldInput}
                           value={this.state.currentText}
                           onChange={this.updateText} onBlur={this.toggleMode} style={{width: ((this.state.currentText.length + 1)) + 'ch'}}
                    />

            }

            <img onClick={this.toggleMode} src={editIcon} alt="edit"
                 className={ChangeableTextFieldStyle.ChangeableTextFieldEditButton}/>

        </div>;
    }

}

export default ChangeableTextField;