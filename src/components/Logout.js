import React from 'react'
import PropTypes from 'prop-types'

const Logout = ({ auth }) => {
  auth.logout()
  return <></>
}

Logout.propTypes = {
  auth: PropTypes.objectOf(PropTypes.any).isRequired,
}

export default Logout
