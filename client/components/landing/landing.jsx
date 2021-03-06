import React from 'react';
import AlertContainer from 'react-alert'
import axios from 'axios';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    // SAM 11/14/2017 - Consolidate this state, this could be handled together, methinks.
    // Similar to the way we decided to handle Bestpin login
    this.state = {
      username: '',
      password: '',
      error: ''
    };

    // These are just for sign-up
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleLogin = this.handleLogin.bind(this);
    this.checkUser = this.checkUser.bind(this);
  }

// THESE ARE JUST FOR THE SIGN UP. 
  // Handle username submission and updates state, gets username from form
  handleUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  // Handle password submission and updates state, gets password from form
  handlePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  // Handle axios request.
  handleSignUp(e) {
    // This only going to be able to check whether the user already
    // has an account. Need to create a new component for adding a user. 
    e.preventDefault(); 
    axios.post('/users', {
      username: this.state.username,
      password: this.state.password
    })
    .then((response) => {
      this.props.setUser(response.data);
    }) 
    .catch((error) => {
      this.setState({
        error: error.response.data
      });
    });
  }

  handleLogin(e) {
    e.preventDefault();
    // Post instead of get so that we can send input data 
    axios.post('/users/auth', {
      username: this.state.username,
      password: this.state.password
    })
    .then((response) => {
      this.props.setUser(response.data);
    })
    .catch((error) => {
      this.setState({
        error: response.data.error
      });
    });
  }

  // Upon loading, check if user is logged in
  checkUser() {
    axios.get('/users/auth')
    .then((response) => {
      this.props.setUser(response.data);
    })
    .catch((error) => {
      console.log('User session expired');
    });
  }

  componentDidMount() {
    this.checkUser();
  }

  render() {
    return (
      <div>
        <span className="red-text auth_error">{this.state.error}</span>
        <form className="login">
          <i className="material-icons prefix">account_circle</i>
          <input type="text" value={this.state.username} onChange={this.handleUsername} placeholder="Username"/>
          <i className="material-icons prefix">edit</i>
          <input type="password" value={this.state.password} onChange={this.handlePassword} placeholder="Password"/>
          <div className="login_buttons">
            <button className="btn waves-effect waves-light right" id="login" type="submit" name="action" onClick={this.handleLogin}>
              Log In
              <i className="material-icons right">send</i>
            </button>
            <button className="btn waves-effect waves-light right" id="signup" type="submit" name="action" onClick={this.handleSignUp}>
              Sign Up
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Landing;