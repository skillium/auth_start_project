import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBIcon,
} from 'mdbreact'

class Navigation extends Component {
  constructor() {
    super()
    this.state = {
      isOpen: false,
    }
  }

  toggleCollapse = () => {
    const { isOpen } = this.state
    this.setState({ isOpen })
  }

  render() {
    const { auth } = this.props
    const { isOpen } = this.state
    return (
      <header>
        <MDBNavbar color="default-color" dark expand="md" fixed="top" scrolling>
          <MDBNavbarBrand>
            <strong className="white-text">Oral Advanced</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
            <MDBNavbarNav left>
              {auth.isAuthenticated() && (
                <MDBNavItem active>
                  <MDBNavLink to="/profile">Profile</MDBNavLink>
                </MDBNavItem>
              )}
            </MDBNavbarNav>

            <MDBNavbarNav right>
              <MDBNavItem>
                {auth.isAuthenticated() ? (
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBNavLink
                        className="dropdown-item text-dark font-weight-bolder"
                        to="/logout"
                      >
                        Salir
                      </MDBNavLink>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                ) : (
                  <MDBNavItem>
                    <MDBNavLink to="/login">Iniciar Sesi&oacute;n</MDBNavLink>
                  </MDBNavItem>
                )}
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </header>
    )
  }
}

Navigation.propTypes = {
  auth: PropTypes.objectOf(PropTypes.any),
}

Navigation.defaultProps = {
  auth: {},
}

export default Navigation
