import React, {Component} from 'react';
import "react-bingmaps";

class SimpleMap extends Component {


    constructor(props) {
        super(props);
        this.state = {
            plannerMode: this.props.planner,
            plannerData: JSON.parse(this.props.missionData),
            pushPins: [],
            polyLine: undefined
        };

        this.missionParser = this.missionParser.bind(this);
        this.handlePushPinDrag = this.handlePushPinDrag.bind(this);
        this.generatePolyLines = this.generatePolyLines.bind(this);
        this.addPushPin = this.addPushPin.bind(this);


        const obj = this;
        window.GetMap = function () {
            // eslint-disable-next-line no-undef
            window.Microsoft = Microsoft;
            const pl = new window.Microsoft.Maps.Polyline([])

            obj.setState({
                polyLine: pl
            })

            obj.map = window.Microsoft.Maps.Map('#myMap', {
                credentials: "AkBVrBtsknpJShn4Yjy9xKpdHxNdYuymoJ_1yHe95ECRs3CEIbwWmD6wje-c1R9v",
                center: obj.props.center !== undefined ? new window.Microsoft.Maps.Location(obj.props.center.latitude, obj.props.center.longitude) : "",
                zoom: obj.props.center !== undefined ? 19 : 12,
                mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,

            });
            obj.map.entities.push(pl)

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
                    var loc = new window.Microsoft.Maps.Location(
                        position.coords.latitude,
                        position.coords.longitude);

                    //Center the map on the user's location.
                    obj.map.setView({center: loc, zoom: 15});
                });

                if (obj.state.plannerMode) {
                    obj.missionParser();
                }
            }


        };
    }

    missionParser() {
        console.log("do this");
        console.log(this.state.plannerData);

        this.state.plannerData.forEach(wayPoint => {

            const location = new window.Microsoft.Maps.Location(wayPoint.lat, wayPoint.long);
            const pushPin = new window.Microsoft.Maps.Pushpin(location, {

                text: `${this.state.plannerData.indexOf(wayPoint) + 1}`,
                draggable: true,
                color: "#00ff00"

            });

            pushPin.index = this.state.plannerData.indexOf(wayPoint);
            pushPin.height = 0; //TODO parse height correctly
            window.Microsoft.Maps.Events.addHandler(pushPin, 'drag', this.handlePushPinDrag);
            this.state.pushPins.push(pushPin);
            this.map.entities.push(pushPin);
        });

        this.generatePolyLines();


        //init Event Handlers
        window.Microsoft.Maps.Events.addHandler(this.map, 'rightclick',this.addPushPin);

    }


    addPushPin(e) {
        const pushPin = new window.Microsoft.Maps.Pushpin(e.location, {

            text: `${this.state.pushPins.length + 1}`,
            draggable: true,
            color: "#00ff00"

        });
        this.state.pushPins.push(pushPin);
        this.map.entities.push(pushPin);
        window.Microsoft.Maps.Events.addHandler(pushPin, 'drag', this.handlePushPinDrag);


        this.generatePolyLines()

    }

    handlePushPinDrag(e) {
       this.generatePolyLines()

    }

    generatePolyLines() {

    const posArray = [];
    this.state.pushPins.forEach(wayPoint => {
        posArray.push(wayPoint.getLocation());
    })

    this.state.polyLine.setLocations(posArray);
    console.log(this.state.polyLine)

    }

    componentDidMount() {

        let script = document.createElement("script");
        script.type = "application/javascript";

        // GetMap function will be called when Bing Maps script is downloaded, so inside there initialize your map and other params
        script.src = "https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AkBVrBtsknpJShn4Yjy9xKpdHxNdYuymoJ_1yHe95ECRs3CEIbwWmD6wje-c1R9v";

        document.body.appendChild(script);


    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(!this.state.plannerMode) {
            this.droneLocation.latitude = this.props.center.latitude;
            this.droneLocation.longitude = this.props.center.longitude;
            this.map.setView({
                center: this.droneLocation
            });
            this.dronePos.setLocation(this.droneLocation);

        }
    }


    createMapOptions(maps) {
        return {
            mapTypeId: 'satellite'

        };
    }


    render() {
        return (

            <div>

                <div id="myMap" style={{height: '43em', width: '100vw', marginTop: '20px'}}/>

            </div>
        );
    }
}

export default SimpleMap;