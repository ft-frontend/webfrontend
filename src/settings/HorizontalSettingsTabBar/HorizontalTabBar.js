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
        console.log(e.target.alt);
        this.setState({
            currentTab: this.props.tabContent[e.target.alt]
        })
    }

    componentDidMount() {
        const items = [];
        let index = 0;
        let startIndex = 0;
        try {
          const subStr =  window.location.hash.substr(1);
          console.log(subStr)
          if(subStr>=0&&subStr<this.props.tabContent.length) {
              startIndex = parseInt(subStr);
          }
        }catch (e) {}
        this.props.tabContent.forEach((e) => {

            const uuid = uuidv4();
            items.push(<><input key={uuidv4()} alt={index} id={uuid} defaultChecked={index===startIndex} onChange={this.contentChange} name={"tabs"} className={HorizontalTabBarStyle.tabSelectInput} type="radio"/><label key={uuid} className={HorizontalTabBarStyle.tab} htmlFor={uuid}><span key={uuidv4()}>{e.name}</span></label></>)
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