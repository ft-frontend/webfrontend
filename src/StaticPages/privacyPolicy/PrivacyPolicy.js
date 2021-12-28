import React, {Component} from 'react';
import StaticPageUI from "../StaticPageUI";
import {withTranslation} from "react-i18next";

class PrivacyPolicy extends Component {
    render() {
        const {t} = this.props;
        return (
            <>
             <StaticPageUI/>
                <div>{t('direct_translation_privacyPolicy')}</div>


            </>
        );
    }
}

export default withTranslation()(PrivacyPolicy);