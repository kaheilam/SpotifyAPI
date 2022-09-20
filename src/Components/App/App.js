import './App.css';
import React from "react";
import {SearchBar} from "../SearchBar/SearchBar";
import {SearchRes} from "../SearchResults/SearchRes";
import {PlayList} from "../PlayList/PlayList";
import Spotify from "../../util/spotify";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchResults : [],
                        playlistName: "My Playlist",
                        playlistTracks: [],
                     }
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track) {
        let tracks = this.state.playlistTracks;
        if (tracks.find(savedTrack => savedTrack.id === track.id )) {
            return;
        } else {
            tracks.push(track);
        }
        this.setState({playlistTracks : tracks});
    }

    removeTrack(track) {
        let tracks = this.state.playlistTracks;

        // tracks only keeps track that not the remove one
        tracks = tracks.filter(curTrack => curTrack.id !== track.id );
        this.setState({playlistTracks : tracks});
    }

    updatePlaylistName(name) {
        this.setState({playlistName: name});
    }

    savePlaylist() {
        let trackURIs = this.state.playlistTracks.map( track => track.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs).then( () => {
            this.setState({playlistName: "New Playlist",
                                playlistTracks: []})
        })

    }

    search(term) {
        Spotify.search(term).then(searchResult => {
            this.setState({searchResults: searchResult})
        })
    }


    render() {
        return(
            <div>

                <div className="navBar">
                    <a href={"/index.html"}>
                        <img src={"/logo3.png"} alt={"spotify logo"}/>
                        <h1>Sp<span className="highlight">ot</span>ify</h1>
                    </a>

                    <SearchBar onSearch={this.search}/>

                </div>

                {/*<div className="sideBar">*/}
                {/*    <a href="/index.html"><i className="ri-home-2-line"></i>Home</a>*/}
                {/*    <a href="/index.html"><i className="ri-star-line"></i>Recommend</a>*/}
                {/*    <br/><br/>*/}
                {/*    <a href="/index.html"><i className="ri-add-box-line"></i>Create PlayList</a>*/}
                {/*    <a href="/index.html"><i className="ri-heart-fill"></i>Liked Songs</a>*/}
                {/*</div>*/}


                <div className="App">
                    <div className="App-playlist">
                        <SearchRes searchResults={this.state.searchResults} onAdd={this.addTrack} />
                        <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}
                                  onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
