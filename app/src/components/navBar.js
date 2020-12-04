import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { useHistory } from "react-router-dom"
import { logout } from '../services/user'
import {
  Person as PersonIcon,
  Healing as HealingIcon,
  Assignment as AssignmentIcon,
} from '@material-ui/icons'; 

const Home = () => {
  const history = useHistory()
  const [userName] = React.useState(
    localStorage.getItem('session') ?
      JSON.parse(localStorage.getItem('session')).user.name : ''
  )
  const goToPage = (page) => {
    history.push(page)
  }

  return (
    <SideNav
      style={{ background: 'linear-gradient(to top,rgba(105,102,246,0.75), rgba(105,102,246,1))'} }
      onSelect={(selected) => {
        // Add your code here
      }}>
      <SideNav.Toggle />
      <SideNav.Nav>
        <NavItem eventKey="/" onClick={() => goToPage('/')}>
          <NavIcon style={{marginTop: 7}} >
            <PersonIcon />
          </NavIcon>
          <NavText>
            {userName}
          </NavText>
          <NavItem onClick={() => logout(history)}>
            <NavText>
              Sair
            </NavText>
          </NavItem>
        </NavItem>
        <NavItem onClick={() => goToPage('/Immunization')}>
          <NavIcon style={{marginTop: 7}} >
            <HealingIcon />
          </NavIcon>
          <NavText>
            Vacinas
          </NavText>
        </NavItem>
        <NavItem onClick={() => goToPage('/Diagnostic')}>
          <NavIcon style={{marginTop: 7}} >
            <AssignmentIcon />
          </NavIcon>
          <NavText>
            Exames
          </NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  )
}

export default Home
