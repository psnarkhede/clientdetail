import React, { useEffect, useState } from 'react' 
import Tableitems from './Tableitems'

const Table = (props) => {
    

  return (
      
    props.data.map((el) => (
        <div key={el.id}>
            <Tableitems data={el} delete={props.delete}/>
        </div>
    ))
        
      
  )
}

export default Table