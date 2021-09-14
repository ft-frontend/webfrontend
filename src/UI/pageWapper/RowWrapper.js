import React, {Component} from 'react';
import RowWrapperStyle from "./RowWrapper.module.css"
class RowWrapper extends Component {
    render() {
        return (
            <div className={RowWrapperStyle.rowWrapperDiv}>
                {this.props.children}
            </div>
        );
    }
}

export default RowWrapper;