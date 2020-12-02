import React, { useState } from 'react'
import { Page, CardShadow, LeftCard, Title, Fields, RightCard, ActionArea } from './styles'
import { Button, TextField } from '@material-ui/core'
import doctors from '../../img/doctors.svg'
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom'
import api from '../../services'

import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#6966f6',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
})

const Login = () => {
  const history = useHistory()

  api.user.isLoggedIn(history)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const link = {
    'marginRight': '10px',
    'marginLeft': '10px',
    'color': 'white',
    'textDecoration': 'none',
  }

  const handleKeyPress = ({ key }) => {
    if (key !== 'Enter') return
    api.user.login(history, { email, password })
  }

  return (
    <ThemeProvider theme={theme}>
      <Page>
        <CardShadow>
          <LeftCard>
            <Title>Health Diary</Title>
            <Fields>
              <TextField
                style={{ color: 'white' }}
                margin='normal'
                variant='outlined'
                fullWidth
                label='Email'
                type='email'
                onChange={(event) => setEmail(event.target.value)}
                onKeyPress={handleKeyPress}
              />
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                label='Senha'
                type='password'
                onChange={(event) => setPassword(event.target.value)}
                onKeyPress={handleKeyPress}
              />
              <ActionArea>
                <Button
                  style={link}
                  variant='contained'
                  size='large'
                  color="secondary"
                  onClick={() => api.user.login(history, {
                    email,
                    password,
                  })}
                >
                  Entrar
              </Button>
                <Link style={link} to='/Register'>
                  <Button
                    style={link}
                    variant='contained'
                    size='large'
                    color="primary"
                  >
                    Cadastrar-se
              </Button>
                </Link>
              </ActionArea>
            </Fields>
          </LeftCard>
          <RightCard>
            <img src={doctors} alt="doctors"
              width='100%'
              display='block'
              height='99%'
              padding='100px'
            />
          </RightCard>
        </CardShadow>
      </Page>
    </ThemeProvider>
  )
}

export default Login
