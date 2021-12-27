import React, {Component} from 'react';
import NavBar from "../../UI/NavBar/NavBar";
import i18next from "i18next";
import StaticPageUi from "../StaticPageUI";
import ReactPlayer from "react-player";
import {Controller, Scene} from "react-scrollmagic";
import RekariStyle from "./rekariStyle.module.css";
import MissionPlanner from "../../module/drone/missionPlaner/MissionPlanner";
import MissionMap from "../../module/drone/missionPlaner/MissionMap";
import ZigZagMap from "../../module/drone/missionPlaner/missionGenerator/ZigZag/ZigZagMap";
import TestMissionGeneratorResultViewer
    from "../../module/drone/missionPlaner/missionGenerator/TestMissionGeneratorResultViewer";

class Rekari extends Component {
    constructor(props) {
        super(props);
        this.state = {
            generatedTestMission: null
        };
    }

    render() {
        return (
            <>
                <StaticPageUi renderSideBar={false}/>


                <div className={RekariStyle.headLineContainer}>
                    <h1 className={RekariStyle.headLine+" ignoreDarkMode"}>Rekari</h1>
                    <p className={RekariStyle.subheading+" ignoreDarkMode"}>Rehkitzrettung durch intelligente Drohnen neu durchdacht</p>
                    <p className={RekariStyle.subheading+" ignoreDarkMode"}>Durch das Rekari-System können Rehkitze schneller gerettet
                        werden und die Helfer entlastet werden</p>
                </div>



                <div className={RekariStyle.sectionWrapper}>

                    <div className={RekariStyle.intelligentDroneHeadline}>Intelligente Drohne</div>


                    <div className={RekariStyle.section}>

                        <div className={RekariStyle.sectionPart}>
                            <div className={RekariStyle.drone3dmodlefirstsection}> 3d Objekt
                            </div>


                        </div>


                        <div className={RekariStyle.sectionPart}>

                            <div className={RekariStyle.sectionHeader}>Autonome Flugdrohne</div>

                            <div className={RekariStyle.sectionExplain}>
                                Mit dem Herzstück des Rekari-Systems überzeugt der selbstfliegende Quadrocopter mit
                                intuitiven Features.
                                Durch unseren eigens entwickelten, intelligenten Flugcontroller ist das Abfliegen des
                                Feldes und das Kartograpieren der Umgebung kein Problem mehr.
                                Dabei sorgt das robuste Design der Flugdrohne für eine hohe Leistungsfähigkeit und eine
                                branchenführende Stabilität.
                            </div>

                        </div>


                    </div>

                    <div className={RekariStyle.section}>

                        <div className={RekariStyle.sectionPart}>


                            <div className={RekariStyle.sectionHeader}>Fest installierte Wärmebildkamera*</div>

                            <div className={RekariStyle.sectionExplain}>
                                Durch den festen Verbau einer Wärmebildkamera kann diese sinnvoll in das Flugsystem
                                der Drohne integriert werden.
                                Dadurch ist es Möglich durch nur ein System die Drohne, die Wärmebildkamera und alle
                                weiteren Funktionen zu verwalten.
                                Dabei wollen wir weg von provisorisch installierten Wärmebildkameras, die mit nur
                                wenigen Live-Monitoren überwacht werden können.

                            </div>
                            <div className={RekariStyle.footnote}>*Aktuell befindet sich dieses Feature noch in der
                                Entwicklungsphase
                            </div>

                        </div>


                        <div className={RekariStyle.sectionPart}>


                        </div>


                    </div>


                    <div className={RekariStyle.section}>

                        <div className={RekariStyle.sectionPart}>


                        </div>


                        <div className={RekariStyle.sectionPart}>

                            <div className={RekariStyle.sectionHeader}>Große Propeller</div>

                            <div className={RekariStyle.sectionExplain}>
                                Durch den Einsatz von großen Propellern kann die Drohne die Motordrehzahl reduzieren,
                                und so die Flugzeit verlängern.
                                Außerdem kann die Drohne so sichere Flüge durchführen, da durch die gewählten Propellern
                                besser von Wind geschützt ist.

                            </div>


                        </div>


                    </div>

                    {/* Cloud section*/}
                    <div className={RekariStyle.CenterSection}>

                        <div className={RekariStyle.cloudSectionHeader}>Intelligente Cloudanbindung</div>

                        <div className={RekariStyle.cloudSectionIMG}>PlaceHolder IMG Connect</div>

                        <div className={RekariStyle.cloudSectionExplain}>
                            Durch die sinnvolle Anbindung der Drohne an die Cloud, können Bild-Daten in Echtzeit
                            ausgewertet werden.
                            Des Weiteren kann die Mission zum Abfliegen des Feldes mit nur einem Klick auf die Drohne
                            übertragen werden.
                            Über die Cloud kann während der Rettung den Suchhelfern die erstelle Wärmebildkarte zur
                            Verfügung gestellt werden.²

                        </div>

                    <div className={RekariStyle.uiexplainheadline}>Intuitive Benutzeroberfläche</div>
                    <div className={RekariStyle.sectionExplain}>
                        Wir haben alle Funktion der Cloud aus der Sicht des Benutzers integriert, um eine intuitive und einfache Bedienung zu ermöglichen. Nur so lässt sich dieses System ohne lange Einweisungen in den vorhandenen Workflow einsetzen.
                    </div>
                    </div>


                    <div className={RekariStyle.section}>

                        <div className={RekariStyle.sectionPart}>
                            <div className={RekariStyle.sectionHeader}>Account-System</div>

                            <div className={RekariStyle.sectionExplain}>
                                Durch das Account-System der Cloud kann jeder Verein einen eigene Zugang erhalten.
                                Dadurch können Mission zum Abfliegen der Felder zentral gespeichert werden, damit
                                ist sichergestellt, dass die Mission jedem zur Verfügung steht.
                                Auch kann die Drohne im Cloudportal verwaltet werden und Einstellungen vorgenommen
                                werden.
                                Zusätzlich kann jeder Account durch eine Zwei-Faktor-Authentifizierung gesichert
                                werden.³
                            </div>
                        </div>

                        <div className={RekariStyle.sectionPart}>
                            <img className={RekariStyle.accountSystemImg} src={"/rekari/accountSystem.png"}
                                 alt={"Account Verwaltung"}/>
                        </div>

                    </div>



                    <div className={RekariStyle.section}>

                        <div className={RekariStyle.sectionPart}>
                            <img className={RekariStyle.accountSystemImg} src={"/rekari/deviceControl.png"}
                                 alt={"Gerät Verwaltung"}/>
                        </div>

                        <div className={RekariStyle.sectionPart}>



                            <div className={RekariStyle.sectionHeader}>Geräte-Verwaltung</div>

                            <div className={RekariStyle.sectionExplain}>
                               Mit der Cloud können Geräte ganz einfach online verwaltet werden. Dabei kann Name des Geräts und verschiedene Parameter mit nur wenigen Klicks verändert werden.
                                Auch können Geräte im Cloudportal mit mehreren Benutzern verknüpft werden. Dadurch ist das Teilen von Beispielweise Drohnen ein Kinderspiel.
                            </div>
                        </div>

                    </div>

                    <div className={RekariStyle.CenterSection}>
                        <div className={RekariStyle.missionGeneratorHeadline}>Mission-Generatoren</div>

                        <div className={RekariStyle.missionGeneratorExplain}>
                            Durch die Mission-Generatoren kann durch nur das einfache Umrahmen des Feldes eine Mission
                            generiert werden.
                            Dabei berechnet unser intelligenter Algorithmus völlig automatisch die optimale Mission.
                            Der Algorithmus kann direkt hier getestet werden. Dafür einfach auf der Karte zu einem Feld zoomen und an den Ecken des Feldes mit der rechten Maustaste Punkte setzen.
                            Anschließend muss nur mit dem Klick auf <q>Anwenden</q> der Prozess gestartet werden.
                        </div>

                        <div className={RekariStyle.section}>


                            <div className={RekariStyle.MissionSectionPart}>


                                {
                                    this.state.generatedTestMission ?
                                       <> <TestMissionGeneratorResultViewer style={{
                                           height: '80%',
                                           width: '100%',
                                           userSelect: 'none',
                                           borderRadius: '15px',
                                           overflow: 'hidden'

                                       }}
                                                                            mission={this.state.generatedTestMission}/>
                                       <div style={{
                                           marginTop: "30px",

                                           padding: "10px",
                                           paddingLeft: "20px",
                                           paddingRight: "20px",

                                           backgroundColor: "#0088a9",
                                           cursor: "pointer",
                                           borderRadius: "5px"

                                       }} onClick={()=>{this.setState({generatedTestMission:null})}}>Zurück</div></>
                                        :

                                        <ZigZagMap style={{
                                            height: '80%',
                                            width: '100%',
                                            userSelect: 'none',
                                            borderRadius: "15px",
                                            overflow: 'hidden'
                                        }} buttonStyle={{
                                            marginTop: "30px",

                                            padding: "10px",
                                            paddingLeft: "20px",
                                            paddingRight: "20px",

                                            backgroundColor: "#0088a9",
                                            cursor: "pointer",
                                            borderRadius: "5px"

                                        }} generateMissionCallback={(mission) => {
                                            this.setState({generatedTestMission: mission});
                                        }} testMode={true} planner={true} missionName={"Demo"} missionUUID={"-1"}
                                                   missionData={[]}/>

                                }
                            </div>

                        </div>

                    </div>


                </div>


                <div className={RekariStyle.footer}>
                    <div className={RekariStyle.footerWrapper}>
                    <div className={RekariStyle.footerSection}>
                        <div className={RekariStyle.footerSectionHeadline}>Über uns</div>
                        <div className={RekariStyle.footerSectionElement} onClick={()=>{window.open("https://github.com/coder246",'_blank')}}>Github (Tim)</div>
                        <div className={RekariStyle.footerSectionElement} onClick={()=>{window.open("https://github.com/felixpc",'_blank')}}>Github (Felix)</div>
                        <div className={RekariStyle.footerSectionElement} onClick={()=>{window.open("https://github.com/ft-cloud/Documentation/wiki",'_blank')}}>Dokumentation</div>

                    </div>

                        <div className={RekariStyle.seperator}/>

                    <div className={RekariStyle.footerSection}>
                        <div className={RekariStyle.footerSectionHeadline}>Andere Projekte</div>
                        <div className={RekariStyle.footerSectionElement} onClick={()=>{window.open("https://github.com/ft-ki/ekes",'_blank')}}>EKES - Simulation</div>
                        <div className={RekariStyle.footerSectionElement} onClick={()=>{window.open("https://www.jugend-forscht-bayern.de/landeswettbewerb-bayern/landeswettbewerb-jugend-forscht/projekte/mathematik-informatik/EKES%20-%20Einfache%20KI-basierte%20Evolutions-Simulation",'_blank')}}>JugendForscht 2021</div>
                        <div className={RekariStyle.footerSectionElement} onClick={()=>{window.open("https://github.com/ledtisch",'_blank')}}>Interaktiver LEDTisch</div>

                    </div>

                        <div className={RekariStyle.seperator}/>


                        <div className={RekariStyle.footerSection}>
                        <div className={RekariStyle.footerSectionHeadline}>Informationen</div>

                            <div className={RekariStyle.footerSectionElement} onClick={()=>{window.open("#",'_blank')}}>Impressum</div>
                            <div className={RekariStyle.footerSectionElement} onClick={()=>{window.open("#",'_blank')}}>Datenschutz</div>


                    </div>
                    </div>
                </div>



            </>
        );
    }


}

export default Rekari;