import React from "react";
import VerticalSelectionBar from "../verticalSelectionBar/VerticalSelectionBar";

class settingsBar extends React.Component {
    render() {
        return <VerticalSelectionBar items={[
            {
                link: "/dashboard/settings/account",
                name: "Edit Profile"
            },
            {
                link: "/dashboard/settings/dummy1",
                name: "dummy"
            },
            {
                link: "/dashboard/settings/dummy2",
                name: "dummy"
            },
            {
                link: "/dashboard/settings/dummy3",
                name: "dummy"
            },
            {
                link: "/dashboard/settings/dummy4",
                name: "dummy"
            },
            {
                link: "/dashboard/settings/dummy5",
                name: "dummy"
            },
            {
                link: "/dashboard/settings/dummy6",
                name: "dummy"
            },

        ]}/>
    }
}

export default settingsBar;
