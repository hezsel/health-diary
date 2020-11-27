import React, { useState } from 'react'
import axios from 'axios'
import { Page, CardShadow, LeftCard, Title, Fields, RightCard, ActionArea } from './styles'
import { Button, TextField } from '@material-ui/core'
import doctors from '../../img/doctors.svg'
import { useHistory } from "react-router-dom"
import { Link } from 'react-router-dom'

const Login = () => {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const link = {
    'marginRight': '10px',
    'marginLeft': '10px',
    'color': 'white',
    'textDecoration': 'none',
  }

  const login = (credentials) => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_ROOT_API}/session`,
      data: credentials,
    })
      .then((res) => {
        localStorage.setItem('session', JSON.stringify(res.data))
        history.push("/Home")
      })
      .catch(() => {
        alert('Credenciais inválidas')
      })
  }

  return (
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
            />
            <TextField
              variant='outlined'
              margin='normal'
              fullWidth
              label='Senha'
              type='password'
              onChange={(event) => setPassword(event.target.value)}
            />
            <ActionArea>
              <Button
                style={link}
                variant='contained'
                size='large'
                color="secondary"
                onClick={() => login({
                  email,
                  password,
                })}
              >
                Entrar
              </Button>
              <Link style={link} to='/home'>
                <Button
                  style={link}
                  variant='outlined'
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
          />
        </RightCard>
      </CardShadow>
    </Page>
  )
}

export default Login
