import React from "react";
import AccountSettingsStyle from "./accountSettingsStyle.module.css"
import ChangeableTextField from "../../UI/changeableTextField/ChangeableTextField";
import editIcon from "../../res/edit.svg";

class AccountSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: window.localStorage.getItem('username')
        }
        this.userNameChange = this.userNameChange.bind(this);

    }

    userNameChange(name) {
        return true;
    }

    render() {
        return (
            <div className={AccountSettingsStyle.AccountSettingsContainer}>
                <div className={AccountSettingsStyle.AccountInfoContainer}>
                    <div className={AccountSettingsStyle.AccountImage}>
                        <div className={AccountSettingsStyle.accountImageChangeButton}>
                        <img  src={editIcon} alt="edit" className={AccountSettingsStyle.accountImageChangeButtonImage}
                        />

                    </div></div>

                    <div className={AccountSettingsStyle.Username}>
                    <ChangeableTextField  maxTextLength={20} onNameUpdate={this.userNameChange} text={this.state.username}/>
                        <span className={AccountSettingsStyle.UserNameError}>Dieser Benutzername ist bereits vergeben!</span>
                    </div>
                </div>

                <h1>Account Settings</h1>
            </div>
        );
    }
}

export default AccountSettings;