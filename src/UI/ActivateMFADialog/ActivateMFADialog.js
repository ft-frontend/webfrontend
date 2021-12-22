import React, {Component} from 'react';
import ActivateMFADialogStyle from "./ActivateMFADialog.module.css";
import api from "../../api/api";
import {withTranslation} from "react-i18next";


class ActivateMFADialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogWidth: 500,
            dialogHeight: 600,


        };
        this.closeCallback = this.props.onClose;
        this.onDialogClick = this.onDialogClick.bind(this);
        this.onDialogClose = this.onDialogClose.bind(this);
    }

    onDialogClick(event) {
        event.stopPropagation();
    }

    onDialogClose(event) {

            this.closeCallback();


    }








    render() {
        const {t} = this.props;
        return (
            <>
                <div className={ActivateMFADialogStyle.dialogPageWrapper} >

                    <div style={{width: this.state.dialogWidth + "px", height: this.state.dialogHeight + "px"}}
                         className={ActivateMFADialogStyle.dialog} onClick={this.onDialogClick}>

                        <div className={ActivateMFADialogStyle.dialogControl}>
                            <div className={ActivateMFADialogStyle.closeButtonWrapper} onClick={this.onDialogClose}>
                                <svg viewBox="0 0 24 24" focusable="false"
                                     className={ActivateMFADialogStyle.closeButton}>
                                   <path className={ActivateMFADialogStyle.closeButtonPath}
                                                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41"/>

                                </svg>
                            </div>
                        </div>


                        <div>

                            <img s></img>

                        </div>


                    </div>
                </div>
            </>
        );
    }
}

export default withTranslation()(ActivateMFADialog);