import React, {Component} from 'react';
import "react-bingmaps";
import MissionPlannerControls from "./missionPlaner/missionPlannerControls";
import api from "../../api/api";

class SimpleMap extends Component {


    constructor(props) {
        super(props);

            this.state = {
                plannerMode: this.props.planner,
                plannerData: this.props.planner?JSON.parse(this.props.missionData):undefined,
                pushPins: [],
                polyLine: undefined,
                pushPinHovered: undefined,
                selectedPushPin: undefined

            };



        this.missionParser = this.missionParser.bind(this);
        this.handlePushPinDrag = this.handlePushPinDrag.bind(this);
        this.generatePolyLines = this.generatePolyLines.bind(this);
        this.addPushPin = this.addPushPin.bind(this);
        this.handlePushPinMoseOut = this.handlePushPinMoseOut.bind(this);
        this.handlePushPinMoseOver = this.handlePushPinMoseOver.bind(this);
        this.handleMapRightClick = this.handleMapRightClick.bind(this);
        this.removePushPin = this.removePushPin.bind(this);
        this.regeneratePushPinText = this.regeneratePushPinText.bind(this);
        this.missionComposer = this.missionComposer.bind(this);
        this.handlePushPinClick = this.handlePushPinClick.bind(this);
        this.heightOfSelectedPushPinChanged = this.heightOfSelectedPushPinChanged.bind(this);
        this.preventRedirect = this.preventRedirect.bind(this);



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

            if (obj.props.center) {
                obj.droneLocation = new window.Microsoft.Maps.Location(obj.props.center.latitude, obj.props.center.longitude);

                const pin = new window.Microsoft.Maps.Pushpin(obj.droneLocation, {
                    color: 'red'
                });
                obj.map.entities.push(pin);
                obj.dronePos = pin;
            } else {
                //Center Map to User Location to provide easy possibility to find yourself in the mission planner
                navigator.geolocation.getCurrentPosition(function (position) {
                    const loc = new window.Microsoft.Maps.Location(
                        position.coords.latitude,
                        position.coords.longitude);

                    //Center the map on the user's location.
                    obj.map.setView({center: loc, zoom: 15});
                });

                if (obj.state.plannerData) {
                    obj.missionParser();
                }
            }


        };
    }

    missionParser() {

        this.state.plannerData.forEach(wayPoint => {

            const location = new window.Microsoft.Maps.Location(wayPoint.lat, wayPoint.long);
            const pushPin = new window.Microsoft.Maps.Pushpin(location, {

                text: `${this.state.plannerData.indexOf(wayPoint) + 1}`,
                draggable: true,
                color: "#00ff00"

            });
            pushPin.index = this.state.plannerData.indexOf(wayPoint)
            pushPin.height = wayPoint.height; //TODO parse height correctly
            window.Microsoft.Maps.Events.addHandler(pushPin, 'drag', this.handlePushPinDrag);
            window.Microsoft.Maps.Events.addHandler(pushPin, 'mouseover', this.handlePushPinMoseOver);
            window.Microsoft.Maps.Events.addHandler(pushPin, 'mouseout', this.handlePushPinMoseOut);
            window.Microsoft.Maps.Events.addHandler(pushPin, 'click', this.handlePushPinClick);
            window.Microsoft.Maps.Events.addHandler(pushPin, 'dragstart', this.preventRedirect);
            this.state.pushPins.push(pushPin);
            this.map.entities.push(pushPin);
        });

        this.generatePolyLines();


        //init Event Handlers
        window.Microsoft.Maps.Events.addHandler(this.map, 'rightclick', this.handleMapRightClick);

    }

    missionComposer() {
        return new Promise((resolve, reject) => {

            const finalArray = [];
            const pos = [];

            this.state.pushPins.forEach((pp) => {

                finalArray.push({

                    lat: pp.getLocation().latitude,
                    long: pp.getLocation().longitude,
                    height: pp.height,
                    alt: 0



                })

                pos.push(pp.getLocation().latitude);
                pos.push(pp.getLocation().longitude);

            })

            api.getElevationData(pos).then(result=>{

                this.state.pushPins.forEach((pp) => {

                   finalArray[this.state.pushPins.indexOf(pp)].alt =  (parseFloat(result.elevations[this.state.pushPins.indexOf(pp)])+parseFloat(finalArray[this.state.pushPins.indexOf(pp)].height))
                    console.log(result.elevations[this.state.pushPins.indexOf(pp)])
                    console.log(finalArray[this.state.pushPins.indexOf(pp)].height)
                })

                resolve(finalArray)

            })





        })
    }

    handlePushPinMoseOver(e) {
        this.setState({
            pushPinHovered: e.target
        });
    }

    handlePushPinClick(e) {
        this.setState({
            selectedPushPin: e.target
        })


    }


    handlePushPinMoseOut(e) {
        if ( this.state.pushPinHovered === e.target) {

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

    regeneratePushPinText() {

        this.state.pushPins.forEach(pp=>{
            pp._options.text = ""+(this.state.pushPins.indexOf(pp)+1)
            pp.setOptions(pp._options)
            pp.index = this.state.pushPins.indexOf(pp)
        })
    }

    removePushPin(element) {


        const missionDataIndex =  this.state.pushPins.indexOf(element);
        if (missionDataIndex > -1) {

            this.state.pushPins.splice(missionDataIndex, 1);
        }

        const entityIndex = this.map.entities.indexOf(element);
        if (entityIndex > -1) {

            this.map.entities.removeAt(entityIndex);
        }

        if(this.state.selectedPushPin===element) {
            this.setState({
                selectedPushPin: undefined
            })
        }


            this.setState({
            pushPinHovered: undefined
        })


        this.regeneratePushPinText()
        this.generatePolyLines();

        this.preventRedirect();
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
        pushPin.index = this.state.pushPins.length-1;
        window.Microsoft.Maps.Events.addHandler(pushPin, 'drag', this.handlePushPinDrag);
        window.Microsoft.Maps.Events.addHandler(pushPin, 'mouseover', this.handlePushPinMoseOver);
        window.Microsoft.Maps.Events.addHandler(pushPin, 'mouseout', this.handlePushPinMoseOut);
        window.Microsoft.Maps.Events.addHandler(pushPin, 'click', this.handlePushPinClick);

        this.generatePolyLines();
        this.preventRedirect();
    }

    handlePushPinDrag(e) {
        this.generatePolyLines();

    }

    preventRedirect() {
        window.onbeforeunload = function(){
            return 'Du hast ungespeicherte Änderungen!';
        };
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
        this.preventRedirect();

    }

    componentDidMount() {

        let script = document.createElement("script");
        script.type = "application/javascript";

        // GetMap function will be called when Bing Maps script is downloaded, so inside there initialize your map and other params
        script.src = "https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AkBVrBtsknpJShn4Yjy9xKpdHxNdYuymoJ_1yHe95ECRs3CEIbwWmD6wje-c1R9v";

        document.body.appendChild(script);


    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (!this.state.plannerMode&&this.droneLocation) {
            this.droneLocation.latitude = this.props.center.latitude;
            this.droneLocation.longitude = this.props.center.longitude;
            this.map.setView({
                center: this.droneLocation
            });
            this.dronePos.setLocation(this.droneLocation);

        }
    }





    render() {
        return (

            <div>
                {this.state.plannerMode && <MissionPlannerControls heightChangeCallback={this.heightOfSelectedPushPinChanged} selectedPushPin={this.state.selectedPushPin} missionName={this.props.missionName} missionUUID={this.props.missionUUID} requestDataCallback={this.missionComposer}/>}


                <div id="myMap" style={{height: '43em', width: '100vw', marginTop: '20px'}}/>
            </div>
        );
    }
}

export default SimpleMap;