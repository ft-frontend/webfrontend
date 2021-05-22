import React from "react";
import appSelectorStyle from "./appSelector.module.css"
import AppSelectorIcon from "../../res/appSelector.svg"
import { useState } from "react";


export default function bla(){
    return(
<NavItem>
    <p>Hello World!</p>
</NavItem>
    )
}


function NavItem(props) {
    const[open, setOpen] = useState();

    return (
        <li className="nav-item">
            <button type="button" className={appSelectorStyle.appSelectorButton} onClick={() => setOpen(!open)}>
                <img className={appSelectorStyle.appSelector} src={AppSelectorIcon}  alt="Selector">
                </img>
            </button>
            {open && props.children}
        </li>

    )
};

function DropDownMenu(){
    function DropdownItem(props) {
        return (
            <a href = "#" className="menu-item">
                <span className="icon-button">{props.leftIcon}</span>
                {props.children}
                <span className={"icon-right"}>{props.rightIcon}</span>
            </a>
        )
    }
    return(
        <div className="dropdown">
            <DropdownItem>My Profile</DropdownItem>
        </div>
    )
}
