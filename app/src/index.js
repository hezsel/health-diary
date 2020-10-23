import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

import Home from './pages/Home/index'
import Login from './pages/Login/index'
import SignUp from './pages/SignUp/index'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#3F3D93',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Route path="/Home" component={Home} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/Login" component={Login} />
      <Redirect to={"/Login"} />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root'),
)

serviceWorker.unregister()
