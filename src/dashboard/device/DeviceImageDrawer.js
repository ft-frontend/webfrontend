import DroneSelectorIcon from "../../res/droneicon.svg";
import LEDWallSelectorIcon from "../../res/ledwallicon.svg";
import Default from "../../res/appSelector.svg";

function DeviceImageDrawer(deviceTypeName) {

    let img;
    switch (deviceTypeName) {
        case "Drone":
            img = DroneSelectorIcon;
            break;
        case "LEDWall":
            img = LEDWallSelectorIcon;
            break;
        default:
            img = Default;
            break;

    }
    return img;





}
export default DeviceImageDrawer;