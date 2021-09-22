import React from "react";
import mapPointer from "../../res/mapPointer.svg"
import mapMakerStyle from "./mapMarkerStyle.module.css"
class MapMarker extends React.Component {


    render() {
        return <img className={mapMakerStyle.mapMakerPosition} src={mapPointer} alt="DronePointer"/>
    }


}

export default MapMarker;