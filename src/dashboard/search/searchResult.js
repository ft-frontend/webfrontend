import React, {Component} from 'react';
import uuid from "uuid";
import SearchResultElement from "./searchResultElement";
import SearchBarStyle from "./SearchBarStyle.module.css"

class SearchResult extends Component {

    constructor(props) {
        super(props);
        this.state = {
            elements: []
        }
    }


    static getDerivedStateFromProps(props, state) {
       return renderEntries(props,state)
    }



    render() {
        return (
            <div>
                {this.state.elements}
            </div>
        );
    }
}

function renderEntries(props,state) {
    const elements = [];
    props.searchResults.forEach((searchResult) => {
       // elements.push(<div><h1 key={uuid()}>{searchResult.foundString}</h1><p>{(searchResult.levDist*100)+"%"}</p></div>)
        elements.push(<SearchResultElement key={uuid()} element={searchResult}/>)

    })

    if(props.searchResults.length===0&&props.searchQuery.length>=2&&props.showError) {
        elements.push(<p className={SearchBarStyle.dashboardSearchBarLoading}>Keine Ergebnisse</p>)
    }
    state.elements = elements;

    return state;

}

export default SearchResult;