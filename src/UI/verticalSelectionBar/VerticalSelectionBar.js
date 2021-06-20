import React from "react";
import VerticalSelectionBarStyle from "./VerticalSelectionBarStyle.module.css"
import { v4 as uuidv4 } from 'uuid';


class VerticalSelectionBar extends React.Component {
    render() {
        const items = [];

         this.props.items.forEach((e) => {
             console.log(window.location.pathname)
             console.log(e.link)
             if(window.location.pathname.toString().toLowerCase()===e.link.toString().toLowerCase()) {
                 items.push(<div key={uuidv4()} className={VerticalSelectionBarStyle.VerticalSelectionBarItem+" "+VerticalSelectionBarStyle.VerticalSelectionBarActiveItem}  onClick={() => window.location.href = e.link}>{e.name}</div>)
             }else{
                 items.push(<div key={uuidv4()} className={VerticalSelectionBarStyle.VerticalSelectionBarItem} onClick={() => window.location.href = e.link}>{e.name}</div>)
             }
         })

        return (
            <div className={VerticalSelectionBarStyle.VerticalSelectionBarWrapper}>
                {items}
            </div>
        );
    }
}

export default VerticalSelectionBar;