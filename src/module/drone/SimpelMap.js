import React, {Component} from 'react';
import "react-bingmaps";

class SimpleMap extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }
        const obj = this;
        window.GetMap = function () {
            // eslint-disable-next-line no-undef
            window.Microsoft = Microsoft;
            obj.map = window.Microsoft.Maps.Map('#myMap', {
                credentials: "AkBVrBtsknpJShn4Yjy9xKpdHxNdYuymoJ_1yHe95ECRs3CEIbwWmD6wje-c1R9v",
                center: new window.Microsoft.Maps.Location(obj.props.center.latitude, obj.props.center.longitude),
                zoom: 19,
                mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,

            });


            const pin = new window.Microsoft.Maps.Pushpin(new window.Microsoft.Maps.Location(obj.props.center.latitude, obj.props.center.longitude),{ //TODO do not create a new ELEMENT!!!
             color: 'red'
            })
            obj.map.entities.push(pin);
            obj.dronePos = pin;

        };
    }

    componentDidMount() {

        let script = document.createElement("script");
        script.type = "application/javascript";

        // GetMap function will be called when Bing Maps script is downloaded, so inside there initialize your map and other params
        script.src = "https://www.bing.com/api/maps/mapcontrol?callback=GetMap&key=AkBVrBtsknpJShn4Yjy9xKpdHxNdYuymoJ_1yHe95ECRs3CEIbwWmD6wje-c1R9v";

        document.body.appendChild(script);


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.map.setView({
            center: new window.Microsoft.Maps.Location(this.props.center.latitude, this.props.center.longitude)
        })
        this.dronePos.setLocation(new window.Microsoft.Maps.Location(this.props.center.latitude, this.props.center.longitude))
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