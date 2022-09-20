import './SearchRes.css';
import React from "react";
import {TrackList} from "../TrackList/TrackList";

export class SearchRes extends React.Component  {

    render() {
        return (
                    <div className="box">
                        <div className="res">
                            <h2>Search Results</h2>
                            <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemovel={false}/>
                        </div>
                    </div>
        );
    }
}

