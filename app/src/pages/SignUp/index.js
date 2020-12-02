import React, { useState } from 'react'
import { LeftCard, RightCard, Fields, ActionArea, CardShadow, Title, Page } from './styles'
import { Button, TextField } from '@material-ui/core'
import doctors from '../../img/doctors.svg'
import { useHistory } from "react-router-dom"
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

const SignUp = () => {
  const history = useHistory()

  api.user.isLoggedIn(history)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const link = {
    marginRight: '10px',
    marginLeft: '10px',
    color: 'white',
    textDecoration: 'none',
  }

  return (
    <ThemeProvider theme={theme}>
      <Page>
        <CardShadow>
          <LeftCard>
            <Title>Novo Usuário</Title>
            <Fields>
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                label='Nome Completo'
                type='text'
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                label='Email'
                type='text'
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                label='Senha'
                type='password'
                onChange={(event) => setPassword(event.target.value)}
              />
              <TextField
                variant='outlined'
                margin='normal'
                fullWidth
                label='Confirmar senha'
                type='password'
                onChange={(event) => setPasswordConfirmation(event.target.value)}
              />
              <ActionArea>
                <Button
                  style={link}
                  variant='contained'
                  size='large'
                  color="secondary"
                  onClick={() => api.user.register(history, {
                    name,
                    email,
                    password,
                    passwordConfirmation,
                  })}
                >
                  Cadastrar !
            </Button>
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

export default SignUp
