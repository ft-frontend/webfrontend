import React, {Component} from 'react';
import adminMeetStyle from "./adminMeetStyle.module.css"
import api from "../api/api";

class AdminMeet extends Component {

    constructor(props) {
        super(props);
        this.initMeet = this.initMeet.bind(this);
    }
    render() {
        return (
                <div id="jaas-container" className={adminMeetStyle.jaasContainer} />
        );
    }

    initMeet() {
        // eslint-disable-next-line no-undef

    }

        componentDidMount() {

            let script = document.createElement("script");
            script.type = "application/javascript";
            script.async = true;
            // GetMap function will be called when Bing Maps script is downloaded, so inside there initialize your map and other params
            script.src = "https://8x8.vc/external_api.min.js";
            script.onload = () => {
                // eslint-disable-next-line no-undef
                const japi = new JitsiMeetExternalAPI("8x8.vc", {
                    roomName: "vpaas-magic-cookie-8bcaafab524f422394bdbf4e820d30a0/Admin Meeting",
                    parentNode: document.querySelector('#jaas-container'),
                    configOverwrite: {defaultLanguage: 'de',
                        enableNoisyMicDetection: false,
                        toolbarButtons: [
                            'camera',
                            'chat',
                            'desktop',
                            'filmstrip',
                            'fullscreen',
                            'hangup',
                            'microphone',
                            'participants-pane',
                            'profile',
                            'raisehand',
                            'select-background',
                            'settings',
                            'sharedvideo',
                            'shortcuts',
                            'stats',
                            'tileview',
                            'toggle-camera',
                            '__end'
                        ],disableInviteFunctions: true,hideConferenceSubject: true,disableRemoteMute: true,prejoinPageEnabled: false,enableSaveLogs: false},


                });
                api.getUserAccountInfo().then(accountInfo => {
                    japi.executeCommand('displayName', accountInfo.name);

                })

                japi.executeCommand('displayName', 'New Nickname');


                japi.addListener("readyToClose",()=> {
                    japi.dispose();
                    window.location.href = "/admin";
                })
            };
            document.head.appendChild(script);
            console.log(document.body)



    }
}

export default AdminMeet;