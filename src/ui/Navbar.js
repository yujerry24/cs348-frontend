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

    onPlaylistClick(playlistId){
        this.setState({targetPlaylist: playlistId});
        this.props.getPlaylist(playlistId);
    }

    playlistRow = ({playlist_id, name}) => {
        return (
            <div className={`playlist-div ${this.state.targetPlaylist === playlist_id ? ' selected' : ''}`}
                onClick={() => this.onPlaylistClick(playlist_id)}>
                {name}
            </div>
        );
    };

    render() {
        const {playlists} = this.props;

        return (
            <div>
                {playlists && playlists.map(this.playlistRow)}
            </div>
        );
    }
}