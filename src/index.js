/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import './index.css'
import App from './App'

//import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
  <Router>
    <Route component={App} />
  </Router>,
  document.getElementById('root')
)

//registerServiceWorker()
