import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ImmunizationPage from './pages/ImmunizationPage'
import DiagnosticPage from './pages/DiagnosticPage'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#6966f6',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Register" component={SignUp} />
        <Route path="/Login" component={Login} />
        <Route path="/Immunization" component={ImmunizationPage} />
        <Route path="/Diagnostic" component={DiagnosticPage} />
      </Switch>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
