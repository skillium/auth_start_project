import auth0 from 'auth0-js'

const REDIRECT_ON_LOGIN = 'redirect_on_login'
let _idToken = null
let accessToken = null
let _expiresAt = null
let _scopes = []

class Auth {
  constructor(history) {
    this.userProfile = null
    this.history = history
    this.requestedScopes = 'openid profile email'
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: 'token id_token',
      scope: this.requestedScopes
    })
  }

  login = () => {
    localStorage.setItem(
      REDIRECT_ON_LOGIN,
      JSON.stringify(this.history.location)
    )
    this.auth0.authorize()
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)

        let location =
          JSON.parse(localStorage.getItem(REDIRECT_ON_LOGIN)) || '/'
        location = location === '/login' ? '/' : '/'

        this.history.push(location)
      } else {
        this.history.push('/')
        alert(`Error: ${err.error}. Check the console for further details.`)
      }
      localStorage.removeItem(REDIRECT_ON_LOGIN)
    })
  }

  setSession = authResult => {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    const scopes = authResult.scope || this.requestedScopes || ''

    accessToken = authResult.accessToken
    _idToken = authResult.idToken
    _expiresAt = expiresAt
    _scopes = scopes
    this.scheduleTokenRenewal()
  }

  getAccessToken = () => {
    if (!accessToken) {
      throw new Error('No access token found.')
    }

    return accessToken
  }

  getProfile = cb => {
    if (this.userProfile) return cb(this.userProfile)

    return this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile
      cb(profile, err)
    })
  }

  userHasScopes(scopes) {
    const grantedScopes = (_scopes || '').split(' ')
    return scopes.every(scope => grantedScopes.includes(scope))
  }

  isAuthenticated = () => new Date().getTime() < Number(_expiresAt)

  logout = () => {
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENTID,
      returnTo: 'http://localhost:3000'
    })
  }

  renewToken = cb => {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(`Error: ${err.error} - ${err.error.description}`)
      } else {
        this.setSession(result)
      }

      if (cb) cb(err, result)
    })
  }

  scheduleTokenRenewal() {
    const delay = _expiresAt - Date.now()
    if (delay > 0) setTimeout(() => this.renewToken, delay)
  }
}

const auth = new Auth()

export default auth
