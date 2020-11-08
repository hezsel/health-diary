import React from 'react';
import { Page } from './styles'
 
const Home = () => {
  const [name] = React.useState(
    localStorage.getItem('session') ?
      JSON.parse(localStorage.getItem('session')).user.name : ''
  )

  return (
    <Page>
      <h1>Bem vindo, {name}</h1>
    </Page>
  )
}
 
export default Home
