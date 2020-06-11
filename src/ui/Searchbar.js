import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Searchbar.scss';

export default class Searchbar extends React.Component {
    constructor(){
        super();
        this.state = { searchText: ''};
    }
    
    render() {
        return (
            <div className='search-bar-container'>
                <TextField id="standard-basic" label="Search" onChange={e=> this.setState({searchText: e.target.value})} />
                <Button variant="contained" color="primary" onClick={() => this.props.onSubmit(this.state.searchText)}>
                   Search
                </Button>
            </div>
        );
    }
}