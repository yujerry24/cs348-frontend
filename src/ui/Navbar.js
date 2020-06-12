import './Navbar.scss';

const React = require('react');

export default class Navbar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            targetPlaylist: 'Search'
        };
        this.playlistRow = this.playlistRow.bind(this);
        this.onPlaylistClick = this.onPlaylistClick.bind(this);
    }

    onPlaylistClick(playlistName){
        this.setState({targetPlaylist: playlistName});
        this.props.getPlaylist(playlistName);
    }

    playlistRow = (playlistName) => {
        return (
            <div className={`playlist-div ${this.state.targetPlaylist === playlistName ? ' selected' : ''}`}
                onClick={() => this.onPlaylistClick(playlistName)}>
                {playlistName}
            </div>
        );
    };

    render() {
        const {playlists} = this.props;

        return (
            <div>
                {playlists.map(this.playlistRow)}
            </div>
        );
    }
}