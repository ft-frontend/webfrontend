//animated toggle using react with the ability to be disabled

//add css
import SwitchStyle from './Switch.module.css';
import React, {Component} from 'react';

class Switch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checked: false
        };
    }

    toggle = () => {
        this.setState({checked: !this.state.checked});
    }


    render() {
        return (
            <div className={SwitchStyle.switch}>
                <label>
                    <input type="checkbox" checked={this.state.checked} onChange={this.toggle}/>
                    <span className={SwitchStyle.lever}></span>
                </label>
            </div>
        );
    }



}

export default Switch;