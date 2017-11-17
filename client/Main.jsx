import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Landing from './components/landing/Landing.jsx';
import GamesView from './components/gamesList/GamesView.jsx';
import { Route, Redirect } from 'react-router';
import { BrowserRouter, Link, Switch } from 'react-router-dom'
import LeaderBoard from './components/leaderboard/Leaderboard.jsx';
import Profile from './components/profile/Profile.jsx';
import NavBar from './components/navbar/NavBar.jsx';
//all components will be attached to this Page component.
//Page component will be rendered to the html file
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
  }

  setUser(user) {
    this.setState({ user });
  }

  logout() {
    axios.get('/logout')
    .then((response) => {
      this.setState({ user: null });
    })
    .catch((error) => {
      this.setState({ user: null });
    });
  }

  render(props) {
    // only render the gamesView if this.state.user is defined.
    // this.state.user gets defined by the setUser function in Lander.
    return (
      <BrowserRouter>
        <div className="outerbox">
          <NavBar logout={this.logout} show={this.state.user !== null} user={this.state.user}/>
          {this.state.user === null ? 
          (<h6>
            <Landing setUser={this.setUser} />
            </h6>
          ) : (
          <div>
            <Switch>
              <Redirect exact from='/' to='/gameList'/>
              <Route path='/gameList' render={() => <GamesView user={this.state.user} />} />
              <Route path='/leaderboard' render={() => <LeaderBoard user={this.state.user}/>}/>
              <Route path='/profile' render={() => <Profile user={this.state.user}/>}/>
            </Switch>
          </div>)}
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<Page />, document.getElementById('mount'));
