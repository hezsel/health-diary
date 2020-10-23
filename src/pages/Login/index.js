import React, { Component } from 'react';
import { PaginaInteira, Login, LadoEsquerdo, Texto, Campos, LadoDireito} from './styles';
import { Button, TextField } from '@material-ui/core';
import doctors from '../../img/doctors.svg';

import Home from '../Home/index';
import { Switch, Route, Link } from 'react-router-dom';

class App extends Component{
    render(){
        return(
            <PaginaInteira>
                <Switch>
                <Route path="/Home" component = {Home}/>
               
                <Login>
                    <LadoEsquerdo>
                        <Texto> Bem-Vindo </Texto>
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
                          
                            <Link to= "/Home">
                                <Button
                                    
                                    
                                    type='button'
                                    variant='contained'
                                    fullWidth
                                    color='green'
                                    size='large'
                                    >
                                    Entrar
                                </Button>
                            </Link>

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