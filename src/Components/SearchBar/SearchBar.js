import './SearchBar.css';
import React from "react";

export class SearchBar extends React.Component{

    constructor(props) {
        super(props);
        this.state = { term: '' };
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        this.props.onSearch(this.state.term);
    }

    handleTermChange(event) {
        // event.target.value = user type in
        this.setState({ term: event.target.value});
    }

    render() {
        return(
                <div className="SearchBar">
                    <form className="search-form">
                        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist"/>
                        <button onClick={this.search}><i className="ri-search-line"></i></button>
                    </form>
                </div>
            );
    }
}