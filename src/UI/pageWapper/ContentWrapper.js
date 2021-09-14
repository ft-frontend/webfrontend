import React, {Component} from 'react';
import ContentWrapperStyle from "./ContentWapper.module.css"
class ContentWrapper extends Component {
    render() {
        return (
            <div className={ContentWrapperStyle.ContentWrapperDiv}>
                {this.props.children}
            </div>
        );
    }
}

export default ContentWrapper;