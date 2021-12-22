import React, {Component} from 'react';
import api from "../../api/api";
import {withTranslation} from "react-i18next";
import AuthenticationSettingsStyle from "./AuthenticationSettingsStyle.module.css"
import ActivateMFADialog from "../../UI/ActivateMFADialog/ActivateMFADialog";

class AuthenticationSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isTwoFactorAuthenticationEnabledPending: true,
            isTwoFactorAuthenticationEnabled: false,
            openEnableTOTPDialog: false
        }
        this.disableTOTP = this.disableTOTP.bind(this);
        this.closeEnableTOTPDialog = this.closeEnableTOTPDialog.bind(this);
        this.enableTOTP = this.enableTOTP.bind(this);

    }

    disableTOTP = () => {
        api.disableTOTP().then(() => {
            this.setState({
                isTwoFactorAuthenticationEnabled: false
            })
        })
    };

    enableTOTP = () => {
        this.setState({
            openEnableTOTPDialog: true
        })
    };

    closeEnableTOTPDialog = () => {
        this.setState({
            openEnableTOTPDialog: false
        })
    };

    componentDidMount() {
        api.checkTOTPEnabled().then(isEnabled => {
            this.setState({
                isTwoFactorAuthenticationEnabledPending: false,
                isTwoFactorAuthenticationEnabled: isEnabled
            })
        })

    }


    render() {
        const {t} = this.props;
        return (
           <>
               {
                   this.state.openEnableTOTPDialog &&
                       <ActivateMFADialog onClose={this.closeEnableTOTPDialog}/>
               }
               <h1 className={AuthenticationSettingsStyle.headLine}>{t('direct_translation_authentication')}</h1>
                <div className={AuthenticationSettingsStyle.totpAuth}>
                    <h4>{t('direct_translation_2fa')}: </h4>
                    <div className={AuthenticationSettingsStyle.googleAuthState}>
                        {
                            this.state.isTwoFactorAuthenticationEnabledPending?
                                <p>Loading...</p>
                                :<>
                                {
                                    this.state.isTwoFactorAuthenticationEnabled?
                                        <button onClick={this.disableTOTP}>{t('direct_translation_disable')}</button>

                                        :
                                        <button onClick={this.enableTOTP}>{t('direct_translation_enable')}</button>

                                }
                                </>
                        }


                    </div>
                </div>

           </>
        );
    }
}

export default withTranslation()(AuthenticationSettings);