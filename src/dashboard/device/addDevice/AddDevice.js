import React from "react";
import AddDeviceStyle from "./AddDeviceStyle.module.css"
import $ from 'jquery';
import api from "../../../api/api";

class AddDevice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuOpened: false,
            currentRegistrationNumber: 0,
           errorMessage: ""
        }
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);

        this.handleColorClick = this.handleColorClick.bind(this);
        this.updateColorClicker = this.updateColorClicker.bind(this);

        this.registerDevice = this.registerDevice.bind(this);
    }

    openMenu() {
        this.setState({
            menuOpened: true
        })
    }

    closeMenu() {
        this.setState({
            menuOpened: false
        })
    }

    handleColorClick(event) {
       const color = event.target.getAttribute("color")

        if (color== "red") {
            $(event.target).css("background-color", "rgb(0, 255, 0)")
            $(event.target).attr("color", "green");
        } else if (color== "green") {
            $(event.target).css("background-color", "rgb(0, 0, 255)")
            $(event.target).attr("color", "blue");
        } else if (color == "blue") {
            $(event.target).css("background-color", "rgb(255, 255, 255)")
            $(event.target).attr("color", "white");
        } else {
            $(event.target).css("background-color", "rgb(255, 0, 0)")
            $(event.target).attr("color", "red");

        }

        let counter = 0;
        let tempRegNum = 0;
        $("."+AddDeviceStyle.AddDeviceColorClicker).parent().children().each(function () {


            if ($(this).attr("color") == "white") {

                tempRegNum = tempRegNum | (0x00 << counter)
            }
            if ($(this).attr("color") == "red") {
                tempRegNum = tempRegNum | (0x01 << counter)

            }
            if ($(this).attr("color") == "green") {
                tempRegNum = tempRegNum | (0x02 << counter)

            }
            if ($(this).attr("color") == "blue") {
                tempRegNum = tempRegNum | (0x03 << counter)

            }
            counter += 2;
        })

        this.setState({
            currentRegistrationNumber:  tempRegNum
        })
        console.log(tempRegNum)

    }

    updateColorClicker(event) {
        const codeUserInput = event.target;
        if (codeUserInput.value > 16383) codeUserInput.value = 16383;
        if (codeUserInput.value < 0) codeUserInput.value = 0;
        codeUserInput.value = codeUserInput.value * 1;
        this.setState({
            currentRegistrationNumber:event.target.value
        })
        const tempRegNum = event.target.value;
        console.log(tempRegNum)
        let codeUserInputCounter = 0;
        $("."+AddDeviceStyle.AddDeviceColorClicker).parent().children().each(function () {
            const currentColorIterator = (tempRegNum >> codeUserInputCounter) & 0x03;
            switch (currentColorIterator) {
                case 0: {
                    $(this).css("background-color", "rgb(255, 255, 255)")
                    $(this).attr("color", "white")
                    break;
                }
                case 1: {
                    $(this).css("background-color", "rgb(255, 0, 0)")
                    $(this).attr("color", "red")
                    break;
                }
                case 2: {
                    $(this).css("background-color", "rgb(0, 255, 0)")
                    $(this).attr("color", "green")
                    break;
                }

                case 3: {
                    $(this).css("background-color", "rgb(0, 0, 255)")
                    $(this).attr("color", "blue")

                    break;
                }

            }
            codeUserInputCounter += 2;
        })

    }

    registerDevice(event) {
        console.log("register")
        api.registerDevice(this.state.currentRegistrationNumber).then((result) => {
            if(result.success) {


                this.setState({
                    menuOpened: false
                })
                window.location.href = "/dashboard/device/"+result.deviceType+"/"+result.uuid;
            }else{
                this.setState({
                    errorMessage: result.error
                })

            }

        })


    }



    render() {
        return <div>
            <button className={AddDeviceStyle.AddDeviceButton} onClick={this.openMenu}>Gerät hinzufügen + </button>
            {
                this.state.menuOpened &&

                <div>
                <div className={AddDeviceStyle.AddDeviceDialog} >
                    <input onInput={this.updateColorClicker} type="number" placeholder="Code" className={AddDeviceStyle.AddDeviceDialogCodeUserInput} value={this.state.currentRegistrationNumber} max="16383" />
                    <button onClick={this.registerDevice} className={AddDeviceStyle.AddDeviceDialogRegisterNewDevice}>Verbinden</button>
                    <div className={AddDeviceStyle.AddDeviceDialogColorCodeSelectionBox}>
                        <div color="red" onClick={this.handleColorClick} className={AddDeviceStyle.AddDeviceColorClicker}/>
                        <div color="red" onClick={this.handleColorClick} className={AddDeviceStyle.AddDeviceColorClicker}/>
                        <div color="red" onClick={this.handleColorClick} className={AddDeviceStyle.AddDeviceColorClicker}/>
                        <div color="red" onClick={this.handleColorClick} className={AddDeviceStyle.AddDeviceColorClicker}/>
                        <div color="red" onClick={this.handleColorClick} className={AddDeviceStyle.AddDeviceColorClicker}/>
                        <div color="red" onClick={this.handleColorClick} className={AddDeviceStyle.AddDeviceColorClicker}/>
                        <div color="red" onClick={this.handleColorClick} className={AddDeviceStyle.AddDeviceColorClicker}/>
                    </div>
                    <p className={AddDeviceStyle.errorLabelAddDeviceDialog}>{this.state.errorMessage}</p>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className={AddDeviceStyle.closeAddDeviceDialog} href="#" onClick={this.closeMenu} >Schließen</a>
                </div>


                    <div className={AddDeviceStyle.AddDeviceDialogClickBlock}>
                    </div>


                </div>

            }


        </div>
    }

}

export default AddDevice;