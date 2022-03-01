import React from "react";
import Selector from "../../UI/Selector/Selector";
import api from "../../api/api";
import AddDevice from "../../UI/addDevice/AddDevice";

import deviceDashboardFontStyle from "./deviceDashboardFont.module.css"
import DeviceImageDrawer from "./DeviceImageDrawer";
import { withTranslation } from "react-i18next";
import RegisterDeviceDialog from "../../UI/RegisterDeviceDialog/RegisterDeviceDialog";

class dashboardDevice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            deviceTypeList: [],
            renderList: false
        };
    }
    componentDidMount() {
        api.listAvailableDevices().then(r => {
            r.forEach(device => {


                this.state.deviceTypeList.push({
                    link: "/dashboard/device/" + device.UUID,
                    text: device.name,
                    img: DeviceImageDrawer(device.name)
                });
            })
            this.setState({
                renderList: true
            })
        })
    }

    render() {
        const { t } = this.props;
        return (
            <div>
                <h1 className={deviceDashboardFontStyle.deviceDashboardFontCenter}>
                    {t('selectDevice')}
                </h1>
                
                <RegisterDeviceDialog />
                
                {
                    this.state.renderList && <Selector items={this.state.deviceTypeList} />
                }
            </div>
        )
    }

}

export default withTranslation()(dashboardDevice);