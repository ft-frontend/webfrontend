import React, {Component} from 'react';
import {withTranslation} from "react-i18next";
import MissionGeneratorHeightSelectionStyle from "./MissionGeneratorHeightSelectionStyle.module.css"

class MissionGeneratorHeightSelection extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        const {t} = this.props;
        return (
            <div>
                <label  className={MissionGeneratorHeightSelectionStyle.heightSelectionLabel} for={"heightSelectionMissionGenerator"}>{t('direct_translation_flightHeight')}</label>
                <input className={MissionGeneratorHeightSelectionStyle.heightSelection} onChange={this.props.heightChange} defaultValue={1} type="number" id={"heightSelectionMissionGenerator"}/>
            </div>
        );
    }
}

export default withTranslation()(MissionGeneratorHeightSelection);