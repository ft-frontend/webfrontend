import React, {Component} from 'react';
import AccountButtonStyle from "./AccountButton.module.css"
import appSelectorStyle from "../appSelector/appSelector.module.css";
import $ from "jquery";

class AccountButton extends Component {
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
            <div className={AccountButtonStyle.accountCircle} onClick={this.toggleAccountPopUp}/>
                {this.state.showAccountPopUp&&<div className={AccountButtonStyle.accountPopUp}>

                    <a href="/auth/signout">Abmelden</a>

                </div>}
            </>
        );
    }
}

export default AccountButton;