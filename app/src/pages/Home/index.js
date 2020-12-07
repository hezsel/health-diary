import React from 'react';
import NavBar from '../../components/navBar'
import styled from 'styled-components'
import { useHistory } from "react-router-dom"
import api from '../../services'
import Schedules from './schedules'

const Page = styled.div`
  padding-top: 50px;
  padding-left: 120px;
  padding-right: 60px;
  padding-bottom: 50px;
  @media (max-width: 600px) {
    padding-top: 5px;
    padding-right: 5px;
    padding-left: 70px;
  }
`

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
      <Schedules />
    </Page>
  </>)
}
 
export default Home
