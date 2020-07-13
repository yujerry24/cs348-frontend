import React, { Component } from 'react'

import { Button, TextField, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';

import { findUser, createUser } from '../utils/APICalls';

import './Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      error: false,
      helperText: ''
    }
  }

  handleLogin = () => {
    findUser(this.state.username)
      .then(res => {
        if (res.length !== 0) {
          this.setState({
            error: false,
            helperText: 'Login Successfully',
          });
          this.props.setValidLogin(true);
          this.props.setUserId(res[0].user_id);
        } else {
          this.setState({
            error: true,
            helperText: 'Incorrect username or password'
          });
          this.props.setValidLogin(false);
        }
      })
  };

  handleCreate = () => {
    createUser(this.state.username)
      .then((res) => {
        console.log(res);
        this.setState({
          error: false,
          helperText: 'Successfully created user!'
        })
      })
  }

  setLogin = e => {
    this.setState({ username: e.target.value });
  };

  render() {
    return (
      <form className="login-container" noValidate autoComplete="off">
          <Card>
            <CardHeader title="Database Login" />
            <CardContent>
              <div>
                <TextField
                  error={this.state.error}
                  helperText={this.state.helperText}
                  fullWidth
                  id="username"
                  type="email"
                  label="Username"
                  placeholder="Username"
                  margin="normal"
                  onChange={this.setLogin}
                />
              </div>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={this.handleLogin}>
                Login
              </Button>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={this.handleCreate}>
                Create User
              </Button>
            </CardActions>
          </Card>
        </form>
    )
  }
}

export default Login;