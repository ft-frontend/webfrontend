import React, {Component} from 'react';
import StaticPageUI from "../StaticPageUI";
import {withTranslation} from "react-i18next";
import PrivacyPolicyStyle from "./PrivacyPolicy.module.css"

class PrivacyPolicy extends Component {
    render() {
        const {t} = this.props;
        return (
            <>
             <StaticPageUI/>
                <h1>{t('direct_translation_privacyPolicy')}</h1>
                <br/>

                <h2>Einleitung</h2>
                <p>Mit der folgenden Datenschutzerklärung möchten wir Sie darüber aufklären, welche Arten Ihrer
                    personenbezogenen Daten (nachfolgend auch kurz als "Daten“ bezeichnet) wir zu welchen Zwecken und in
                    welchem Umfang im Rahmen der Bereitstellung unserer Applikation verarbeiten.</p>
                <p>Stand: 20. Januar 2022</p><h2>Inhaltsübersicht</h2>
                <ul className="index">
                    <li><a className="index-link" href="#m1870">Einleitung</a></li>
                    <li><a className="index-link" href="#m3">Verantwortlicher</a></li>
                    <li><a className="index-link" href="#mOverview">Übersicht der Verarbeitungen</a></li>
                    <li><a className="index-link" href="#m27">Sicherheitsmaßnahmen</a></li>
                    <li><a className="index-link" href="#m134">Einsatz von Cookies</a></li>
                    <li><a className="index-link" href="#m225">Bereitstellung des Onlineangebotes und Webhosting</a>
                    </li>
                    <li><a className="index-link" href="#m367">Registrierung, Anmeldung und Nutzerkonto</a></li>
                    <li><a className="index-link" href="#m182">Kontakt- und Anfragenverwaltung</a></li>
                    <li><a className="index-link" href="#m10">Rechte der betroffenen Personen</a></li>
                    <li><a className="index-link" href="#m42">Begriffsdefinitionen</a></li>
                    <br/>
                </ul>
                <h2> E-Mail-Adresse:</h2>
                <p><a href="mailto:info@rekari.de">info@rekari.de</a></p>
                <h2 id="mOverview">Übersicht der Verarbeitungen</h2><p>Die nachfolgende Übersicht fasst die Arten der
                verarbeiteten Daten und die Zwecke ihrer Verarbeitung zusammen und verweist auf die betroffenen
                Personen.</p><h3>Arten der verarbeiteten Daten</h3>
                <ul>
                    <li>Bestandsdaten.</li>
                    <li>Kontaktdaten.</li>
                    <li>Inhaltsdaten.</li>
                    <li>Nutzungsdaten.</li>
                    <li>Meta-/Kommunikationsdaten.</li>
                </ul>
                <h3>Kategorien betroffener Personen</h3>
                <ul>
                    <li>Kommunikationspartner.</li>
                    <li>Nutzer.</li>
                </ul>
                <h3>Zwecke der Verarbeitung</h3>
                <ul>
                    <li>Erbringung vertraglicher Leistungen und Kundenservice.</li>
                    <li>Kontaktanfragen und Kommunikation.</li>
                    <li>Sicherheitsmaßnahmen.</li>
                    <li>Verwaltung und Beantwortung von Anfragen.</li>
                    <li>Bereitstellung unseres Onlineangebotes und Nutzerfreundlichkeit.</li>
                </ul>
                <h2 id="m27">Sicherheitsmaßnahmen</h2><p>Wir treffen nach Maßgabe der gesetzlichen Vorgaben unter
                Berücksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der
                Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeiten und
                des Ausmaßes der Bedrohung der Rechte und Freiheiten natürlicher Personen geeignete technische und
                organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.</p>
                <p>Zu den Maßnahmen gehören insbesondere die Sicherung der Vertraulichkeit, Integrität und Verfügbarkeit
                    von Daten durch Kontrolle des physischen und elektronischen Zugangs zu den Daten als auch des sie
                    betreffenden Zugriffs, der Eingabe, der Weitergabe, der Sicherung der Verfügbarkeit und ihrer
                    Trennung. Des Weiteren haben wir Verfahren eingerichtet, die eine Wahrnehmung von
                    Betroffenenrechten, die Löschung von Daten und Reaktionen auf die Gefährdung der Daten
                    gewährleisten. Ferner berücksichtigen wir den Schutz personenbezogener Daten bereits bei der
                    Entwicklung bzw. Auswahl von Hardware, Software sowie Verfahren entsprechend dem Prinzip des
                    Datenschutzes, durch Technikgestaltung und durch datenschutzfreundliche Voreinstellungen.</p>
                <p>SSL-Verschlüsselung (https): Um Ihre via unserem Online-Angebot übermittelten Daten zu schützen,
                    nutzen wir eine SSL-Verschlüsselung. Sie erkennen derart verschlüsselte Verbindungen an dem Präfix
                    https:// in der Adresszeile Ihres Browsers.</p>
                <h2 id="m134">Einsatz von Cookies</h2><p>Cookies sind kleine Textdateien, bzw. sonstige
                Speichervermerke, die Informationen auf Endgeräten speichern und Informationen aus den Endgeräten
                auslesen. Z.B. um den Login-Status in einem Nutzerkonto, einen Warenkorbinhalt in einem E-Shop, die
                aufgerufenen Inhalte oder verwendete Funktionen eines Onlineangebotes speichern. Cookies können ferner
                zu unterschiedlichen Zwecken eingesetzt werden, z.B. zu Zwecken der Funktionsfähigkeit, Sicherheit und
                Komfort von Onlineangeboten sowie der Erstellung von Analysen der Besucherströme. </p>
                <p><strong>Hinweise zur Einwilligung: </strong>Wir setzen Cookies im Einklang mit den gesetzlichen
                    Vorschriften ein. Daher holen wir von den Nutzern eine vorhergehende Einwilligung ein, außer wenn
                    diese gesetzlich nicht gefordert ist. Eine Einwilligung ist insbesondere nicht notwendig, wenn das
                    Speichern und das Auslesen der Informationen, also auch von Cookies, unbedingt erforderlich sind, um
                    dem den Nutzern einen von ihnen ausdrücklich gewünschten Telemediendienst (also unser Onlineangebot)
                    zur Verfügung zu stellen. Die widerrufliche Einwilligung wird gegenüber den Nutzern deutlich
                    kommuniziert und enthält die Informationen zu der jeweiligen Cookie-Nutzung.</p>
                <p><strong>Hinweise zu datenschutzrechtlichen Rechtsgrundlagen: </strong>Auf welcher
                    datenschutzrechtlichen Rechtsgrundlage wir die personenbezogenen Daten der Nutzer mit Hilfe von
                    Cookies verarbeiten, hängt davon ab, ob wir Nutzer um eine Einwilligung bitten. Falls die Nutzer
                    einwilligen, ist die Rechtsgrundlage der Verarbeitung Ihrer Daten die erklärte Einwilligung.
                    Andernfalls werden die mithilfe von Cookies verarbeiteten Daten auf Grundlage unserer berechtigten
                    Interessen (z.B. an einem betriebswirtschaftlichen Betrieb unseres Onlineangebotes und Verbesserung
                    seiner Nutzbarkeit) verarbeitet oder, wenn dies im Rahmen der Erfüllung unserer vertraglichen
                    Pflichten erfolgt, wenn der Einsatz von Cookies erforderlich ist, um unsere vertraglichen
                    Verpflichtungen zu erfüllen. Zu welchen Zwecken die Cookies von uns verarbeitet werden, darüber
                    klären wir im Laufe dieser Datenschutzerklärung oder im Rahmen von unseren Einwilligungs- und
                    Verarbeitungsprozessen auf.</p>
                <p><strong>Speicherdauer: </strong>Im Hinblick auf die Speicherdauer werden die folgenden Arten von
                    Cookies unterschieden:</p>
                <ul>
                    <li><strong>Temporäre Cookies (auch: Session- oder Sitzungs-Cookies):</strong> Temporäre Cookies
                        werden spätestens gelöscht, nachdem ein Nutzer ein Online-Angebot verlassen und sein Endgerät
                        (z.B. Browser oder mobile Applikation) geschlossen hat.
                    </li>
                    <li><strong>Permanente Cookies:</strong> Permanente Cookies bleiben auch nach dem Schließen des
                        Endgerätes gespeichert. So können beispielsweise der Login-Status gespeichert oder bevorzugte
                        Inhalte direkt angezeigt werden, wenn der Nutzer eine Website erneut besucht. Ebenso können die
                        mit Hilfe von Cookies erhobenen Daten der Nutzer zur Reichweitenmessung verwendet werden. Sofern
                        wir Nutzern keine expliziten Angaben zur Art und Speicherdauer von Cookies mitteilen (z. B. im
                        Rahmen der Einholung der Einwilligung), sollten Nutzer davon ausgehen, dass Cookies permanent
                        sind und die Speicherdauer bis zu zwei Jahre betragen kann.
                    </li>
                </ul>
                <p><strong>Allgemeine Hinweise zum Widerruf und Widerspruch (Opt-Out): </strong>Nutzer können die von
                    ihnen abgegebenen Einwilligungen jederzeit Widerrufen und zudem einen Widerspruch gegen die
                    Verarbeitung entsprechend den gesetzlichen Vorgaben im Art. 21 DSGVO einlegen (weitere Hinweise zum
                    Widerspruch erfolgen im Rahmen dieser Datenschutzerklärung). Nutzer können Ihren Widerspruch auch
                    mittels der Einstellungen Ihres Browsers erklären.</p>
                <h2 id="m225">Bereitstellung des Onlineangebotes und Webhosting</h2><p>Um unser Onlineangebot sicher und
                effizient bereitstellen zu können, nehmen wir die Leistungen von einem oder mehreren
                Webhosting-Anbietern in Anspruch, von deren Servern (bzw. von ihnen verwalteten Servern) das
                Onlineangebot abgerufen werden kann. Zu diesen Zwecken können wir Infrastruktur- und
                Plattformdienstleistungen, Rechenkapazität, Speicherplatz und Datenbankdienste sowie
                Sicherheitsleistungen und technische Wartungsleistungen in Anspruch nehmen.</p>
                <p>Zu den im Rahmen der Bereitstellung des Hostingangebotes verarbeiteten Daten können alle die Nutzer
                    unseres Onlineangebotes betreffenden Angaben gehören, die im Rahmen der Nutzung und der
                    Kommunikation anfallen. Hierzu gehören regelmäßig die IP-Adresse, die notwendig ist, um die Inhalte
                    von Onlineangeboten an Browser ausliefern zu können, und alle innerhalb unseres Onlineangebotes oder
                    von Webseiten getätigten Eingaben.</p>
                <ul className="m-elements">
                    <li><strong>Verarbeitete Datenarten:</strong> Inhaltsdaten (z.B. Eingaben in Onlineformularen);
                        Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten, Zugriffszeiten);
                        Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen).
                    </li>
                    <li><strong>Betroffene Personen:</strong> Nutzer (z.B. Webseitenbesucher, Nutzer von
                        Onlinediensten).
                    </li>
                    <li><strong>Zwecke der Verarbeitung:</strong> Bereitstellung unseres Onlineangebotes und
                        Nutzerfreundlichkeit; Erbringung vertraglicher Leistungen und Kundenservice.
                    </li>
                    <li><strong>Rechtsgrundlagen:</strong> Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO).
                    </li>
                </ul>
                <p><strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong></p>
                <ul className="m-elements">
                    <li><strong>E-Mail-Versand und -Hosting: </strong>Die von uns in Anspruch genommenen
                        Webhosting-Leistungen umfassen ebenfalls den Versand, den Empfang sowie die Speicherung von
                        E-Mails. Zu diesen Zwecken werden die Adressen der Empfänger sowie Absender als auch weitere
                        Informationen betreffend den E-Mailversand (z.B. die beteiligten Provider) sowie die Inhalte der
                        jeweiligen E-Mails verarbeitet. Die vorgenannten Daten können ferner zu Zwecken der Erkennung
                        von SPAM verarbeitet werden. Wir bitten darum, zu beachten, dass E-Mails im Internet
                        grundsätzlich nicht verschlüsselt versendet werden. Im Regelfall werden E-Mails zwar auf dem
                        Transportweg verschlüsselt, aber (sofern kein sogenanntes Ende-zu-Ende-Verschlüsselungsverfahren
                        eingesetzt wird) nicht auf den Servern, von denen sie abgesendet und empfangen werden. Wir
                        können daher für den Übertragungsweg der E-Mails zwischen dem Absender und dem Empfang auf
                        unserem Server keine Verantwortung übernehmen.
                    </li>
                    <li><strong>Erhebung von Zugriffsdaten und Logfiles: </strong>Wir selbst (bzw. unser
                        Webhostinganbieter) erheben Daten zu jedem Zugriff auf den Server (sogenannte Serverlogfiles).
                        Zu den Serverlogfiles können die Adresse und Name der abgerufenen Webseiten und Dateien, Datum
                        und Uhrzeit des Abrufs, übertragene Datenmengen, Meldung über erfolgreichen Abruf, Browsertyp
                        nebst Version, das Betriebssystem des Nutzers, Referrer URL (die zuvor besuchte Seite) und im
                        Regelfall IP-Adressen und der anfragende Provider gehören.

                        Die Serverlogfiles können zum einen zu Zwecken der Sicherheit eingesetzt werden, z.B., um eine
                        Überlastung der Server zu vermeiden (insbesondere im Fall von missbräuchlichen Angriffen,
                        sogenannten DDoS-Attacken) und zum anderen, um die Auslastung der Server und ihre Stabilität
                        sicherzustellen; <strong>Löschung von Daten:</strong> Logfile-Informationen werden für die Dauer
                        von maximal 30 Tagen gespeichert und danach gelöscht oder anonymisiert. Daten, deren weitere
                        Aufbewahrung zu Beweiszwecken erforderlich ist, sind bis zur endgültigen Klärung des jeweiligen
                        Vorfalls von der Löschung ausgenommen.
                    </li>
                    <li><strong>Content-Delivery-Network: </strong>Wir setzen ein "Content-Delivery-Network" (CDN) ein.
                        Ein CDN ist ein Dienst, mit dessen Hilfe Inhalte eines Onlineangebotes, insbesondere große
                        Mediendateien, wie Grafiken oder Programm-Skripte, mit Hilfe regional verteilter und über das
                        Internet verbundener Server schneller und sicherer ausgeliefert werden können.
                    </li>
                    <li><strong>IONOS by 1&1: </strong>Hostingplattform für E-Commerce /
                        Websites; <strong>Dienstanbieter:</strong> 1&1 IONOS SE, Elgendorfer Str. 57, 56410 Montabaur,
                        Deutschland; <strong>Website:</strong> <a href="https://www.ionos.de"
                                                                  target="_blank">https://www.ionos.de</a>; <strong>Datenschutzerklärung:</strong>
                        <a href="https://www.ionos.de/terms-gtc/terms-privacy"
                           target="_blank">https://www.ionos.de/terms-gtc/terms-privacy</a>; <strong>Auftragsverarbeitungsvertrag:</strong>
                        <a href="https://www.ionos.de/hilfe/datenschutz/allgemeine-informationen-zur-datenschutz-grundverordnung-dsgvo/auftragsverarbeitung/?utm_source=search&utm_medium=global&utm_term=Auft&utm_campaign=HELP_CENTER&utm_content=/hilfe/"
                           target="_blank">https://www.ionos.de/hilfe/datenschutz/allgemeine-informationen-zur-datenschutz-grundverordnung-dsgvo/auftragsverarbeitung/?utm_source=search&utm_medium=global&utm_term=Auft&utm_campaign=HELP_CENTER&utm_content=/hilfe/</a>.
                    </li>
                </ul>
                <h2 id="m367">Registrierung, Anmeldung und Nutzerkonto</h2><p>Nutzer können ein Nutzerkonto anlegen. Im
                Rahmen der Registrierung werden den Nutzern die erforderlichen Pflichtangaben mitgeteilt und zu Zwecken
                der Bereitstellung des Nutzerkontos auf Grundlage vertraglicher Pflichterfüllung verarbeitet. Zu den
                verarbeiteten Daten gehören insbesondere die Login-Informationen (Nutzername, Passwort sowie eine
                E-Mail-Adresse).</p>
                <p>Im Rahmen der Inanspruchnahme unserer Registrierungs- und Anmeldefunktionen sowie der Nutzung des
                    Nutzerkontos speichern wir die IP-Adresse und den Zeitpunkt der jeweiligen Nutzerhandlung. Die
                    Speicherung erfolgt auf Grundlage unserer berechtigten Interessen als auch jener der Nutzer an einem
                    Schutz vor Missbrauch und sonstiger unbefugter Nutzung. Eine Weitergabe dieser Daten an Dritte
                    erfolgt grundsätzlich nicht, es sei denn, sie ist zur Verfolgung unserer Ansprüche erforderlich oder
                    es besteht eine gesetzliche Verpflichtung hierzu.</p>
                <p>Die Nutzer können über Vorgänge, die für deren Nutzerkonto relevant sind, wie z.B. technische
                    Änderungen, per E-Mail informiert werden.</p>
                <ul className="m-elements">
                    <li><strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z.B. Namen, Adressen); Kontaktdaten
                        (z.B. E-Mail, Telefonnummern); Inhaltsdaten (z.B. Eingaben in Onlineformularen);
                        Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen).
                    </li>
                    <li><strong>Betroffene Personen:</strong> Nutzer (z.B. Webseitenbesucher, Nutzer von
                        Onlinediensten).
                    </li>
                    <li><strong>Zwecke der Verarbeitung:</strong> Erbringung vertraglicher Leistungen und Kundenservice;
                        Sicherheitsmaßnahmen; Verwaltung und Beantwortung von Anfragen.
                    </li>
                    <li><strong>Rechtsgrundlagen:</strong> Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1
                        S. 1 lit. b. DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO).
                    </li>
                </ul>
                <p><strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong></p>
                <ul className="m-elements">
                    <li><strong>Registrierung mit Pseudonymen: </strong>Nutzer dürfen statt Klarnamen Pseudonyme als
                        Nutzernamen verwenden.
                    </li>
                    <li><strong>Profile der Nutzer sind öffentlich: </strong>Die Profile der Nutzer sind öffentlich
                        sichtbar und zugänglich.
                    </li>
                    <li><strong>Einstellung der Sichtbarkeit von Profilen: </strong>Die Nutzer können mittels
                        Einstellungen bestimmen, in welchem Umfang ihre Profile für die Öffentlichkeit oder nur für
                        bestimmte Personengruppen sichtbar, bzw. zugänglich sind.
                    </li>
                    <li><strong>Zwei-Faktor-Authentifizierung: </strong>Die Zwei-Faktor-Authentifizierung bietet eine
                        zusätzliche Sicherheitsebene für Ihr Benutzerkonto und stellt sicher, dass nur Sie auf Ihr Konto
                        zugreifen können, auch, wenn jemand anderes Ihr Passwort kennt. Zu diesem Zweck müssen Sie
                        zusätzlich zu Ihrem Passwort eine weitere Authentifizierungsmaßnahme durchführen (z.B. einen an
                        ein mobiles Gerät gesandten Code eingeben). Wir werden Sie über das von uns eingesetzte
                        Verfahren informieren.
                    </li>
                    <li><strong>Löschung von Daten nach Kündigung: </strong>Wenn Nutzer ihr Nutzerkonto gekündigt haben,
                        werden deren Daten im Hinblick auf das Nutzerkonto, vorbehaltlich einer gesetzlichen Erlaubnis,
                        Pflicht oder Einwilligung der Nutzer, gelöscht.
                    </li>
                    <li><strong>Keine Aufbewahrungspflicht für Daten: </strong>Es obliegt den Nutzern, ihre Daten bei
                        erfolgter Kündigung vor dem Vertragsende zu sichern. Wir sind berechtigt, sämtliche während der
                        Vertragsdauer gespeicherte Daten des Nutzers unwiederbringlich zu löschen.
                    </li>
                </ul>
                <h2 id="m182">Kontakt- und Anfragenverwaltung</h2><p>Bei der Kontaktaufnahme mit uns (z.B. per
                Kontaktformular, E-Mail, Telefon oder via soziale Medien) sowie im Rahmen bestehender Nutzer- und
                Geschäftsbeziehungen werden die Angaben der anfragenden Personen verarbeitet soweit dies zur
                Beantwortung der Kontaktanfragen und etwaiger angefragter Maßnahmen erforderlich ist.</p>
                <p>Die Beantwortung der Kontaktanfragen sowie die Verwaltung von Kontakt- und Anfragedaten im Rahmen von
                    vertraglichen oder vorvertraglichen Beziehungen erfolgt zur Erfüllung unserer vertraglichen
                    Pflichten oder zur Beantwortung von (vor)vertraglichen Anfragen und im Übrigen auf Grundlage der
                    berechtigten Interessen an der Beantwortung der Anfragen und Pflege von Nutzer- bzw.
                    Geschäftsbeziehungen.</p>
                <ul className="m-elements">
                    <li><strong>Verarbeitete Datenarten:</strong> Bestandsdaten (z.B. Namen, Adressen); Kontaktdaten
                        (z.B. E-Mail, Telefonnummern); Inhaltsdaten (z.B. Eingaben in Onlineformularen).
                    </li>
                    <li><strong>Betroffene Personen:</strong> Kommunikationspartner.</li>
                    <li><strong>Zwecke der Verarbeitung:</strong> Kontaktanfragen und Kommunikation; Erbringung
                        vertraglicher Leistungen und Kundenservice.
                    </li>
                    <li><strong>Rechtsgrundlagen:</strong> Vertragserfüllung und vorvertragliche Anfragen (Art. 6 Abs. 1
                        S. 1 lit. b. DSGVO); Berechtigte Interessen (Art. 6 Abs. 1 S. 1 lit. f. DSGVO); Rechtliche
                        Verpflichtung (Art. 6 Abs. 1 S. 1 lit. c. DSGVO).
                    </li>
                </ul>
                <p><strong>Weitere Hinweise zu Verarbeitungsprozessen, Verfahren und Diensten:</strong></p>
                <ul className="m-elements">
                    <li><strong>Kontaktformular: </strong>Wenn Nutzer über unser Kontaktformular, E-Mail oder andere
                        Kommunikationswege mit uns in Kontakt treten, verarbeiten wir die uns in diesem Zusammenhang
                        mitgeteilten Daten zur Bearbeitung des mitgeteilten Anliegens. Zu diesem Zweck verarbeiten wir
                        personenbezogene Daten im Rahmen vorvertraglicher und vertraglicher Geschäftsbeziehungen, soweit
                        dies zu deren Erfüllung erforderlich ist und im Übrigen auf Grundlage unserer berechtigten
                        Interessen sowie der Interessen der Kommunikationspartner an der Beantwortung der Anliegen und
                        unserer gesetzlichen Aufbewahrungspflichten.
                    </li>
                </ul>
                <h2 id="m10">Rechte der betroffenen Personen</h2><p>Ihnen stehen als Betroffene nach der DSGVO
                verschiedene Rechte zu, die sich insbesondere aus Art. 15 bis 21 DSGVO ergeben:</p>
                <ul>
                    <li><strong>Widerspruchsrecht: Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen
                        Situation ergeben, jederzeit gegen die Verarbeitung der Sie betreffenden personenbezogenen
                        Daten, die aufgrund von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, Widerspruch einzulegen; dies
                        gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Werden die Sie betreffenden
                        personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, haben Sie das Recht,
                        jederzeit Widerspruch gegen die Verarbeitung der Sie betreffenden personenbezogenen Daten zum
                        Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher
                        Direktwerbung in Verbindung steht.</strong></li>
                    <li><strong>Widerrufsrecht bei Einwilligungen:</strong> Sie haben das Recht, erteilte Einwilligungen
                        jederzeit zu widerrufen.
                    </li>
                    <li><strong>Auskunftsrecht:</strong> Sie haben das Recht, eine Bestätigung darüber zu verlangen, ob
                        betreffende Daten verarbeitet werden und auf Auskunft über diese Daten sowie auf weitere
                        Informationen und Kopie der Daten entsprechend den gesetzlichen Vorgaben.
                    </li>
                    <li><strong>Recht auf Berichtigung:</strong> Sie haben entsprechend den gesetzlichen Vorgaben das
                        Recht, die Vervollständigung der Sie betreffenden Daten oder die Berichtigung der Sie
                        betreffenden unrichtigen Daten zu verlangen.
                    </li>
                    <li><strong>Recht auf Löschung und Einschränkung der Verarbeitung:</strong> Sie haben nach Maßgabe
                        der gesetzlichen Vorgaben das Recht, zu verlangen, dass Sie betreffende Daten unverzüglich
                        gelöscht werden, bzw. alternativ nach Maßgabe der gesetzlichen Vorgaben eine Einschränkung der
                        Verarbeitung der Daten zu verlangen.
                    </li>
                    <li><strong>Recht auf Datenübertragbarkeit:</strong> Sie haben das Recht, Sie betreffende Daten, die
                        Sie uns bereitgestellt haben, nach Maßgabe der gesetzlichen Vorgaben in einem strukturierten,
                        gängigen und maschinenlesbaren Format zu erhalten oder deren Übermittlung an einen anderen
                        Verantwortlichen zu fordern.
                    </li>
                    <li><strong>Beschwerde bei Aufsichtsbehörde:</strong> Sie haben unbeschadet eines anderweitigen
                        verwaltungsrechtlichen oder gerichtlichen Rechtsbehelfs das Recht auf Beschwerde bei einer
                        Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthaltsorts, ihres
                        Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes, wenn Sie der Ansicht sind, dass die
                        Verarbeitung der Sie betreffenden personenbezogenen Daten gegen die Vorgaben der DSGVO verstößt.
                    </li>
                </ul>
                <h2 id="m42">Begriffsdefinitionen</h2><p>In diesem Abschnitt erhalten Sie eine Übersicht über die in
                dieser Datenschutzerklärung verwendeten Begrifflichkeiten. Viele der Begriffe sind dem Gesetz entnommen
                und vor allem im Art. 4 DSGVO definiert. Die gesetzlichen Definitionen sind verbindlich. Die
                nachfolgenden Erläuterungen sollen dagegen vor allem dem Verständnis dienen. Die Begriffe sind
                alphabetisch sortiert.</p>
                <ul className="glossary">
                    <li><strong>Personenbezogene Daten:</strong> "Personenbezogene Daten“ sind alle Informationen, die
                        sich auf eine identifizierte oder identifizierbare natürliche Person (im Folgenden "betroffene
                        Person“) beziehen; als identifizierbar wird eine natürliche Person angesehen, die direkt oder
                        indirekt, insbesondere mittels Zuordnung zu einer Kennung wie einem Namen, zu einer Kennnummer,
                        zu Standortdaten, zu einer Online-Kennung (z.B. Cookie) oder zu einem oder mehreren besonderen
                        Merkmalen identifiziert werden kann, die Ausdruck der physischen, physiologischen, genetischen,
                        psychischen, wirtschaftlichen, kulturellen oder sozialen Identität dieser natürlichen Person
                        sind.
                    </li>
                    <li><strong>Verantwortlicher:</strong> Als "Verantwortlicher“ wird die natürliche oder juristische
                        Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die
                        Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet, bezeichnet.
                    </li>
                    <li><strong>Verarbeitung:</strong> "Verarbeitung" ist jeder mit oder ohne Hilfe automatisierter
                        Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit
                        personenbezogenen Daten. Der Begriff reicht weit und umfasst praktisch jeden Umgang mit Daten,
                        sei es das Erheben, das Auswerten, das Speichern, das Übermitteln oder das Löschen.
                    </li>
                </ul>


            </>
        );
    }
}

export default withTranslation()(PrivacyPolicy);