import React, {Component} from 'react';
import missionSelectStyle from "../missionSelectStyle.module.css";
import AddMissionButton from "../AddMissionButton";
import Selector from "../../../../UI/Selector/Selector";
import {withTranslation} from "react-i18next";
import zigzag from "../../../../res/zigzag.svg"

class SelectGenerator extends Component {
    constructor(props) {
        super(props);


    }


    render() {
        const {t} = this.props;
        const mission = this.props.match.params.mission;

        return (
            <div className={missionSelectStyle.pageContainer}>
                <div className={missionSelectStyle.missionSelectTopLine}>
                    <h1 className={missionSelectStyle.missionSelectTitle}>{t('selectGenerator')}</h1>
                </div>

        <Selector items={[{link: "/module/drone/missions/generators/:mission/zigzag".replace(":mission",mission),text:t('direct_translation_zigzag'),img: zigzag}]}/>
            </div>
        );
    }
}

export default withTranslation()(SelectGenerator);