import React, {Component} from 'react';
import AccountButtonStyle from "./AccountButton.module.css"
import appSelectorStyle from "../appSelector/appSelector.module.css";
import $ from "jquery";
import editIcon from "../../res/edit.svg";

class AccountNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAccountPopUp: false
        }
        this.toggleAccountPopUp = this.toggleAccountPopUp.bind(this);
    }

    toggleAccountPopUp() {
        this.setState({
            showAccountPopUp:!this.state.showAccountPopUp
        })
    }

    componentDidMount() {
        const obj = this;
        this.handler = function (e) {
            if ($(e.target).closest("."+AccountButtonStyle.accountPopUp).length === 0&&$(e.target).closest("."+AccountButtonStyle.accountCircle).length === 0) {
                obj.setState({
                    showAccountPopUp: false
                })

            }
        };
        $(document).on('click',  this.handler);
    }
    componentWillUnmount() {
        $(document).off('click',  this.handler);

    }


    render() {

        return (
            <>
                <div className={AccountButtonStyle.accountNavBarContainer}>
            <div className={AccountButtonStyle.accountCircle} onClick={this.toggleAccountPopUp}/>
                {this.state.showAccountPopUp&&<div className={AccountButtonStyle.accountPopUp}>


                    <div className={AccountButtonStyle.accountImageWrapper}>
                        <div className={AccountButtonStyle.accountImage}/>
                        <div className={AccountButtonStyle.accountImageChangeButton}>
                            <img  src={editIcon} alt="edit" className={AccountButtonStyle.accountImageChangeButtonImage}
                                 />

                        </div>
                    </div>
                    <div className={AccountButtonStyle.accountNameContainer}>
                        <p>{window.localStorage.getItem('username')}</p>
                    </div>

                    <div className={AccountButtonStyle.manageAccountButton} onClick={()=>window.location.href="/dashboard/settings"}><p>Account verwalten</p></div>
                    <div className={AccountButtonStyle.signOutButton} onClick={()=>window.location.href="/auth/signout"}>
                        <p className={AccountButtonStyle.signOutButtonText}>Abmelden</p>
                    </div>

                </div>}
                <p className={AccountButtonStyle.UserNameNavBar}>{window.localStorage.getItem('username')}</p>
                </div>
            </>
        );
    }
}

export default AccountNavBar;