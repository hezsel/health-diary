import React from 'react';
import './Vac.css';
import ListItems from './ListItems'
import { AiOutlinePlus } from 'react-icons/ai';

class Vac extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        name:'',
        date:'',
        validation:'',
        key:''
      }
    }
    this.addItem = this.addItem.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.deleteItem = this.deleteItem.bind(this);


  }

  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    if(newItem.name !==""){
      const items = [...this.state.items, newItem];
    this.setState({
      items: items,
      currentItem:{
        name: '',
        date:'',
        validation:'',
        key:''
      }
    })
    }
  }

  handleInput(e){
    this.setState({
      currentItem:{
        name : e.target.value,
        key: Date.now()
      }
    })
  }


  deleteItem(key){
    const filteredItems= this.state.items.filter(item =>
      item.key!==key);
    this.setState({
      items: filteredItems
    })
  }

 render(){
  return (
    <div className="App">
      <header>
        <h1> Suas Vacinas:</h1>

        <form id="to-do-form" onSubmit={this.addItem}>
          <div>
            <h2>Nome: </h2>
            <input type="text" placeholder="Nome" value= {this.state.currentItem.name} onChange={this.handleInput} name='name'></input>
          </div>

          <div display='inline-block' backgroud = 'black'>
            <h2>Data: </h2>
            <input type="date" placeholder="Data" name='date'></input>
          </div>
          
          <div>
            <h2>Validade: </h2>
            <input type="date" placeholder="Validade" name='validation'></input>
          </div>

          <button type="submit">
            <AiOutlinePlus color='white' size="20px" />
          </button>
        </form>

     
          <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/>
      </header>
    </div>
  );
 }
}

export default Vac;
