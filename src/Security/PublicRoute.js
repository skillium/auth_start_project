/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import AuthContext from '../Auth/AuthContext'

const PublicRoute = ({ component: Component, path, ...rest }) => {
  return (
    <AuthContext.Consumer>
      {auth => (
        <Route
          {...rest}
          path={path}
          render={props => <Component auth={auth} {...props} />}
        />
      )}
    </AuthContext.Consumer>
  )
}

PublicRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
}

export default PublicRoute
