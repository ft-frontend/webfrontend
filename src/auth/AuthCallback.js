import React, {Component} from 'react';
import api, {cookies} from "../api/api";
import authStyle from "./sign.module.css"
import {withTranslation} from "react-i18next";

class AuthCallback extends Component {


    constructor(props) {
        super(props);
        this.state = {
            error: false
        }
        this.auth = this.auth.bind(this);
    }



    render() {
        const {t} = this.props;
        return (
            <div className={authStyle.loginBackground} >
                <div className={authStyle.signinform}>
                    <h1>{t('direct_translation_authorization')}</h1>
                    {!this.state.error?<>
                    <p>{t('authorizationInfoText')}</p>
                <button onClick={this.auth}>{t('allowAccess')}</button></>:<>
                        <p >{t('authorizationFailed')}</p>
                    </>
                    }
                </div>
            </div>
        );
    }




    auth() {
        api.addApiKey().then(result => {
            if(result.success) {
                const redirect = cookies.get("redirect_uri");
                const state = cookies.get("state");
                cookies.remove("redirect_uri")
                cookies.remove("state")

                window.location.href = redirect+`#state=${state}&access_token=${result.apiKey}&token_type=Bearer`;


            }
        })
    }



     componentDidMount() {
        const params = new URLSearchParams(window.location.search);

         if(cookies.get("redirect_uri")==null) {
             console.log("test")
             if(params.get("redirect_uri")!=null) {
                 cookies.set("redirect_uri", params.get("redirect_uri"));
             }else{
                 this.setState({error: true});
             }
        }
         if(cookies.get("state")==null) {
            if(params.get("state")!=null) {
                cookies.set("state", params.get("state"));
            }else{
                this.setState({error: true});
            }
        }

         const loc = window.location.pathname;
         api.checkSession().then(r => { if(!r) window.location.href = "/auth/signin?redirect="+loc.substring(0, loc.length)});



     }
}

export default withTranslation()(AuthCallback);