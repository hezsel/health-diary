import React from 'react';
import './ListItems.css';

import FlipMove from 'react-flip-move';
import { FiTrash2 } from 'react-icons/fi';

function ListItems(props){
    const items = props.items;

    const listItems = items.map(item =>
   {
       return <div className="list" key={item.key}>
     <p>

        <input type="text" id={item.key} value={'Nome: ' + item.name} />
        <input type="text"  value={'Data: ' + item.date} />
        <input type="text"  value={'Validade: ' +item.validation}/>
             
        <span>
       
        <FiTrash2 size="25px" className="faicons" onClick={() => {
            props.deleteItem(item.key)
        }} icon="trash" />
        </span>
     </p>
     
    </div>})
    return <div>
        <FlipMove duration={300} easing="ease-in-out">
        {listItems}
        </FlipMove>
    
    </div>;
  }

  export default ListItems;