import React from "react";
import {
    useParams
} from "react-router-dom";

function DeviceSettings(props)  {



    let {device} = useParams();




    return <h1>{device}</h1>


}

export default DeviceSettings;