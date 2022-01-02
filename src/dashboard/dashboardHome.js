import React from "react";
import dashboardStyle from "./dashboard.module.css";
import {withTranslation} from "react-i18next";

class dashboardHome extends React.Component {


    render() {
        const {t} = this.props;

        return <h1 className={dashboardStyle.textTitle} >{t('good_day')}</h1>
    }

}

export default withTranslation()(dashboardHome);