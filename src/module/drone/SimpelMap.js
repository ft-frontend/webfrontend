import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';

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
                <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyDeuKpuAsflgkdpDc91N6ybTxK-WXlFqRs"}}
                    defaultZoom={this.props.zoom}
                    center={this.props.center}
                    options={this.createMapOptions}


                >
                    {this.props.children}
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;