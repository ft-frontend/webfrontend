import React, {Component} from 'react';

import StaticPageUi from "../StaticPageUI";
import RekariStyle from "./rekariStyle.module.css";

import ZigZagMap from "../../module/drone/missionPlaner/missionGenerator/ZigZag/ZigZagMap";
import TestMissionGeneratorResultViewer
    from "../../module/drone/missionPlaner/missionGenerator/TestMissionGeneratorResultViewer";
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import api from "../../api/api";

class Rekari extends Component {
    constructor(props) {
        super(props);
        const isDesktop = window.innerWidth > 900;
        this.state = {
            generatedTestMission: null,
            isDesktop: isDesktop,
            send: false,
            sendPending: false,
            message: "",
            name: "",
            email: ""
        };

        window.onresize = () => {
            const isDesktop = window.innerWidth > 900;
            this.setState({isDesktop: isDesktop});
        };

        this.sendMessage = this.sendMessage.bind(this);

    }

    render() {
        const {isDesktop} = this.state;
        return (
            <>
                <StaticPageUi renderSideBar={false}/>


                <div className={RekariStyle.headLineContainer}>
                    <h1 className={RekariStyle.headLine + " ignoreDarkMode"}>Rekari</h1>
                    <p className={RekariStyle.subheading + " ignoreDarkMode"}>Rehkitzrettung durch intelligente Drohnen
                        neu durchdacht</p>
                    <p className={RekariStyle.subheading + " ignoreDarkMode"}>Durch das Rekari-System können Rehkitze
                        schneller gerettet
                        werden und die Helfer entlastet werden</p>



                </div>


                <div className={RekariStyle.sectionWrapper}>

                    <div className={RekariStyle.intelligentDroneHeadline}>Intelligente Drohne</div>


                    <div className={isDesktop ? RekariStyle.section : RekariStyle.sectionContentUnderneath}>


                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>
                            <div className={RekariStyle.drone3dmodlefirstsection}> 3d Objekt
                            </div>


                        </div>


                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>

                            <div className={RekariStyle.sectionHeader}>Autonome Flugdrohne</div>

                            <div className={isDesktop ? RekariStyle.sectionExplain : RekariStyle.sectionExplainMobil}>
                                Als Zentrum des Rekari-Systems überzeugt der selbstfliegende Quadrocopter mit
                                intuitiven Features.

                                Dabei sorgt das robuste Design der Flugdrohne für eine hohe Leistungsfähigkeit und eine
                                branchenführende Stabilität.
                            </div>

                        </div>


                    </div>

                    <div className={isDesktop ? RekariStyle.section : RekariStyle.sectionContentAbove}>

                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>


                            <div className={RekariStyle.sectionHeader}>Fest installierte Wärmebildkamera¹</div>

                            <div className={isDesktop ? RekariStyle.sectionExplain : RekariStyle.sectionExplainMobil}>
                                Durch den festen Verbau einer Wärmebildkamera kann diese sinnvoll in das Flugsystem
                                der Drohne integriert werden.
                                Dadurch ist es Möglich durch nur ein System die Drohne, die Wärmebildkamera und alle
                                weiteren Funktionen zu verwalten.
                                Dabei wollen wir weg von provisorisch installierten Wärmebildkameras, die mit nur
                                wenigen Live-Monitoren überwacht werden können.

                            </div>


                        </div>


                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>


                        </div>


                    </div>

                    <div className={isDesktop ? RekariStyle.section : RekariStyle.sectionContentUnderneath}>

                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>
                            <img className={RekariStyle.SaveSectionImage} src={"/rekariAssets/propeller.jpg"}></img>
                        </div>


                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>

                            <div className={RekariStyle.sectionHeader}>Große Propeller</div>

                            <div className={isDesktop ? RekariStyle.sectionExplain : RekariStyle.sectionExplainMobil}>
                                Durch den Einsatz von großen Propellern kann die Drohne die Motordrehzahl reduzieren,
                                und so die Flugzeit verlängern.
                                Außerdem kann die Drohne so sicherere Flüge durchführen, da die gewählten Propeller
                                besser gegen Winde und Turbulenzen ankommen.

                            </div>


                        </div>


                    </div>

                    <div className={isDesktop ? RekariStyle.section : RekariStyle.sectionContentAbove}>

                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>


                            <div className={RekariStyle.sectionHeader}>Intelligenter Flight-Controller</div>

                            <div className={isDesktop ? RekariStyle.sectionExplain : RekariStyle.sectionExplainMobil}>
                                Der Flight-Controller ist das Herzstück einer jeden Drohne.
                                Er steuert und stabilisiert die Drohne während des gesamten Fluges.
                                Dadruch, dass wir unseren Flight-Controller von Grund auf neu entwickelt haben, können
                                wir die Drohne intelligent und intuitive benutzbar machen.
                                So ist das Abfliegen des Feldes und das Kartographieren der Umgebung kein Problem mehr.

                            </div>


                        </div>


                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>


                        </div>


                    </div>

                    <div className={isDesktop ? RekariStyle.section : RekariStyle.sectionContentUnderneath}>

                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>

                        </div>


                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>

                            <div className={RekariStyle.sectionHeader}>Ausgefeilte Cloudanbindung</div>

                            <div className={isDesktop ? RekariStyle.sectionExplain : RekariStyle.sectionExplainMobil}>
                                Durch die sinnvolle Anbindung der Drohne an die Cloud, können Bild-Daten in Echtzeit ausgewertet werden.
                                Des Weiteren kann die Mission zum Abfliegen des Feldes mit nur einem Klick auf die Drohne übertragen werden. Über die Cloud kann während der Rettung den Suchhelfern die erstelle Wärmebildkarte zur Verfügung gestellt werden.²

                            </div>


                        </div>


                    </div>

                    <div className={RekariStyle.CenterSection}>


                        <div className={RekariStyle.uiexplainheadline}>Intuitive Benutzeroberfläche</div>
                        <div className={isDesktop ? RekariStyle.centerSectionExplain : RekariStyle.sectionExplainMobil}>
                            Wir haben alle Funktion der Cloud aus der Sicht des Benutzers integriert, um eine intuitive
                            und einfache Bedienung zu ermöglichen. Nur so lässt sich dieses System ohne lange
                            Einweisungen in den vorhandenen Workflow einsetzen. Das System ist außerdem darauf ausgelegt, eine komplett Lösung zu sein. Damit lässt sich das umständliche Wechseln zwischen verschiedenen Lösungen vermeiden.
                        </div>
                    </div>


                    <div className={isDesktop ? RekariStyle.section : RekariStyle.sectionContentAbove}>

                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>
                            <div className={RekariStyle.sectionHeader}>Account-System</div>

                            <div className={isDesktop ? RekariStyle.sectionExplain : RekariStyle.sectionExplainMobil}>
                                Durch das Account-System der Cloud kann jeder Verein einen eigene Zugang erhalten.
                                Dadurch können Mission zum Abfliegen der Felder zentral gespeichert werden, damit
                                ist sichergestellt, dass die Mission jedem zur Verfügung steht.
                                Auch kann die Drohne im Cloudportal verwaltet werden und Einstellungen vorgenommen
                                werden.
                                Zusätzlich kann jeder Account durch eine Zwei-Faktor-Authentifizierung gesichert
                                werden.³
                            </div>
                        </div>

                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>
                            <img className={RekariStyle.cloudImg} src={"/rekariAssets/accountSystem.png"}
                                 alt={"Account Verwaltung"}/>
                        </div>

                    </div>


                    <div className={isDesktop ? RekariStyle.section : RekariStyle.sectionContentUnderneath}>

                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>
                            <img className={RekariStyle.cloudImg} src={"/rekariAssets/deviceControl.png"}
                                 alt={"Gerät Verwaltung"}/>
                        </div>

                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>


                            <div className={RekariStyle.sectionHeader}>Geräte-Verwaltung</div>

                            <div className={isDesktop ? RekariStyle.sectionExplain : RekariStyle.sectionExplainMobil}>
                                Mit der Cloud können Geräte ganz einfach online verwaltet werden. Dabei kann Name des
                                Geräts und verschiedene Parameter mit nur wenigen Klicks verändert werden.
                                Auch können Geräte im Cloudportal mit mehreren Benutzern verknüpft werden. Dadurch ist
                                das Teilen von Beispielweise Drohnen ein Kinderspiel.
                            </div>
                        </div>

                    </div>



                    <div className={isDesktop ? RekariStyle.section : RekariStyle.sectionContentAbove}>

                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>
                            <div className={RekariStyle.sectionHeader}>Live-Steuerung</div>

                            <div className={isDesktop ? RekariStyle.sectionExplain : RekariStyle.sectionExplainMobil}>
                                Durch den eigene Drohnen-Bereich in der Web-Oberfläche können alle Einstellungen und Parameter direkt online geändert werden.
                                Außerdem kann der Status der Drohne und die aktuelle Position abgerufen werden. So ist es für jeden der Zugriff auf den Drohne ganz einfach zu überwachen, welche Aktion die Drohne aktuell durchführt.
                            </div>
                        </div>

                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>
                            <img className={RekariStyle.cloudImg} src={"/rekariAssets/droneControl.png"}
                                 alt={"Gerät Verwaltung"}/>
                        </div>

                    </div>

                    <div className={RekariStyle.CenterSection}>
                        <div className={RekariStyle.missionGeneratorHeadline}>Missionen</div>
                        <div
                            className={isDesktop ? RekariStyle.centerSectionExplain : RekariStyle.centerSectionExplainMobil}>Durch
                            Missionen kann eine Flugroute schon vor der dem Einsatz bis ins kleinste Detail geplant
                            werden. Dadurch kann sichergestellt werden, dass die Drohne genau so fliegt, wie es
                            gewünscht ist. Außerdem gibt es die Möglichkeit, zu jedem Wegpunkt individuell verschiedene
                            Parameter, wie zum Beispiel die Flughöhe festzulegen. Auch kann genau festgelegt werden, was
                            nach der Mission passieren soll. Möglich ist, die Drohne nach dem Abschließen des
                            Flugmanövers an einem bestimmten Punkt laden zu lassen.
                        </div>


                        <div
                            className={RekariStyle.sectionHeader + " " + RekariStyle.missionGeneratorSpace}>Mission-Generatoren
                        </div>
                        <div
                            className={isDesktop ? RekariStyle.centerSectionExplain : RekariStyle.centerSectionExplainMobil}>
                            Durch die Mission-Generatoren kann durch nur das einfache Umrahmen des Feldes eine Mission
                            generiert werden.
                            Dabei berechnet unser intelligenter Algorithmus völlig automatisch die optimale Mission.
                            {isDesktop && <>Der Algorithmus kann direkt hier getestet werden. Dafür einfach auf der
                                Karte zu einem Feld
                                zoomen und an den Ecken des Feldes mit der rechten Maustaste Punkte setzen.
                                Anschließend muss nur mit dem Klick auf <q>Anwenden</q> der Prozess gestartet
                                werden.</>}
                        </div>

                        <div className={RekariStyle.section}>

                            {isDesktop ? <div
                                    className={isDesktop ? RekariStyle.MissionSectionPart : RekariStyle.sectionPartMobil}>


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

                                                }} onClick={() => {
                                                    this.setState({generatedTestMission: null});
                                                }}>Zurück
                                                </div>
                                            </>
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
                                </div> :
                                <div className={RekariStyle.sectionExplainMobil}>Die Vorschau der Generierungsfunktion
                                    ist auf Mobilgeräten nicht verfügbar. Bitte wechsle zum Testen auf ein Tablet oder
                                    ein Computer.</div>}

                        </div>

                    </div>

                    <div className={RekariStyle.CenterSection}>

                        <div className={RekariStyle.sectionHeader}>Sofortiges Speichern von Bildern</div>


                        <video className={RekariStyle.SaveSectionImage} autoPlay loop muted playsInline>
                            <source src="/rekariAssets/heatmap.webm" type="video/webm"/>
                            <source src="/rekariAssets/heatmap.mp4" type="video/mp4"/>
                        </video>

                        <div
                            className={isDesktop ? RekariStyle.centerSectionExplain : RekariStyle.centerSectionExplainMobil}>Während
                            dem Flug der Drohne werden sämtliche erstellten Bilder in Abhängigkeit der aktuellen
                            Position gespeichert.¹ Dadurch muss das Feld nur einmal überflogen werden, um aus den
                            Bildern eine Karte zusammenzufügen.² So ist mit einer Akku-Ladung das Überfliegen von einem
                            größeren Bereich möglich.
                        </div>


                    </div>

                    <div className={RekariStyle.CenterSection}>

                        <div className={RekariStyle.demoVideoSectionHeader}>Demo-Video</div>

                        <div className={RekariStyle.demoVideo}>


                            <LiteYouTubeEmbed id={"bKyheLg-D0g"} title={"JuFo 2022 Teaser"}/>


                        </div>

                    </div>


                    <div className={RekariStyle.partnerSectionHeader}>Unsere Partner</div>

                    <div className={isDesktop ? RekariStyle.section : RekariStyle.sectionContentAbove}>
                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>

                            <div className={RekariStyle.sectionHeader}>u-blox</div>

                            <div className={isDesktop ? RekariStyle.sectionExplain : RekariStyle.sectionExplainMobil}>

                                Mit u-blox hatten wir einen starken Partner an der Seite. Mit Ihren branchenführenden
                                Sensoren konnten wir präzise und verlässlich eine Kommunikation herstellen und die
                                aktuellen Koordinaten der Drohne ermitteln. Dank u-blox war es uns möglich die Drohne
                                auf bis zu einem Meter genau zu orten. Eine bessere Wahl als die Sensoren von u-blox
                                hätten wir nicht treffen können. Vielen Dank an unseren Partner u-blox.

                            </div>

                        </div>
                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>

                            <img src={"/rekariAssets/ublox.svg"} alt={"Ublox Logo"}
                                 className={RekariStyle.ubloxLogo}></img>

                        </div>


                    </div>

                    <div className={isDesktop ? RekariStyle.section : RekariStyle.sectionContentUnderneath}>
                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>


                            <img src={"/rekariAssets/productware.png"} alt={"Productware Logo"}
                                 className={RekariStyle.productwareLogo}></img>

                        </div>
                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>

                            <div className={RekariStyle.sectionHeader}>Productware</div>

                            <div className={isDesktop ? RekariStyle.sectionExplain : RekariStyle.sectionExplainMobil}>

                                Productware an unserer Seite hat uns geholfen, dass wir die Flight-Controller schnell
                                und unkompliziert, mit ausgezeichneter Qualität bestücken lassen konnten. Dabei waren
                                wir überrascht, wie schnell Productware es geschafft hat, unsere verwendeten Bauteile
                                auf Lieferbarkeit und Lebenszyklus zu prüfen. Ihr kompetentes Team hat es dadurch
                                geschafft, dass wir unseren Prototypen schnell testen konnten. Vielen Dank an das Team
                                von Productware.
                            </div>
                        </div>


                    </div>

                    <div className={isDesktop ? RekariStyle.section : RekariStyle.sectionContentAbove}>
                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>

                            <div className={RekariStyle.sectionHeader}>Rohde & Schwarz</div>

                            <div className={isDesktop ? RekariStyle.sectionExplain : RekariStyle.sectionExplainMobil}>

                                Unser Partner Rohde & Schwarz hat uns mit der Bereitstellung eines
                                Qualitäts-Oszilloskops geholfen, viele Fehler schnell und einfach zu finden. Durch die
                                vielen Möglichkeiten der Analyse, konnten wir schnell unsere Daten-Busse auslesen. Auch
                                hat uns sehr gefreut, dass das Oszilloskop nach dem Projekt einer größeren Gruppe von
                                technikinteressierten jungen Menschen zur Verfügung steht. Vielen Dank an das Team von
                                Rohde & Schwarz.
                            </div>

                        </div>
                        <div className={isDesktop ? RekariStyle.sectionPart : RekariStyle.sectionPartMobil}>

                            <img src={"/rekariAssets/rohdeundschwarz.svg"} alt={"Rohde & Schwarz Logo"}
                                 className={RekariStyle.rohdeundschwarz}></img>

                        </div>


                    </div>


                    <div className={RekariStyle.CenterSection}>

                        <div className={RekariStyle.aboutUsHeader}>
                            Über uns
                        </div>

                        <div className={isDesktop ? RekariStyle.aboutUsSection : RekariStyle.aboutUsSectionMobile}>
                            <div
                                className={isDesktop ? RekariStyle.aboutUseImage : RekariStyle.aboutUsImageMobile}></div>
                            <div className={isDesktop ? RekariStyle.aboutUseText : RekariStyle.aboutUseTextMobile}>Wir
                                sind Tim und Felix, gemeinsam hatten wir die Idee eine Drohne von Grund auf selbst zu
                                entwickeln. Unsere Interesse streuen sich breit über den Einsatz von modernen
                                Technologien. Nachdem wir bereits im Jahr 2021 bei JugendForscht erfolgreich
                                teilgenommen haben, ist dieses Projekt aufbauend auf der Erfahrung des vergangenen
                                Jahres eine weitere JugendForscht Teilnahme. Aber auch darüber hinaus erproben wir
                                weitere Einsatzgebiete von spezialisierten Drohnen.
                            </div>
                        </div>

                    </div>

                    <div className={RekariStyle.CenterSection}>


                        <div className={RekariStyle.sectionHeader}>Jetzt Kontakt aufnehmen</div>

                        {
                            !this.state.send ? <>
                                    {!this.state.sendPending ?
                                        <form id="form" onSubmit={this.sendMessage} className={RekariStyle.contactForm}>
                                            <div className={RekariStyle.formPersonalInformation}>
                                                <input value={this.state.name} onChange={event => {
                                                    this.setState({name: event.target.value});
                                                }} className={RekariStyle.formInput} type="text" id="name"
                                                       placeholder="Name"
                                                       required/>
                                                <input value={this.state.email} onChange={event => {
                                                    this.setState({email: event.target.value});
                                                }} className={RekariStyle.formInput} type="email" id="email"
                                                       placeholder="E-Mail"
                                                       required/>
                                            </div>

                                            <textarea value={this.state.message} onChange={event => {
                                                this.setState({message: event.target.value});
                                            }} className={RekariStyle.formTextarea} id="message" placeholder="Nachricht"
                                                      required/>

                                            <button type="submit"
                                                    className={RekariStyle.formButton}>Senden
                                            </button>


                                        </form> :
                                        <div className={RekariStyle.contactFormMessage}>Bitte Warten...</div>}</> :

                                <>{
                                    this.state.sendingSuccess ?
                                        <div className={RekariStyle.contactFormMessage}>Erfolgreich gesendet. Vielen
                                            Dank für deine Nachricht. Wir werden uns so schnell wie möglich darum
                                            kümmern.</div> :
                                        <div className={RekariStyle.contactFormMessage}>Unbekannter Sende-Fehler. Bitte
                                            versuche es später erneut.</div>

                                }
                                </>
                        }


                    </div>


                    <div className={RekariStyle.CenterSection}>

                        <div className={RekariStyle.footnote}>
                            ¹ Dieses Feature befindet sich aktuell noch in der Entwicklungsphase
                        </div>
                        <div className={RekariStyle.footnote}>
                            ² Darstellung der Wärmebildkamera-Aufnahme entspricht nicht der Funktionsweise einer realen
                            Wärmebildkamera
                        </div>
                        <div className={RekariStyle.footnote}>

                        </div>

                        <div className={RekariStyle.copyright}>
                            Design und Programmierung der Website: Tim Arnold
                        </div>

                        <div className={RekariStyle.copyright}>
                            © 2022 Tim & Felix - Rekari
                        </div>


                    </div>


                </div>


                <div className={RekariStyle.footer}>
                    <div className={RekariStyle.footerWrapper}>
                        <div className={RekariStyle.footerSection}>
                            <div className={RekariStyle.footerSectionHeadline}>Über uns</div>
                            <div className={RekariStyle.footerSectionElement} onClick={() => {
                                window.open("https://github.com/coder246", '_blank');
                            }}>Github (Tim)
                            </div>
                            <div className={RekariStyle.footerSectionElement} onClick={() => {
                                window.open("https://github.com/felixpc", '_blank');
                            }}>Github (Felix)
                            </div>
                            <div className={RekariStyle.footerSectionElement} onClick={() => {
                                window.open("https://github.com/ft-cloud/Documentation/wiki", '_blank');
                            }}>Dokumentation
                            </div>

                        </div>

                        <div className={RekariStyle.seperator}/>

                        <div className={RekariStyle.footerSection}>
                            <div className={RekariStyle.footerSectionHeadline}>Andere Projekte</div>
                            <div className={RekariStyle.footerSectionElement} onClick={() => {
                                window.open("https://github.com/ft-ki/ekes", '_blank');
                            }}>EKES - Simulation
                            </div>
                            <div className={RekariStyle.footerSectionElement} onClick={() => {
                                window.open("https://www.jugend-forscht-bayern.de/landeswettbewerb-bayern/landeswettbewerb-jugend-forscht/projekte/mathematik-informatik/EKES%20-%20Einfache%20KI-basierte%20Evolutions-Simulation", '_blank');
                            }}>JugendForscht 2021
                            </div>
                            <div className={RekariStyle.footerSectionElement} onClick={() => {
                                window.open("https://github.com/ledtisch", '_blank');
                            }}>Interaktiver LEDTisch
                            </div>

                        </div>

                        <div className={RekariStyle.seperator}/>


                        <div className={RekariStyle.footerSection}>
                            <div className={RekariStyle.footerSectionHeadline}>Informationen</div>

                            <div className={RekariStyle.footerSectionElement} onClick={() => {
                                window.open("#", '_blank');
                            }}>Press Kit
                            </div>
                            {/*<div className={RekariStyle.footerSectionElement} onClick={() => {
                                window.open("#", '_blank');
                            }}>Impressum
                            </div>*/}



                        </div>
                    </div>
                </div>


            </>
        );
    }


    sendMessage(e) {
        e.preventDefault();
        if (this.state.message.length > 0) {
            this.setState({
                sendPending: true
            });

            api.sendRekariMessage(this.state.name, this.state.email, this.state.message).then(result => {
                this.setState({
                    message: "",
                    name: "",
                    email: "",
                    send: true,
                    sendingSuccess: result.success,
                    sendPending: false
                });
            });


        }
    }


}

export default Rekari;