import React, {Component} from 'react';
import AccountButtonStyle from "./AccountButton.module.css"
import $ from "jquery";
import editIcon from "../../res/edit.svg";
import {withTranslation} from "react-i18next";
import api from "../../api/api";
import ChangeProfilePicture from "../ChangeProfilePictureDialog/ChangeProfilePicture";
import EventSystem from "../../EventSystem";

class AccountNavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAccountPopUp: false,
            isProfilePictureDialogOpen: false,
            profilePictureURL: api.getProfilePictureURL()

        }
        this.toggleAccountPopUp = this.toggleAccountPopUp.bind(this);
        this.closeChangeProfilePictureDialog = this.closeChangeProfilePictureDialog.bind(this);
        this.openProfilePictureDialog = this.openProfilePictureDialog.bind(this);
        this.updateProfilePictureURL = this.updateProfilePictureURL.bind(this);
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
        EventSystem.on('profilePictureChange',this.updateProfilePictureURL)

    }
    updateProfilePictureURL() {
        this.setState({
            profilePictureURL: api.getProfilePictureURL()+"&force="+Math.random(),
        })
    }

    componentWillUnmount() {
        $(document).off('click',  this.handler);
        EventSystem.on('profilePictureChange',this.updateProfilePictureURL)
    }
    closeChangeProfilePictureDialog() {
        this.setState({
            isProfilePictureDialogOpen: !this.state.isProfilePictureDialogOpen
        })
    }
    openProfilePictureDialog() {
        this.setState({
            isProfilePictureDialogOpen: true
        })
    }

    render() {
        const {t} = this.props;
        return (
            <>
                {
                    this.state.isProfilePictureDialogOpen&&<ChangeProfilePicture onClose={this.closeChangeProfilePictureDialog}/>
                }

                <div className={AccountButtonStyle.accountNavBarContainer}>
                    <div className={AccountButtonStyle.accountCircle} onClick={this.toggleAccountPopUp}>
                        <img className={AccountButtonStyle.accountCircleImage} src={this.state.profilePictureURL}/>

                    </div>
                {this.state.showAccountPopUp&&<div className={AccountButtonStyle.accountPopUp}>


                    <div className={AccountButtonStyle.accountImageWrapper}>
                        <div className={AccountButtonStyle.accountImage}>

                            <img className={AccountButtonStyle.accountCircleImage} src={this.state.profilePictureURL}/>

                        </div>
                        <div className={AccountButtonStyle.accountImageChangeButton}>
                            <img  src={editIcon} alt="edit" onClick={this.openProfilePictureDialog} className={AccountButtonStyle.accountImageChangeButtonImage}/>
                        </div>


                    </div>
                    <div className={AccountButtonStyle.accountNameContainer}>
                        <p>{window.localStorage.getItem('username')}</p>
                    </div>

                    <div className={AccountButtonStyle.manageAccountButton} onClick={()=>window.location.href="/settings#4"}><p>{t('manageAccount')}</p></div>
                    <div className={AccountButtonStyle.signOutButton} onClick={()=>window.location.href="/auth/signout"}>
                        <p className={AccountButtonStyle.signOutButtonText}>{t('signOut')}</p>
                    </div>

                </div>}
                <p className={AccountButtonStyle.UserNameNavBar}>{window.localStorage.getItem('username')}</p>
                </div>
            </>
        );
    }
}

export default withTranslation()(AccountNavBar);