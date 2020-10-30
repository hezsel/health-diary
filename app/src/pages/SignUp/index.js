import React, { Component } from 'react';
import { PaginaInteira, Texto, LadoEsquerdo, CamposRegistro, Campos, LadoDireito, AreaBotoes} from './styles';
import { Button, TextField } from '@material-ui/core';

import { Switch, Route, Link } from 'react-router-dom';


class SignUp extends Component{
    render(){
        return(
            <PaginaInteira>
                <Switch>
                    
                
                    
                    <LadoEsquerdo>
                        
                        <Campos>
                         
                            <TextField
                                variant = 'outlined'
                                margin = 'normal'
                                id='nome'
                                fullWidth
                                label='Nome Completo:'
                                name='username'
                                type = 'email'
                            />

                           
                                <Texto>
                                <TextField
                                    variant = 'outlined'
                                    margin = 'normal'
                                    id='numero'
                                    label='Nome de Usuario:'
                                    name='username'
                                    type = 'email'
                                />
                            </Texto>
                            <Texto>
                            <TextField
                                variant = 'outlined'
                                margin = 'normal'
                                id='idade'
                                label='Idade:'
                                name='username'
                                type = 'email'
                            />
                            </Texto>
                            <TextField
                                variant = 'outlined'
                                margin = 'normal'
                                id='numero'
                                label='Celular:'
                                name='username'
                                type = 'email'
                            />
                            

                         
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
                                id='email'
                                label='Confimar Email:'
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
                            
                            <TextField
                                variant = 'outlined'
                                margin = 'normal'
                                fullWidth
                                id='password'
                                label='Confirmar senha:'
                                name='password'
                                type = 'password'
                            />
                          
                            
                              <AreaBotoes>
                              <Link to= "/">
                                    <Button 
                                        variant='contained'
                                        fullWidth
                                        color='black'
                                        size='large'
                                        
                                        >
                                        Concluir
                                    </Button>
                             </Link>
                            </AreaBotoes>
                            

                            
                        </Campos>
                        
                    </LadoEsquerdo>

                    
              </Switch>

               
            </PaginaInteira>

        );
    }
}

export default SignUp;