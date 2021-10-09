import React, {Component} from 'react';
import QuickActionsSelectorStyle from "./QuickActionsSelectorStyle.module.css"
import Selector from "../../UI/Selector/Selector";
import fawnImg from "../../res/fawn.svg";
import {withTranslation} from "react-i18next";


class QuickActionsSelector extends Component {
    render() {
        const {t} = this.props;
        return (
            <div className={QuickActionsSelectorStyle.pageContainer}>
            <h1 className={QuickActionsSelectorStyle.QuickActionSelectTitle}>{t('selectQuickAction')}</h1>

                <Selector items={[{link: "#", text: t('fawn_rescue'), img: fawnImg}]}/>
            </div>
        );
    }
}

export default withTranslation()(QuickActionsSelector);