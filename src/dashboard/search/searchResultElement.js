import React, {Component} from 'react';
import SearchResultElementStyle from "./SearchResultElementStyle.module.css"
import DeviceImageDrawer from "../device/DeviceImageDrawer";
class SearchResultElement extends Component {

    constructor(props) {
        super(props);
        let img;
        let link;
        let quickAccess;


        switch(this.props.element.resultType) {
            case "device":
                img = DeviceImageDrawer(this.props.element.deviceTypeName)
                link = <div className={SearchResultElementStyle.searchResultElementLinks}> <a href={`/dashboard/device/${this.props.element.deviceTypeUUID}/${this.props.element.uuid}`}>Einstellungen</a></div>
                quickAccess = `/module/${this.props.element.deviceTypeName}/select/${this.props.element.uuid}`;
                break;
            case "deviceType":
                img = DeviceImageDrawer(this.props.element.deviceTypeName)
                quickAccess = `/dashboard/device/${this.props.element.UUID}`

                break;

        }


        this.renderingObj =  <div onClick={() => window.location.href = quickAccess} className={SearchResultElementStyle.searchResultElement}>
            <h1>{this.props.element.foundString}</h1>
            <div className={SearchResultElementStyle.searchResultElementNewLine}/>
            <img className={SearchResultElementStyle.searchResultElementImage}  src={img} alt="SelectDevice"/>
            {link}

        </div>

    }


    render() {
        return (
           this.renderingObj
        );
    }
}

export default SearchResultElement;