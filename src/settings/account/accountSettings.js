import React from "react";
import AccountSettingsStyle from "./accountSettingsStyle.module.css"
import ChangeableTextField from "../../UI/changeableTextField/ChangeableTextField";
import editIcon from "../../res/edit.svg";
import api from "../../api/api";
import i18next from "i18next";
import {withTranslation} from "react-i18next";
import accountSettingsHandler from "../accountSettingsHandler";

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
                    usernameChangeErrorLabel.innerText = api.parseError(result.errorcode)
                    console.log(result);

                    console.log(result)
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

    componentDidMount() {
        document.body.classList.add(AccountSettingsStyle.tempBodyColorTransition)
    }

    render() {
        const {t} = this.props;
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

                <div className={AccountSettingsStyle.languageSettings}>
                    <label className={AccountSettingsStyle.languagePickerLabel} for="language-picker-select">{t('direct_translation_language')}</label>
                    <select name="language-picker-select" id="language-picker-select" className={AccountSettingsStyle.languagePicker} onChange={()=>{
                        const newLang=document.getElementById("language-picker-select").value;
                        api.saveAccountSetting("language",newLang);
                        i18next.changeLanguage(newLang)
                        api.getAccountSettings(true)}
                    }>

                        <option lang="en" value="en" selected={(i18next.language==="en")}>English</option>
                        <option lang="de" value="de" selected={(i18next.language==="de")}>Deutsch</option>
                    </select>

                </div>

                <div className={AccountSettingsStyle.themeSettingsContainer}>
                    <label className={AccountSettingsStyle.themeSettingsToggleLabel} htmlFor="themeSettingsToggle">{t('direct_translation_darkMode')}</label><input defaultChecked={Boolean(window.localStorage.getItem("darkmode"))===true} onChange={()=>{
                    const darkmodeSetting=document.getElementById("themeSettingsToggle").checked;
                    api.saveAccountSetting("darkmode",darkmodeSetting).then(()=> {
                        api.getAccountSettings(true).then(settings=>{
                            accountSettingsHandler.handlerSettings(settings.settings)

                        });
                    });

                }} type="checkbox" id="themeSettingsToggle" />
                </div>
            </div>
        );
    }
}

export default withTranslation()(AccountSettings);