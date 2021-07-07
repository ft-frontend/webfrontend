import React, {Component} from 'react';
import "react-bingmaps";

class SimpleMap extends Component {
    static defaultProps = {

        zoom: 16
    };

    constructor(props) {
        super(props);
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

            const pin = new window.Microsoft.Maps.Pushpin(new window.Microsoft.Maps.Location(obj.props.center.latitude, obj.props.center.longitude),{
             color: 'red'
            })
            obj.map.entities.push(pin);

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
    }


    createMapOptions(maps) {
        return {
            mapTypeId: 'satellite'

        };
    }


    render() {
        return (

            <div>
                {/* <ReactBingmaps bingmapKey=""
                               mapTypeId= "aerial"
                               disableStreetside={true}
                               navigationBarMode = {"compact"}
               // AkBVrBtsknpJShn4Yjy9xKpdHxNdYuymoJ_1yHe95ECRs3CEIbwWmD6wje-c1R9v


                               pushPins = {
                                   [
                                       {
                                           "location":[this.props.center.latitude, this.props.center.longitude], "option":{ color: 'red' }
                                       }
                                   ]
                               }

                               zoom = {19}
                               center = {[this.props.center.latitude, this.props.center.longitude ]}
                />
                */}
                <div id="myMap" style={{height: '43em', width: '100vw', marginTop: '20px'}}/>

            </div>
        );
    }
}

export default SimpleMap;