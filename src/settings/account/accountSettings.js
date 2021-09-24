import React from "react";
import AccountSettingsStyle from "./accountSettingsStyle.module.css"
import ChangeableTextField from "../../UI/changeableTextField/ChangeableTextField";
import editIcon from "../../res/edit.svg";
import api from "../../api/api";

class AccountSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: window.localStorage.getItem('username')
        }
        this.userNameChange = this.userNameChange.bind(this);


    }


    userNameChange(name,instance) {
        if(name.toString()!==this.state.username.toString()) {
            api.changeUsername(name).then(result => {
                if(!result.success) {
                    const usernameChangeErrorLabel = document.getElementById("ChangeUsernameErrorLabel")
                    usernameChangeErrorLabel.style.display = "block";
                    instance.setState({
                        currentText: this.state.username
                    })
                }else{
                    const usernameChangeErrorLabel = document.getElementById("ChangeUsernameErrorLabel")
                    usernameChangeErrorLabel.style.display = "none";
                    this.setState({
                        username: name
                    })
                    window.localStorage.setItem('username',name);

                }

            })

        }
        return false;

    }

    render() {
        return (

            <div className={AccountSettingsStyle.AccountSettingsContainer}>


                <div className={AccountSettingsStyle.AccountInfoContainer}>

                    <div className={AccountSettingsStyle.AccountImage}>

                    </div>


                    <div className={AccountSettingsStyle.Username}>
                            <ChangeableTextField onNameUpdate={this.userNameChange} text={this.state.username}/>

                            <span id="ChangeUsernameErrorLabel" className={AccountSettingsStyle.UserNameError}>Dieser Benutzername ist bereits vergeben!</span>
                    </div>
                </div>

            </div>
        );
    }
}

export default AccountSettings;