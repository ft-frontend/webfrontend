import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid';
import HorizontalTabBarStyle from "./HorizontalTabBarStyle.module.css"

class HorizontalTabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: this.props.tabContent[0],
            items: []
        }
        this.contentChange = this.contentChange.bind(this);
    }

    contentChange(e) {
        console.log(e.target.accessKey);
        this.setState({
            currentTab: this.props.tabContent[e.target.accessKey]
        })
    }

    componentDidMount() {
        const items = [];
        let index = 0;
        this.props.tabContent.forEach((e) => {

            const uuid = uuidv4();
            items.push(<><input key={uuidv4()} accessKey={index} id={uuid} defaultChecked={index===0} onChange={this.contentChange} name={"tabs"} className={HorizontalTabBarStyle.tabSelectInput} type="radio"/><label key={uuid} className={HorizontalTabBarStyle.tab} htmlFor={uuid}><span key={uuidv4()}>{e.name}</span></label></>)
            index++;
        })
    this.setState({
        items: items
    })
    }

    render() {

        return (
            <>
            <div className={HorizontalTabBarStyle.tabBarContainer}>
                    {this.state.items}
                <span className={HorizontalTabBarStyle.glider}/>

            </div>
                {this.state.currentTab.content}
            </>
        );
    }
}

export default HorizontalTabBar;