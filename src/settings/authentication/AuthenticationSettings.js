import React, {Component} from 'react';
import api from "../../api/api";

class AuthenticationSettings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            google: false,
            googleUsername: "",
            googleEmail: ""
        }
    }

    componentDidMount() {
        const meta = document.createElement("meta");
        meta.name = "google-signin-client_id";
        meta.content = "213041413684-upirs2j8p9ute8tjohkd1bqpnrqv49h8.apps.googleusercontent.com"

        document.head.appendChild(meta)
        //Google Oauth
        let script = document.createElement("script");
        script.type = "application/javascript";
        script.async = true;
        script.defer = true;

        script.src = "https://apis.google.com/js/platform.js";
        document.body.appendChild(script);

        script.onload = function () {
            api.getAccountAuth().then(auth=> {

            })
        }


        window.onGoogleSignIn = function (googleUser) {
            let profile = googleUser.getBasicProfile();
            api.saveAccountAuth("google",googleUser.getAuthResponse().id_token).then(()=> {
                this.setState({
                    googleUsername: profile.getName(),
                    googleEmail: profile.getEmail(),
                    google: true
                })
            })
        }




    }
    render() {
        return (
            <div>
                <div className="g-signin2" data-onsuccess="onGoogleSignIn"/>

            </div>
        );
    }
}

export default AuthenticationSettings;