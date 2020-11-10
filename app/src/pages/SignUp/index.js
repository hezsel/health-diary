import React, { useState } from 'react'
import axios from 'axios'
import { LeftCard, RightCard, Fields, ActionArea, CardShadow, Title, Page } from './styles'
import { Button, TextField } from '@material-ui/core'
import doctors from '../../img/doctors.svg'
import { useHistory } from "react-router-dom"

const SignUp = () => {
  const history = useHistory()

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
  
  const registerUser = ({
    name,
    password,
    passwordConfirmation,
    email,
  }) => {
    if (password !== passwordConfirmation) {
      alert('Senhas são diferentes')
      return
    }
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_ROOT_API}/user`,
      data: {
        name,
        email,
        password,
      },
    })
      .then(() => { 
        alert('Cadasto realizado com sucesso!')
        history.push("/Login")
      })
      .catch(() => {
        alert('Verifique os campos e tente novamente.')
      })
  }

  return (
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
                onClick={() => registerUser({
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
  )
}

export default SignUp
