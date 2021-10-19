import React, {Component} from 'react';
import "react-bingmaps";
import {withTranslation} from "react-i18next";
import i18next from "i18next";

class SimpleMap extends Component {


    constructor(props) {
        super(props);

            this.state = {
                plannerData: this.props.missionData?this.props.missionData:undefined,
                pushPins: [],
                polyLine: undefined,
                doThingAfterMissionEnd: 0,
                centerOnDrone: true
            };

        this.missionParser = this.missionParser.bind(this);
        this.generatePolyLines = this.generatePolyLines.bind(this);

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


            DroneMapSettings.prototype = new window.Microsoft.Maps.CustomOverlay({ beneathLabels : false });

            function DroneMapSettings() {
                const {t} = obj.props;
                this.mapCenterOnDronePositionUpdate = document.createElement('input');
                this.mapCenterOnDronePositionUpdate.type = 'checkbox';
                this.mapCenterOnDronePositionUpdate.id = "mapCenterOnDronePositionUpdate";
                this.mapCenterOnDronePositionUpdate.name = "mapCenterOnDronePositionUpdate";
                this.mapCenterOnDronePositionUpdate.checked = true;

                this.mapCenterOnDronePositionUpdateLabel = document.createElement('label');
                this.mapCenterOnDronePositionUpdateLabel.htmlFor = "mapCenterOnDronePositionUpdate";
                this.mapCenterOnDronePositionUpdateLabel.innerText = t('centerOnDrone');

                this.mapCenterOnDronePositionUpdate.onchange = function (e) {
                    obj.setState({
                        centerOnDrone: e.target.checked
                    })
                }

            }

            DroneMapSettings.prototype.onAdd = function () {
                //Create a div that will hold pan buttons.
                let container = document.createElement('div');
                container.appendChild(this.mapCenterOnDronePositionUpdate);
                container.appendChild(this.mapCenterOnDronePositionUpdateLabel);

                container.style.position = 'absolute';
                container.style.top = '10px';
                container.style.left = '10px';
                container.style.display = "inline";
                container.style.backgroundColor = "rgba(0,0,0,0.6)"
                container.style.color = "white"
                container.style.width = "183px";
                container.style.padding = "5px";
                container.style.borderRadius = "5px"
                this.setHtmlElement(container);
            };
            var overlay = new DroneMapSettings();

            obj.map.layers.insert(overlay);

            obj.map.entities.push(pl);

                obj.droneLocation = new window.Microsoft.Maps.Location(obj.props.center.latitude, obj.props.center.longitude);

                const pin = new window.Microsoft.Maps.Pushpin(obj.droneLocation, {
                    color: 'red'
                });
                obj.map.entities.push(pin);
                obj.dronePos = pin;

            if (obj.state.plannerData) {
                obj.missionParser();
            }


        }
    }

    missionParser() {
        if(this.state.plannerData.wayPoints) {

            this.state.plannerData.wayPoints.forEach(wayPoint => {

                const location = new window.Microsoft.Maps.Location(wayPoint.lat, wayPoint.long);
                const pushPin = new window.Microsoft.Maps.Pushpin(location, {

                    text: `${this.state.plannerData.wayPoints.indexOf(wayPoint) + 1}`,
                    draggable: !!this.state.plannerMode,
                    color: "#00ff00"

                });
                pushPin.index = this.state.plannerData.wayPoints.indexOf(wayPoint)
                pushPin.height = wayPoint.height;
                if(this.state.plannerMode) {
                    window.Microsoft.Maps.Events.addHandler(pushPin, 'drag', this.handlePushPinDrag);
                    window.Microsoft.Maps.Events.addHandler(pushPin, 'mouseover', this.handlePushPinMoseOver);
                    window.Microsoft.Maps.Events.addHandler(pushPin, 'mouseout', this.handlePushPinMoseOut);
                    window.Microsoft.Maps.Events.addHandler(pushPin, 'click', this.handlePushPinClick);
                }
                this.state.pushPins.push(pushPin);
                this.map.entities.push(pushPin);
            });

        }
        this.generatePolyLines();


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
        script.src = "https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AkBVrBtsknpJShn4Yjy9xKpdHxNdYuymoJ_1yHe95ECRs3CEIbwWmD6wje-c1R9v&setLang="+i18next.language;
        console.log()
        document.body.appendChild(script);


    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (this.droneLocation) {
            this.droneLocation.latitude = this.props.center.latitude;
            this.droneLocation.longitude = this.props.center.longitude;
            if(this.state.centerOnDrone) {
                this.map.setView({
                    center: this.droneLocation
                });
            }
            this.dronePos.setLocation(this.droneLocation);
        }
    }





    render() {
        return (

            <div>
                <div id="myMap" style={{height: '43em', width: '100vw', marginTop: '20px'}}/>
            </div>
        );
    }
}

export default withTranslation()(SimpleMap);