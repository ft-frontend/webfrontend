import React, {Component} from 'react';
import "react-bingmaps";
import api from "../../../../../api/api";
import MissionGeneratorHeightSelection from "../MissionGeneratorHeightSelection";
import missionSelectStyle from "../../missionSelectStyle.module.css";
import {withTranslation} from "react-i18next";

class ZigZagMap extends Component {


    constructor(props) {
        super(props);

        this.state = {
            plannerMode: this.props.planner,
            plannerData: this.props.missionData ? this.props.missionData : undefined,
            pushPins: [],
            polyLine: undefined,
            pushPinHovered: undefined,
            selectedPushPin: undefined,
            selectedMission: this.props.match != null ? this.props.match.params.mission : undefined

        };


        this.handlePushPinDrag = this.handlePushPinDrag.bind(this);
        this.generatePolyLines = this.generatePolyLines.bind(this);
        this.addPushPin = this.addPushPin.bind(this);
        this.handlePushPinMoseOut = this.handlePushPinMoseOut.bind(this);
        this.handlePushPinMoseOver = this.handlePushPinMoseOver.bind(this);
        this.handleMapRightClick = this.handleMapRightClick.bind(this);
        this.removePushPin = this.removePushPin.bind(this);
        this.missionComposer = this.missionComposer.bind(this);
        this.handlePushPinClick = this.handlePushPinClick.bind(this);
        this.heightChange = this.heightChange.bind(this);
        this.generateMission = this.generateMission.bind(this);


        const obj = this;
        window.GetMap = function () {
            // eslint-disable-next-line no-undef
            window.Microsoft = Microsoft;
            const pl = new window.Microsoft.Maps.Polyline([], {
                strokeThickness: 3
            });

            obj.setState({
                polyLine: pl
            });

            obj.map = window.Microsoft.Maps.Map('#myMap', {
                credentials: "AkBVrBtsknpJShn4Yjy9xKpdHxNdYuymoJ_1yHe95ECRs3CEIbwWmD6wje-c1R9v",
                center: obj.props.center !== undefined ? new window.Microsoft.Maps.Location(obj.props.center.latitude, obj.props.center.longitude) : "",
                zoom: obj.props.center !== undefined ? 19 : 12,
                mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,

            });
            obj.map.entities.push(pl);
            window.Microsoft.Maps.Events.addHandler(obj.map, 'rightclick', obj.handleMapRightClick);

            //Center Map to User Location to provide easy possibility to find yourself in the mission planner

        };
    }

    missionComposer() {
        return new Promise((resolve, reject) => {

            const finalArray = [];

            this.state.pushPins.forEach((pp) => {

                finalArray.push({

                    lat: pp.getLocation().latitude,
                    long: pp.getLocation().longitude
                });


            });

            resolve(finalArray);


        });
    }


    handlePushPinMoseOver(e) {
        this.setState({
            pushPinHovered: e.target
        });
    }

    handlePushPinClick(e) {
        this.setState({
            selectedPushPin: e.target
        });


    }


    handlePushPinMoseOut(e) {
        if (this.state.pushPinHovered === e.target) {

            this.setState({
                pushPinHovered: null
            });

        }
    }


    handleMapRightClick(e) {
        if (this.state.pushPinHovered === null || this.state.pushPinHovered === undefined) {
            this.addPushPin(e);
        } else {
            this.removePushPin(this.state.pushPinHovered);
        }


    }


    removePushPin(element) {


        const missionDataIndex = this.state.pushPins.indexOf(element);
        if (missionDataIndex > -1) {

            this.state.pushPins.splice(missionDataIndex, 1);
        }

        const entityIndex = this.map.entities.indexOf(element);
        if (entityIndex > -1) {

            this.map.entities.removeAt(entityIndex);
        }

        if (this.state.selectedPushPin === element) {
            this.setState({
                selectedPushPin: undefined
            });
        }


        this.setState({
            pushPinHovered: undefined
        });


        this.generatePolyLines();

    }


    addPushPin(e) {
        const pushPin = new window.Microsoft.Maps.Pushpin(e.location, {

            draggable: true,
            color: "#ff0000"

        });
        this.state.pushPins.push(pushPin);
        this.map.entities.push(pushPin);
        pushPin.height = 0;
        pushPin.index = this.state.pushPins.length - 1;
        window.Microsoft.Maps.Events.addHandler(pushPin, 'drag', this.handlePushPinDrag);
        window.Microsoft.Maps.Events.addHandler(pushPin, 'mouseover', this.handlePushPinMoseOver);
        window.Microsoft.Maps.Events.addHandler(pushPin, 'mouseout', this.handlePushPinMoseOut);
        window.Microsoft.Maps.Events.addHandler(pushPin, 'click', this.handlePushPinClick);

        this.generatePolyLines();
    }

    handlePushPinDrag(e) {
        this.generatePolyLines();

    }


    generatePolyLines() {

        const posArray = [];
        this.state.pushPins.forEach(wayPoint => {
            posArray.push(wayPoint.getLocation());
        });
        if (this.state.pushPins.length > 0) {
            posArray.push(this.state.pushPins[0].getLocation());
        }

        this.state.polyLine.setLocations(posArray);

    }


    componentDidMount() {

        let script = document.createElement("script");
        script.type = "application/javascript";

        // GetMap function will be called when Bing Maps script is downloaded, so inside there initialize your map and other params
        script.src = "https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AkBVrBtsknpJShn4Yjy9xKpdHxNdYuymoJ_1yHe95ECRs3CEIbwWmD6wje-c1R9v";

        document.body.appendChild(script);

        window.sessionStorage.setItem("currentMissionGeneratorHeight", 1);


    }


    heightChange(e) {
        window.sessionStorage.setItem("currentMissionGeneratorHeight", e.target.value);
    }

    generateMission() {
        this.missionComposer().then(composedMission => {
            if(composedMission.length > 0) {
                api.missionGeneratorZigZag(composedMission).then(generatedMission => {
                    if (this.props.testMode == null) {
                        if (generatedMission.success) {
                            window.sessionStorage.setItem("currentGeneratedMission", JSON.stringify(generatedMission.route));
                            window.location.href = "/module/drone/missions/generators/" + this.state.selectedMission + "/missionViewer";

                        } else {

                        }

                    } else {
                        this.props.generateMissionCallback(generatedMission.route)
                    }
                });
            }else{
                alert("Please add at least one waypoint")
            }

        });


    }


    render() {
        const {t} = this.props;
        return (


            this.props.testMode != null ? <>
                    <div id="myMap" style={this.props.style}/>
                    <div onClick={this.generateMission} style={this.props.buttonStyle}><span
                        className={"ignoreDarkMode " + missionSelectStyle.startMissionGeneratorsText}>Anwenden</span></div>
                </>
                :
                <div style={{userSelect: 'none'}}>
                    <MissionGeneratorHeightSelection heightChange={this.heightChange}/>
                    <div id="myMap" style={{
                        height: '43em',
                        width: 'calc(100vw-70px)',
                        marginTop: '20px',
                        marginLeft: '70px',
                        userSelect: 'none'
                    }}/>
                    <div onClick={this.generateMission} className={missionSelectStyle.startMissionGenerators}><span
                        className={"ignoreDarkMode " + missionSelectStyle.startMissionGeneratorsText}>{t('direct_translation_generate')}</span>
                    </div>

                </div>
        );


    }
}

export default withTranslation()(ZigZagMap);