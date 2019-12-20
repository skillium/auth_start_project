import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      profile: null,
    }
  }

  componentDidMount() {
    this.loadUserProfile()
  }

  loadUserProfile = () => {
    const { auth } = this.props
    auth.getProfile(profile => this.setState({ profile }))
  }

  render() {
    const { profile } = this.state

    return (
      profile && (
        <>
          <p>{profile.nickname}</p>
          <img width="50" height="50" alt="profile pic" src={profile.picture} />
          <pre>{JSON.stringify(profile, null, 4)}</pre>
        </>
      )
    )
  }
}

Profile.propTypes = {
  auth: PropTypes.objectOf(PropTypes.object).isRequired,
}

export default Profile
