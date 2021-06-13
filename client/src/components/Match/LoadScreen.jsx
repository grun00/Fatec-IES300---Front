import React from 'react';
import '../../global.css'


export default (props) => {   
          
    return (
      <React.Fragment>        
        <div id="aviso">
          <h1>{props.aviso}</h1>
        </div> 
        <div id="avisoComplemento">       
          <h4>{props.avisoComplemento}</h4>
        </div>             
      </React.Fragment>
    )
}

