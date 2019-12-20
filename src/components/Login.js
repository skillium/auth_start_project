import React from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const Login = ({ auth }) => {
  return !auth.isAuthenticated() ? auth.login() : <Redirect to="/" />
}

Login.propTypes = {
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default Login
