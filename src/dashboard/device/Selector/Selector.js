import React from "react";
import SelectorStyle from "./Selector.module.css"
import HomeSelectorIcon from "../../../res/home.svg";

class Selector extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            items: []
        }


        this.props.items.forEach(item => {

            this.state.items.push(
                <li className={SelectorStyle.DeviceSelectorLI}><div className={SelectorStyle.DeviceSelectorItem} onClick={() => {window.location.href=item.link}}><img className={SelectorStyle.DeviceSelectorItemImage} src={item.img} alt="SelectDevice"/><p className={SelectorStyle.DeviceSelectorItemName}>{item.text}</p></div></li>
            )

        })

    }

    render() {



        return (
            <div className={SelectorStyle.DeviceSelectorParentDiv}>
            <ul className={SelectorStyle.DeviceSelectorUL}>
                {this.state.items}

                {/* <li className={SelectorStyle.DeviceSelectorLI}><div className={SelectorStyle.DeviceSelectorItem} onClick={()=>{alert("demo")}}><img className={SelectorStyle.DeviceSelectorItemImage} src={HomeSelectorIcon} alt="SelectDevice"/><p className={SelectorStyle.DeviceSelectorItemName}>testitem</p></div></li> */}


            </ul>
            </div>

        );
    }

}

export default Selector;