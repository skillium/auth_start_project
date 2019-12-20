import React, { Component } from 'react'
import PropTypes from 'prop-types'
import auth from './Auth'

class Callback extends Component {
  componentDidMount() {
    const { location } = this.props
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication()
    } else {
      throw new Error('Invalid Callback.')
    }
  }

  render() {
    return <h1>Loading...</h1>
  }
}

Callback.propTypes = {
  location: PropTypes.shape(PropTypes.object).isRequired,
}

export default Callback
