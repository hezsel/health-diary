import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './sideBar.css';

class sideBar extends React.Component {
    render(){
    <SideBar>
        <SideNav
          onSelect={(selected) => {
            // Add your code here
          }}
        >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="user">
                <NavItem eventKey="charts">
                    <NavIcon>
                        <AccountCircleIcon/>
                            <i  style={{ fontSize: '2em' }} />
                    </NavIcon>
                <NavText>
                    Usuario
                </NavText>
              <NavItem eventKey="charts/linechart">
                <NavText>
                  Configurações
                </NavText>
              </NavItem>
              <NavItem eventKey="charts/barchart">
                <NavText>
                  Sair
                </NavText>
              </NavItem>
            </NavItem>
          </SideNav.Nav>

          <SideNav.Nav defaultSelected="services">
                <NavItem eventKey="charts">
                    <NavIcon>
                        <SearchIcon/>
                            <i  style={{ fontSize: '2em' }} />
                    </NavIcon>
                <NavText>
                    Serviços
                </NavText>
              <NavItem eventKey="charts/chartOne">
                <NavText>
                  Vacinas
                </NavText>
              </NavItem>
              <NavItem eventKey="charts/chartTwo">
                <NavText>
                  Exames
                </NavText>
              </NavItem>
              <NavItem eventKey="charts/chartThree">
                <NavText>
                  Lembretes
                </NavText>
              </NavItem>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
    </SideBar>
}
}

export default sideBar