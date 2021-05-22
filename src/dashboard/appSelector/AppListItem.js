import React from "react";
import style from "./appListItem.module.css"
class AppListItem extends React.Component {
    constructor(props) {
        super(props);

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