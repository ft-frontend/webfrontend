import React, {Component} from 'react';
import api from "../../api/api";
import accountSettingsHandler from "../../settings/accountSettingsHandler";
import NavBar from "../../UI/NavBar/NavBar";
import ModuleStyle from "../moduleNavBar.module.css";
import AppSelector from "../../UI/appSelector/appSelector";
import UserLoginButtonControl from "../../UI/NavBar/UserLoginButtonControl";

class DroneNavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            buttons: [],
            renderNavBar: false
        }

    }


    componentDidMount() {
        const loc = window.location.pathname;
        api.checkSession().then(r => { if(!r) window.location.href = "/auth/signin?redirect="+loc.substring(0, loc.length)

            UserLoginButtonControl(r).then(buttons => this.setState({buttons:buttons,renderNavBar:true}))

        })
        api.getAccountSettings(false).then(r => accountSettingsHandler.handlerSettings(r.settings));



    }

    render() {
        return (
            <div>
                <NavBar renderElements={this.state.renderNavBar} renderAppSelector links={[
                    {
                        name: "Drohnen",
                        link: "/module/drone/select"
                    },
                    {
                        name: "Missions",
                        link: "/module/drone/missions"
                    }
                ]} buttons={this.state.buttons}>
                    <p className={ModuleStyle.moduleHeaderNavBarText}>Quadrocopter</p>

                </NavBar>
            </div>
        );
    }
}

export default DroneNavBar;