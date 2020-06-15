import React from 'react';


function MainImage(props){

  console.log(props);
  return (

    <div style={{ background:  `linear-graduent(to bottom, rgba(0,0,0,0) 39%, rgba(0,0,0,0)41%,rgba(0,0,0,0.65) 100%), URL('${props.image}'), #1c1c1c`, 
    position:'relative', 
    height: '500px', 
    width:'100%', 
    backgroundSize: '100% cover',
    backgroundPosition: 'center, center'
    
    }}>
        <div style={{position: 'absolute', maxWidth:'500px', bottom :'2rem', marginLeft:''}}>
          <h2 style={{color:'white'}}> {props.title}</h2>
          <p style={{color:'white', fontSize:'1rem'}}>{props.text}</p>
        </div>
    </div>
  )
}


export default MainImage