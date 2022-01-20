import React, {Component} from 'react';
import FawnRescueStyle from "./FawnRescueStyle.module.css"
import {withTranslation} from "react-i18next";
import {TiTick, TiWarning} from "react-icons/ti";

class FawnRescue extends Component {
    render() {
        const {t} = this.props;
        return (
            <div className={FawnRescueStyle.pageContainer}>

                <h1 className={FawnRescueStyle.FawnRescueTitle}>{t('fawnRescueHeading')}</h1>



                <div  className={FawnRescueStyle.list}>

                    <div className={FawnRescueStyle.requirements}>
                        <p>Account-Kompatibilität:</p>
                        <TiTick color={"#00FF00"}></TiTick>
                    </div>

                    <div className={FawnRescueStyle.requirements}>
                        <p>Server-Verfügbarkeit:</p>
                        <TiTick color={"#00FF00"}></TiTick>
                    </div>

                    <div className={FawnRescueStyle.requirements}>
                        <p>Kompatible Drohne:</p>
                        <TiWarning color={"#FF0000"}></TiWarning>
                    </div>

                    <div className={FawnRescueStyle.requirements}>
                        <p>Speicherplatz für die Mission:</p>
                        <TiTick color={"#00FF00"}></TiTick>

                    </div>

                    <div className={FawnRescueStyle.requirements}>
                        <p>Software Version der Drohne V0.2:</p>
                        <TiTick color={"#00FF00"}></TiTick>
                    </div>




                </div>


            </div>
        );
    }
}

export default withTranslation()(FawnRescue);