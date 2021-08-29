import React, {Component} from 'react';
import PageWrapperStyle from "./PageWapper.module.css"
class PageWrapper extends Component {
    render() {
        return (
            <div className={PageWrapperStyle.pageWrapperDiv}>
                {this.props.children}
            </div>
        );
    }
}

export default PageWrapper;