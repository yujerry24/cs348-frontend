import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Searchbar.scss';

export default class Searchbar extends React.Component {
    render() {
        return (
            <div className='search-bar-container'>
                <TextField id="standard-basic" label="Search"/>
                <Button variant="contained" color="primary" onClick={this.props.onSubmit}>
                   Search
                </Button>
            </div>
        );
    }
}