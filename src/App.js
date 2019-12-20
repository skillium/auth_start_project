import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { MDBContainer } from 'mdbreact'

import AuthContext from './Auth/AuthContext'
import auth from './Auth'
import SecureRoute from './Security/SecureRoute'
import PublicRoute from './Security/PublicRoute'

import Navigation from './components/Navigation'
import Public from './components/Public'
// import Profile from './components/Profile'
import Callback from './Callback'
import Login from './components/Login'
import Logout from './components/Logout'

class App extends Component {
  constructor(props) {
    super(props)
    const { history } = this.props
    auth.history = history
    this.state = {
      tokenRenewed: false,
    }
  }

  componentDidMount() {
    auth.renewToken(() => this.setState({ tokenRenewed: true }))
  }

  render() {
    const { tokenRenewed } = this.state
    return !tokenRenewed ? (
      <h1>Loading...</h1>
    ) : (
      <>
        <AuthContext.Provider value={auth}>
          <Navigation auth={auth} />
          <MDBContainer fluid className="text-center mt-5 pt-5">
            <PublicRoute path="/" exact component={Public} />
            <PublicRoute path="/callback" exact component={Callback} />
            <PublicRoute path="/login" exact component={Login} />
            <SecureRoute path="/logout" exact component={Logout} />
          </MDBContainer>
        </AuthContext.Provider>
      </>
    )
  }
}

App.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}

App.defaultProps = {
  history: {},
}

export default App
