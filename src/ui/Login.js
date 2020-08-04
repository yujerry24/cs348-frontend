import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  CardHeader,
} from '@material-ui/core';

import { findUser, createUser } from '../utils/APICalls';
import { setUser, setValidLogin } from '../store/actions';

import './Login.scss';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      error: false,
      helperText: '',
    };
  }

  handleLogin = () => {
    findUser(this.state.username).then(res => {
      if (res.length !== 0) {
        this.setState({
          error: false,
          helperText: 'Login Successfully',
        });
        this.props.setValidLogin(true);
        this.props.setUser(res[0].user_id);
      } else {
        this.setState({
          error: true,
          helperText: 'Incorrect username or password',
        });
        this.props.setValidLogin(false);
      }
    });
  };

  handleCreate = () => {
    findUser(this.state.username).then(searchRes => {
      if (searchRes.length === 0) {
        createUser(this.state.username).then(res => {
          this.setState({
            error: false,
            helperText: 'Successfully created user!',
          });
        });
      } else {
        this.setState({
          error: true,
          helperText: 'Another user with that username already exists',
        });
        this.props.setValidLogin(false);
      }
    });
  };

  setLogin = e => {
    this.setState({ username: e.target.value });
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.handleLogin();
    }
  };

  render() {
    return (
      <form className="login-container" noValidate autoComplete="off">
        <Card>
          <CardHeader title="Kpopify Login" />
          <CardContent>
            <div className="textfield-wrapper">
              <TextField
                autoFocus
                error={this.state.error}
                helperText={this.state.helperText}
                fullWidth
                id="username"
                type="email"
                label="Username"
                placeholder="Username"
                margin="normal"
                onChange={this.setLogin}
                onKeyDown={this.handleKeyDown}
              />
            </div>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={this.handleLogin}
            >
              Login
            </Button>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              onClick={this.handleCreate}
            >
              Create User
            </Button>
          </CardActions>
        </Card>
      </form>
    );
  }
}

export default connect(null, {
  setUser,
  setValidLogin,
})(Login);
