import React, {Component} from 'react';
import SettingsPageWrapperStyle from "./SettingsPageWrapperStyle.module.css"
class SettingsPageWrapper extends Component {
    render() {
        return (
            <div className={SettingsPageWrapperStyle.SettingsPageWrapper}>
                {this.props.children}
            </div>
        );
    }
}

export default SettingsPageWrapper;