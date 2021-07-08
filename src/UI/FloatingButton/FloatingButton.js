import React, {Component} from 'react';
import FloatingButtonStyle from "./FloatingButton.module.css"
class FloatingButton extends Component {
    render() {
        return (
            <div>
                <div className={FloatingButtonStyle.FloatingButton} onClick={this.props.callback}><p
                    className={FloatingButtonStyle.FloatingButtonText}>{this.props.text}</p></div>
            </div>
        );
    }
}

export default FloatingButton;