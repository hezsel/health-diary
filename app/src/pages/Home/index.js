import React from 'react';
import { Page } from './styles'
import NavBar from '../../components/navBar'
import { useHistory } from "react-router-dom"
import api from '../../services'

const Home = () => {
  const history = useHistory()
  api.user.isLoggedIn(history)

  const [name] = React.useState(
    localStorage.getItem('session') ?
      JSON.parse(localStorage.getItem('session')).user.name : ''
  )

  return (<>
    <NavBar />
    <Page>
      <h1>Bem vindo, {name}</h1>
    </Page>
  </>)
}
 
export default Home
