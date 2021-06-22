import React, {Component} from 'react';
import uuid from "uuid";
import SearchResultElement from "./searchResultElement";

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
    state.elements = elements;
console.log(props.searchResults)
    return state;

}

export default SearchResult;