import React, {Component} from 'react';
import api from "../../../../api/api";
import MissionGeneratorResultViewerStyle from "./MissionGeneratorResultViewerStyle.module.css";
import {withTranslation} from "react-i18next";

class TestMissionGeneratorResultViewer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            plannerData: this.props.mission,
            pushPins: [],
            polyLine: undefined,
            pushPinHovered: undefined,
            selectedPushPin: undefined,
            selectedMission: undefined


        };




        this.missionParser = this.missionParser.bind(this);
        this.generatePolyLines = this.generatePolyLines.bind(this);
        this.handlePushPinMoseOut = this.handlePushPinMoseOut.bind(this);
        this.handlePushPinMoseOver = this.handlePushPinMoseOver.bind(this);
        this.regeneratePushPinText = this.regeneratePushPinText.bind(this);
        this.missionComposer = this.missionComposer.bind(this);
        this.handlePushPinClick = this.handlePushPinClick.bind(this);
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


                this.state.pushPins.push(pushPin);
                this.map.entities.push(pushPin);
            });


        }
        this.generatePolyLines();

        //init Event Handlers
        window.Microsoft.Maps.Events.addHandler(this.map, 'rightclick', this.handleMapRightClick);


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




    regeneratePushPinText() {

        this.state.pushPins.forEach(pp => {
            pp._options.text = "" + (this.state.pushPins.indexOf(pp) + 1);
            pp.setOptions(pp._options);
            pp.index = this.state.pushPins.indexOf(pp);
        });
    }





    generatePolyLines() {

        const posArray = [];
        this.state.pushPins.forEach(wayPoint => {
            posArray.push(wayPoint.getLocation());
        });

        this.state.polyLine.setLocations(posArray);

    }



    componentDidMount() {

        let script = document.createElement("script");
        script.type = "application/javascript";

        // GetMap function will be called when Bing Maps script is downloaded, so inside there initialize your map and other params
        script.src = "https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AkBVrBtsknpJShn4Yjy9xKpdHxNdYuymoJ_1yHe95ECRs3CEIbwWmD6wje-c1R9v";

        document.body.appendChild(script);


    }

//style={{height: '43em', width: '100vw', marginTop: '20px', userSelect: 'none'}}
    render() {
        const {t} = this.props;
        return (


                    <div id="myMap" style={this.props.style}/>





        );
    }
}

export default withTranslation()(TestMissionGeneratorResultViewer);