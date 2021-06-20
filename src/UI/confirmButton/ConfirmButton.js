import {Component} from "react";

class ConfirmButton extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick() {
        if (window.confirm(this.props.confirmText)) {
            this.props.confirmAction();
        }
    }

    render() {
        return (
            <div className={this.props.className} onClick={this.handleClick}>
                {this.props.children}
            </div>
        );
    }

}

export default ConfirmButton;