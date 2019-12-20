/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import AuthContext from '../Auth/AuthContext'

const SecureRoute = ({ component: Component, scopes, ...rest }) => {
  return (
    <AuthContext.Consumer>
      {auth => (
        <Route
          {...rest}
          render={props => {
            if (!auth.isAuthenticated()) return auth.login()

            if (scopes && scopes.length > 0 && !auth.userHasScopes(scopes)) {
              return (
                <h1>
                  Unauthorized - You need the following scopes:{' '}
                  {scopes.join(',')}.
                </h1>
              )
            }

            return <Component auth={auth} {...props} />
          }}
        />
      )}
    </AuthContext.Consumer>
  )
}

SecureRoute.propTypes = {
  component: PropTypes.func.isRequired,
  scopes: PropTypes.shape(PropTypes.array),
}

SecureRoute.defaultProps = {
  scopes: [],
}

export default SecureRoute
