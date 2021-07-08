import React, {Component} from 'react';
import FloatingButton from "../../../UI/FloatingButton/FloatingButton";

class AddMissionButton extends Component {

    constructor(props) {
        super(props);
        this.openAddMissionMenu = this.openAddMissionMenu.bind(this);
    }


    openAddMissionMenu() {
        window.location.href="/module/drone/missions/add"
    }

    render() {
        return (
            <div>
                <FloatingButton callback={this.openAddMissionMenu} text={"+"}/>
            </div>
        );
    }
}

export default AddMissionButton;