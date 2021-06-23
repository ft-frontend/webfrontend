import React, {Component} from 'react';
import api from "../../api/api";
import SearchResult from "./searchResult"
import SearchBarStyle from "./SearchBarStyle.module.css"
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showResults: false,
            searchResults: [],
            searchQuery: ""
        };
        this.onType = this.onType.bind(this);
    }




    onType(event) {
        this.setState({
            showResults: false,
            searchQuery: event.target.value.toString()
        });
        if (event.target.value.toString().length >= 2) {
            const thisElement = this;
            api.makeSearchRequest(true, true, event.target.value.toString()).then((result) => {
                console.log(result)
                result.data.sort(function(a, b) {
                    //TODO sort by Categorie
                    //TODO should we really sort for each word!?
                    let pctA = 0;
                    a.foundString.split(' ').forEach(function(element){

                        let levDistA = levDist(element,thisElement.state.searchQuery)
                        let biggerA = Math.max(element.length,thisElement.state.searchQuery.length)
                         pctA += (biggerA- levDistA) / biggerA;

                    })

                    let pctB = 0;
                    b.foundString.split(' ').forEach(function(element){

                        let levDistB = levDist(element,thisElement.state.searchQuery)
                        let biggerB = Math.max(element.length,thisElement.state.searchQuery.length)
                        pctB += (biggerB- levDistB) / biggerB;

                    })

                    pctB /= b.foundString.split(' ').length;
                    pctA /= a.foundString.split(' ').length;



                    if(pctA>pctB) {
                        return -1;
                    }
                    if(pctA<pctB)  {
                        return 1;
                    }

                    return 0;

                })

                result.data.forEach((element) => {

                    let pct = 0;
                    element.foundString.split(' ').forEach(function(element){

                        let levDistB = levDist(element,thisElement.state.searchQuery)
                        let biggerB = Math.max(element.length,thisElement.state.searchQuery.length)
                        pct += (biggerB- levDistB) / biggerB;

                    })

                    pct /= element.foundString.split(' ').length;
                    element.levDist = pct;
                })

                this.setState({
                    searchResults: result.data,
                    showResults: true
                });

            });
        }else {
            this.setState({
                searchResults:[]

            });
        }
    }

    render() {
        return (
            <div>
                <div className={SearchBarStyle.dashboardSearchBarDiv}><input type="text" id="searchBar" className={SearchBarStyle.dashboardSearchBar} onChange={this.onType} placeholder="Zur Suche Text hier eingeben"/></div>
                {(!this.state.showResults&&this.state.searchQuery.length>=2) && <p className={SearchBarStyle.dashboardSearchBarLoading}>Loading...</p>} <SearchResult showError={this.state.showResults} searchQuery={this.state.searchQuery} searchResults={this.state.searchResults}/>
            </div>
        );
    }




}

function levDist(s, t) {
    let d = []; //2d matrix

    // Step 1
    let n = s.length;
    let m = t.length;

    if (n === 0) return m;
    if (m === 0) return n;

    //Create an array of arrays in javascript (a descending loop is quicker)
    for (let i = n; i >= 0; i--) d[i] = [];

    // Step 2
    for (let i = n; i >= 0; i--) d[i][0] = i;
    for (let j = m; j >= 0; j--) d[0][j] = j;

    // Step 3
    for (let i = 1; i <= n; i++) {
        let s_i = s.charAt(i - 1);

        // Step 4
        for (let j = 1; j <= m; j++) {

            //Check the jagged ld total so far
            if (i === j && d[i][j] > 4) return n;

            let t_j = t.charAt(j - 1);
            let cost = (s_i === t_j) ? 0 : 1; // Step 5

            //Calculate the minimum
            let mi = d[i - 1][j] + 1;
            let b = d[i][j - 1] + 1;
            let c = d[i - 1][j - 1] + cost;

            if (b < mi) mi = b;
            if (c < mi) mi = c;

            d[i][j] = mi; // Step 6

            //Damerau transposition
            if (i > 1 && j > 1 && s_i === t.charAt(j - 2) && s.charAt(i - 2) === t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }

    // Step 7
    return d[n][m];
}

export default Search;