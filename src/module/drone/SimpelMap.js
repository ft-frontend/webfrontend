import React, {Component} from 'react';
import { ReactBingmaps } from 'react-bingmaps';
const AnyReactComponent = ({text}) => <div>{text}</div>;

class SimpleMap extends Component {
    static defaultProps = {

        zoom: 16
    };

    constructor(props) {
        super(props);

    }


componentDidMount() {
        this.forceUpdate();
}

createMapOptions(maps) {
    return {
        mapTypeId: 'satellite'

    }
}

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{height: '43em', width: '100%', marginTop: '20px'}}>

                <ReactBingmaps bingmapKey="AkBVrBtsknpJShn4Yjy9xKpdHxNdYuymoJ_1yHe95ECRs3CEIbwWmD6wje-c1R9v"
                               mapTypeId= "aerial"
                               disableStreetside={true}
                               navigationBarMode = {"compact"}


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
            </div>
        );
    }
}

export default SimpleMap;