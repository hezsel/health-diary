import React, { Component } from 'react';
import { PaginaInteira, Login, LadoEsquerdo, Texto, Campos, LadoDireito, AreaBotoes} from './styles';
import { Button, TextField } from '@material-ui/core';
import doctors from '../../img/doctors.svg';

import Home from '../Home/index';
import SignUp from '../SignUp/index';
import { Switch, Route, Link } from 'react-router-dom';

class App extends Component{
    render(){
        return(
            <PaginaInteira>
                <Switch>
                <Route path="/Home" component = {Home}/>
                <Route path="/SignUp" component = {SignUp}/>
                <Login>
                    <LadoEsquerdo>
                        <Texto> Health Diary </Texto>
                        <Campos>
                            <TextField
                                variant = 'outlined'
                                margin = 'normal'
                                fullWidth
                                id='email'
                                label='Email:'
                                name='username'
                                type = 'email'
                            />
                            <TextField
                                variant = 'outlined'
                                margin = 'normal'
                                fullWidth
                                id='password'
                                label='Senha:'
                                name='password'
                                type = 'password'
                            />
                          
                            
                              <AreaBotoes>
                                <Link to= "/Home">
                                    <Button 
                                        variant='contained'
                                        fullWidth
                                        color='black'
                                        size='large'
                                        
                                        >
                                        Entrar
                                    </Button>
                                </Link>
                            </AreaBotoes>
                              
                              <AreaBotoes>
                                    <Link to= "/SignUp">  
                                        <Button
                                            type='button'
                                            variant='contained'
                                            fullWidth
                                            color='green'
                                            size='large'
                                            >
                                            Cadastrar-se
                                        </Button>
                                    </Link> 
                                </AreaBotoes> 
                            
                        </Campos>
                        
                    </LadoEsquerdo>

                    <LadoDireito>
                    <img src={doctors} alt="doctors"
                        width='100%'
                        display = 'block'
                        height = '99%'
                        padding = '100px'
                    />
                    </LadoDireito>
                </Login>

                </Switch>
            </PaginaInteira>

        );
    }
}

export default App;