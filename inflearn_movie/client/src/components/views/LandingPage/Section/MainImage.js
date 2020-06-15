import React from 'react';


function MainImage(props){

  console.log(props);
  return (

    <div style={{ background:  `URL('${props.image}'), #1c1c1c`, 
    position:'relative', 
    height: '500px', 
    width:'100%', 
    backgroundSize: 'cover',
    backgroundRepeat  : 'no-repeat',
    backgroundPosition: 'center',
    
    }}>
        <div style={{position: 'absolute', maxWidth:'100%', padding:'0 7.5%', width:'100%', bottom :'2rem', margin:'0 auto'}}>
          <h2 style={{color:'white'}}> {props.title}</h2>
          <p style={{color:'white', fontSize:'1rem'}}>{props.text}</p>
        </div>
    </div>
  )
}


export default MainImage