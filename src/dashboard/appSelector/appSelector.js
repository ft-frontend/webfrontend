import React from "react";
import appSelectorStyle from "./appSelector.module.css"
import AppSelectorIcon from "../../res/appSelector.svg"
import { useState } from "react";





function NavItem(props) {
    const[open, setOpen] = useState();

    return (
        <button type="button" className={appSelectorStyle.appSelectorButton} onClick={() => setOpen(!open)}>
            <img className={appSelectorStyle.appSelector} src={AppSelectorIcon}  alt="Selector">
            </img>
        </button>
    )
};

export default function DropDownMenu(){
    function DropdownIt
    return(
        <div className="dropdown">

        </div>
    )
}
