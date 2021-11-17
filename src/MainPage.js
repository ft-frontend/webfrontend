import React from "react";
import NavBar from "./UI/NavBar/NavBar";
import api from "./api/api";
import UserLoginButtonControl from "./UI/NavBar/UserLoginButtonControl";
import accountSettingsHandler from "./settings/accountSettingsHandler";
import VersionNumber from "./UI/Version/VersionNumber";
import SideBar from "./UI/SideBar/SideBar";
import { withTranslation } from 'react-i18next';
import i18next from "i18next";

class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: [],
            renderNavBar: false,
            signIn: false
        }





    }


    componentDidMount() {
      //  api.checkSession().then(r => { if(r) window.location.replace("/dashboard");})
        api.toggleRedirect(false);
        if(api.isSessionCookieAvailable()) {
            this.setState({
                signIn: true
            })
        }
        this.setState({buttons:UserLoginButtonControl(api.isSessionCookieAvailable()),renderNavBar:true})
        api.checkSession().then(r => {
            this.setState({buttons:UserLoginButtonControl(r),renderNavBar:true,signIn:r})
        })
        api.getAccountSettings(false).then(r => {if(r.settings!==undefined)accountSettingsHandler.handlerSettings(r.settings)});

    }
    componentWillUnmount() {
        api.toggleRedirect(true);

    }

    render() {
        return <><NavBar renderElements={this.state.renderNavBar} links={[
            {
                name: "Home",
                link: "#"
            },
            {
                name: "Software",
                link: "https://www.github.com/ft-cloud"
            }
        ]} buttons={this.state.buttons}/>
            {
                this.state.signIn&&<SideBar/>
            }
            <div style={{marginLeft: "70px"}}>


                {
                    !this.state.signIn&&<>

                    <button onClick={()=>{i18next.changeLanguage('de')}}>Deutsch</button>
                    <button onClick={()=>{i18next.changeLanguage('en')}}>English</button>

                    </>
                }

        </div>

            </>;

    }
}

export default withTranslation()(MainPage);