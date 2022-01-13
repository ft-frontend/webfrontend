import React, {Component} from 'react';
import api from "../../../../api/api";
import MissionGeneratorResultViewerStyle from "./MissionGeneratorResultViewerStyle.module.css";
import {withTranslation} from "react-i18next";

class MissionGeneratorResultViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plannerData: JSON.parse(window.sessionStorage.getItem("currentGeneratedMission")),
            pushPins: [],
            polyLine: undefined,
            pushPinHovered: undefined,
            selectedPushPin: undefined,
            selectedMission: undefined


        };




        this.missionParser = this.missionParser.bind(this);
        this.handlePushPinDrag = this.handlePushPinDrag.bind(this);
        this.generatePolyLines = this.generatePolyLines.bind(this);
        this.addPushPin = this.addPushPin.bind(this);
        this.handlePushPinMoseOut = this.handlePushPinMoseOut.bind(this);
        this.handlePushPinMoseOver = this.handlePushPinMoseOver.bind(this);
        this.handleMapRightClick = this.handleMapRightClick.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
        this.removePushPin = this.removePushPin.bind(this);
        this.regeneratePushPinText = this.regeneratePushPinText.bind(this);
        this.missionComposer = this.missionComposer.bind(this);
        this.heightOfSelectedPushPinChanged = this.heightOfSelectedPushPinChanged.bind(this);
        this.finishTask = this.finishTask.bind(this);


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


            //Center Map to User Location to provide easy possibility to find yourself in the mission planner


            if (obj.state.plannerData) {
                obj.missionParser();

                if (obj.state.pushPins.length > 0) {
                    const loc = new window.Microsoft.Maps.Location(
                        obj.state.pushPins[0].getLocation().latitude,
                        obj.state.pushPins[0].getLocation().longitude);

                    obj.map.setView({center: loc, zoom: 15});
                } else {
                    navigator.geolocation.getCurrentPosition(function (position) {
                        const loc = new window.Microsoft.Maps.Location(
                            position.coords.latitude,
                            position.coords.longitude);

                        //Center the map on the user's location.
                        obj.map.setView({center: loc, zoom: 15});
                    });
                }
            } else {
            }


        };


    }

    finishTask() {
        this.missionComposer().then(mission => {

            if(this.state.selectedMission!=null) {
                mission = this.state.selectedMission.concat(mission);
            }

            api.saveMissionData(this.props.match.params.mission,{wayPoints:mission}).then(()=>{
                window.sessionStorage.removeItem("currentMissionGeneratorHeight")
                window.sessionStorage.removeItem("currentGeneratedMission")

                //TODO temp change duo the assistent with custom callbacks

                window.location.href = "/module/drone/missions/planner/"+this.props.match.params.mission
            });


        })
    }

    missionComposer() {
        return new Promise((resolve, reject) => {
            const finalArray = [];
            const pos = [];

            this.state.pushPins.forEach((pp) => {

                finalArray.push({

                    lat: pp.getLocation().latitude,
                    long: pp.getLocation().longitude,
                    height: window.sessionStorage.getItem("currentMissionGeneratorHeight")!=null?parseInt(window.sessionStorage.getItem("currentMissionGeneratorHeight")):0,
                    alt: 0


                });

                pos.push(pp.getLocation().latitude);
                pos.push(pp.getLocation().longitude);

            });

            if (this.state.pushPins.length > 0) {
                api.getElevationData(pos).then(result => {

                    this.state.pushPins.forEach((pp) => {

                        finalArray[this.state.pushPins.indexOf(pp)].alt = (parseFloat(result.elevations[this.state.pushPins.indexOf(pp)]) + parseFloat(finalArray[this.state.pushPins.indexOf(pp)].height));

                    });

                    resolve(finalArray);

                });
            } else {
                resolve(finalArray);

            }


        });
    }

    missionParser() {
        if (this.state.plannerData) {

            this.state.plannerData.forEach(wayPoint => {

                const location = new window.Microsoft.Maps.Location(wayPoint.lat, wayPoint.long);
                const pushPin = new window.Microsoft.Maps.Pushpin(location, {

                    text: `${this.state.plannerData.indexOf(wayPoint) + 1}`,
                    draggable: true,
                    color: "#00ff00"

                });
                pushPin.index = this.state.plannerData.indexOf(wayPoint);
                pushPin.height = wayPoint.height;
                window.Microsoft.Maps.Events.addHandler(pushPin, 'drag', this.handlePushPinDrag);
                window.Microsoft.Maps.Events.addHandler(pushPin, 'mouseover', this.handlePushPinMoseOver);
                window.Microsoft.Maps.Events.addHandler(pushPin, 'mouseout', this.handlePushPinMoseOut);
                window.Microsoft.Maps.Events.addHandler(pushPin, 'click', (e)=>this.removePushPin(e.target));

                window.Microsoft.Maps.Events.addHandler(pushPin, 'dragstart', this.preventRedirect);

                this.state.pushPins.push(pushPin);
                this.map.entities.push(pushPin);
            });


        }
        this.generatePolyLines();

        //init Event Handlers
        window.Microsoft.Maps.Events.addHandler(this.map, 'rightclick', this.handleMapRightClick);
        window.Microsoft.Maps.Events.addHandler(this.map, 'click', this.handleMapClick);


    }


    handlePushPinMoseOver(e) {
        this.setState({
            pushPinHovered: e.target
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
            this.setState({
                selectedPushPin: null
            });
        } else {
            this.setState({
                selectedPushPin: this.state.pushPinHovered
            });
        }


    }

    handleMapClick(e) {
        if (this.state.pushPinHovered === null || this.state.pushPinHovered === undefined) {
            this.addPushPin(e);
        } else {
            this.removePushPin(this.state.pushPinHovered);
        }


    }

    regeneratePushPinText() {

        this.state.pushPins.forEach(pp => {
            pp._options.text = "" + (this.state.pushPins.indexOf(pp) + 1);
            pp.setOptions(pp._options);
            pp.index = this.state.pushPins.indexOf(pp);
        });
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


        this.regeneratePushPinText();
        this.generatePolyLines();

    }


    addPushPin(e) {
        const pushPin = new window.Microsoft.Maps.Pushpin(e.location, {

            text: `${this.state.pushPins.length + 1}`,
            draggable: true,
            color: "#00ff00"

        });
        this.state.pushPins.push(pushPin);
        this.map.entities.push(pushPin);
        pushPin.height = 0;
        pushPin.index = this.state.pushPins.length - 1;
        window.Microsoft.Maps.Events.addHandler(pushPin, 'drag', this.handlePushPinDrag);
        window.Microsoft.Maps.Events.addHandler(pushPin, 'mouseover', this.handlePushPinMoseOver);
        window.Microsoft.Maps.Events.addHandler(pushPin, 'mouseout', this.handlePushPinMoseOut);
        window.Microsoft.Maps.Events.addHandler(pushPin, 'click', (e)=>this.removePushPin(e.target));

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

        this.state.polyLine.setLocations(posArray);

    }

    heightOfSelectedPushPinChanged(value) {
        this.state.selectedPushPin.height = value;


    }


    componentDidMount() {

        let script = document.createElement("script");
        script.type = "application/javascript";

        // GetMap function will be called when Bing Maps script is downloaded, so inside there initialize your map and other params
        script.src = "https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AkBVrBtsknpJShn4Yjy9xKpdHxNdYuymoJ_1yHe95ECRs3CEIbwWmD6wje-c1R9v";

        document.body.appendChild(script);


        api.getMissionData(this.props.match.params.mission).then(result=>{
            const json = result.mission.data;
            if(json.wayPoints!=null&&json.wayPoints.length>0) {
                this.setState({
                    selectedMission: json.wayPoints
                })
            }else{
                console.log("Selected Mission is empty")
            }
        })

    }


    render() {
        const {t} = this.props;
        return (
            <>
                <div onClick={this.finishTask} className={MissionGeneratorResultViewerStyle.finishGeneratorButton}><span
                    className={"ignoreDarkMode " + MissionGeneratorResultViewerStyle.finishGeneratorButtonText}>{t('direct_translation_finishAssistent')}</span>
                </div>
                <div style={{userSelect: 'none'}}>

                    <div id="myMap" style={{height: '43em', width: '100vw', marginTop: '20px', userSelect: 'none'}}/>

                </div>



            </>

        );
    }
}

export default withTranslation()(MissionGeneratorResultViewer);