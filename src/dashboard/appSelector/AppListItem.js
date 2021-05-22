import React from "react";
import style from "./appListItem.module.css"

class AppListItem extends React.Component {
    constructor(props) {
        super(props);

    this.redirect = this.redirect.bind(this);
        }

    redirect() {
    window.location.href = this.props.redirect;
    }
    render() {
        return(
            <div onClick={this.redirect}  className={style.AppListItem}>
                {this.props.iconsrc &&
                <img className={style.AppListItemLeftIcon} src={this.props.iconsrc}></img>
                }
                <p clasName={style.AppListItemNameText}>{this.props.children}</p>
            </div>
        )
    }

}
export default AppListItem;