import React from "react";
import DroneSelectorIcon from "../../res/droneicon.svg";
import LEDWallSelectorIcon from "../../res/ledwallicon.svg";

function DeviceImageDrawer(deviceTypeName) {

    let img;
    switch (deviceTypeName) {
        case "Drone":
            img = DroneSelectorIcon;
            break;
        case "LEDWall":
            img = LEDWallSelectorIcon;
            break;

    }
    return img;





}
export default DeviceImageDrawer;