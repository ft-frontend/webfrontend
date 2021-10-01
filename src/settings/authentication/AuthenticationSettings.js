import React, {Component} from 'react';
import api from "../../api/api";
import {withTranslation} from "react-i18next";
import AuthenticationSettingsStyle from "./AuthenticationSettingsStyle.module.css"

class AuthenticationSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            google: false,
            googleAccount: null,
            googleLoading: true
        }
        this.disconnectGoogle = this.disconnectGoogle.bind(this);
        this.renderGoogleButton = this.renderGoogleButton.bind(this);
    }

    componentDidMount() {
     const script = api.loadGoogleAuthScript()
        const obj = this;

        script.onload = function () {
            window.gapi.load('auth2', function() {
                window.gapi.auth2.init();
            });
            api.checkGoogleAccount().then((valid)=>{
                console.log(valid)
                if(valid!=null&&valid.valid) {
                    obj.setState({
                         google: true,
                         googleLoading: false,
                         googleAccount: valid.googleResponse
                     })
                }else{
                    obj.setState({
                        google: false,
                        googleLoading: false,
                        googleAccount: null
                    })

                    obj.renderGoogleButton();
                }
            })
            //api.getAccountAuth().then(auth=> {

            //})
        }


        window.onGoogleSignIn = function (googleUser) {

            api.saveGoogleToken(googleUser.getAuthResponse().id_token).then(()=>{
                api.checkGoogleAccount().then((valid)=>{
                    if(valid!=null&&valid.valid) {
                        obj.setState({
                            google: true,
                            googleLoading: false,
                            googleAccount: valid.googleResponse
                        })
                    }else{
                        obj.setState({
                            google: false,
                            googleLoading: false,
                            googleAccount: null
                        })
                    }
                    window.gapi.auth2.getAuthInstance().disconnect();
                })
            })
        }




    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(this.state);
    }

    renderGoogleButton() {
        window.gapi.signin2.render('googleSignInButton',{
            'onsuccess': window.onGoogleSignIn
        })
    }

    disconnectGoogle() {
        api.deleteGoogleToken().then(()=>{
            this.setState({
                google: false,
                googleAccount: null
            })
             window.gapi.auth2.getAuthInstance().signOut().then(()=>{
               this.renderGoogleButton();

            })
        })
    }

    render() {
        const {t} = this.props;
        return (
           <>
               {/*<h1 className={AuthenticationSettingsStyle.headLine}>{t('direct_translation_authentication')}</h1>
                <div className={AuthenticationSettingsStyle.googleAuth}>
                    <h4>Google: </h4>
                    <div className={AuthenticationSettingsStyle.googleAuthState}>
                    {
                        this.state.googleLoading?<h4>Loading...</h4>: <>{
                            this.state.google?<><button onClick={this.disconnectGoogle}>{t('direct_translation_disconnect')}</button> <h4>{this.state.googleAccount.name+" "+this.state.googleAccount.email}</h4></>:<><div id="googleSignInButton" data-onsuccess="onGoogleSignIn"/></>
                        }
                        </>
                    }
                    </div>
                </div>
               */}
           </>
        );
    }
}

export default withTranslation()(AuthenticationSettings);