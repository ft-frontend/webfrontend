import React, {Component} from 'react';
import SearchResultElementStyle from "./SearchResultElementStyle.module.css"
class SearchResultElement extends Component {
    render() {
        return (
            <div className={SearchResultElementStyle.searchResultElement}>
                <h1>{this.props.element.foundString}</h1>
            </div>
        );
    }
}

export default SearchResultElement;