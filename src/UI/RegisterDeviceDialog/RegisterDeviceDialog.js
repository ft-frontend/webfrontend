import React, {Component} from 'react';
import RegisterDeviceStyle from "./RegisterDeviceDialog.module.css";
import api from "../../api/api";
import {withTranslation} from "react-i18next";
import FloatingButton from "../FloatingButton/FloatingButton";
import $ from "jquery";


class RegisterDeviceDialog extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogWidth: 500,
            dialogHeight: 600,
            error: false,
            open: false,
            currentRegistrationNumber: "",
            errorMessage: ""


        };
        this.closeCallback = this.props.onClose;
        this.onDialogClick = this.onDialogClick.bind(this);
        this.codeChange = this.codeChange.bind(this);
        this.onDialogClose = this.onDialogClose.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.handleColorClick = this.handleColorClick.bind(this);
        this.registerDevice = this.registerDevice.bind(this);
    }

    openDialog() {
        this.setState({open: true});
    }

    onDialogClick(event) {
        event.stopPropagation();
    }

    onDialogClose(event) {

        this.setState({
            open: false
        });


    }


    handleColorClick(event) {

        const color = event.target.getAttribute("color");

        if (color === "red") {
            $(event.target).css("background-color", "rgb(0, 255, 0)");
            $(event.target).attr("color", "green");
        } else if (color === "green") {
            $(event.target).css("background-color", "rgb(0, 0, 255)");
            $(event.target).attr("color", "blue");
        } else if (color === "blue") {
            $(event.target).css("background-color", "rgb(255, 255, 255)");
            $(event.target).attr("color", "white");
        } else {
            $(event.target).css("background-color", "rgb(255, 0, 0)");
            $(event.target).attr("color", "red");

        }

        let counter = 0;
        let tempRegNum = 0;
        $("." + RegisterDeviceStyle.AddDeviceColorClicker).parent().children().each(function () {


            if ($(this).attr("color") === "white") {

                tempRegNum = tempRegNum | (0x00 << counter);
            }
            if ($(this).attr("color") === "red") {
                tempRegNum = tempRegNum | (0x01 << counter);

            }
            if ($(this).attr("color") === "green") {
                tempRegNum = tempRegNum | (0x02 << counter);

            }
            if ($(this).attr("color") === "blue") {
                tempRegNum = tempRegNum | (0x03 << counter);

            }
            counter += 2;
        });

        this.setState({
            currentRegistrationNumber: tempRegNum
        });


    }

    codeChange(e) {

        const codeUserInput = e.target;
        if (codeUserInput.value > 16383) codeUserInput.value = 16383;
        if (codeUserInput.value < 0) codeUserInput.value = 0;
        codeUserInput.value = codeUserInput.value * 1;

        if(isNaN(codeUserInput.value)){
            codeUserInput.value = 0;
        }


        this.setState({
            currentRegistrationNumber: e.target.value
        });

        const tempRegNum = e.target.value;
        let codeUserInputCounter = 0;
        $("." +  RegisterDeviceStyle.AddDeviceColorClicker).parent().children().each(function () {
            const currentColorIterator = (tempRegNum >> codeUserInputCounter) & 0x03;
            switch (currentColorIterator) {
                case 0: {
                    $(this).css("background-color", "rgb(255, 255, 255)");
                    $(this).attr("color", "white");
                    break;
                }
                case 1: {
                    $(this).css("background-color", "rgb(255, 0, 0)");
                    $(this).attr("color", "red");
                    break;
                }
                case 2: {
                    $(this).css("background-color", "rgb(0, 255, 0)");
                    $(this).attr("color", "green");
                    break;
                }

                case 3: {
                    $(this).css("background-color", "rgb(0, 0, 255)");
                    $(this).attr("color", "blue");
                    break;
                }
                default:
                    break;

            }
            codeUserInputCounter += 2;
        });


    }

    registerDevice(event) {
        api.registerDevice(this.state.currentRegistrationNumber).then((result) => {
            if (result.errorcode==null) {


                this.setState({
                    open: false
                });
                window.location.href = "/dashboard/device/" + result.deviceType + "/" + result.uuid;
            } else {
                this.setState({
                    error: true,
                    errorMessage: result.errorcode
                });

            }

        });
    }


    render() {
        const {t} = this.props;
        return (
            <>
                {this.state.open ?
                    <div className={RegisterDeviceStyle.dialogPageWrapper}>

                        <div style={{width: this.state.dialogWidth + "px", height: this.state.dialogHeight + "px"}}
                             className={RegisterDeviceStyle.dialog} onClick={this.onDialogClick}>

                            <div className={RegisterDeviceStyle.dialogControl}>
                                <div className={RegisterDeviceStyle.closeButtonWrapper} onClick={this.onDialogClose}>
                                    <svg viewBox="0 0 24 24" focusable="false"
                                         className={RegisterDeviceStyle.closeButton}>
                                        <path className={RegisterDeviceStyle.closeButtonPath}
                                              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41"/>

                                    </svg>
                                </div>


                            </div>


                            <div className={RegisterDeviceStyle.dialogContent}>
                                <h1 className={RegisterDeviceStyle.headline + " ignoreDarkMode"}>{t('direct_translation_deviceRegistration')}</h1>
                                <p className={RegisterDeviceStyle.description + " ignoreDarkMode"}> {t('deviceRegistrationDescription')}</p>




                                <input onChange={this.codeChange} value={this.state.currentRegistrationNumber} placeholder={"Code"} type="text" inputMode="numeric" pattern="[0-9]*" maxLength={4} max={16383} min={0}
                                       className={RegisterDeviceStyle.codeInput}></input>

                                <div className={RegisterDeviceStyle.AddDeviceDialogColorCodeSelectionBox}>
                                    <div color="red" onClick={this.handleColorClick}
                                         className={RegisterDeviceStyle.AddDeviceColorClicker}/>
                                    <div color="red" onClick={this.handleColorClick}
                                         className={RegisterDeviceStyle.AddDeviceColorClicker}/>
                                    <div color="red" onClick={this.handleColorClick}
                                         className={RegisterDeviceStyle.AddDeviceColorClicker}/>
                                    <div color="red" onClick={this.handleColorClick}
                                         className={RegisterDeviceStyle.AddDeviceColorClicker}/>
                                    <div color="red" onClick={this.handleColorClick}
                                         className={RegisterDeviceStyle.AddDeviceColorClicker}/>
                                    <div color="red" onClick={this.handleColorClick}
                                         className={RegisterDeviceStyle.AddDeviceColorClicker}/>
                                    <div color="red" onClick={this.handleColorClick}
                                         className={RegisterDeviceStyle.AddDeviceColorClicker}/>
                                </div>





                                <div onClick={this.registerDevice}
                                     className={RegisterDeviceStyle.registerDeviceButton}><span>Verbinden</span></div>

                                {
                                    this.state.error &&
                                    <div className={RegisterDeviceStyle.error}>{this.state.errorMessage}</div>
                                }

                            </div>



                        </div>
                    </div> :
<></>

                }
                <FloatingButton callback={this.openDialog} text={"+"}/>

            </>
        );
    }
}

export default withTranslation()(RegisterDeviceDialog);