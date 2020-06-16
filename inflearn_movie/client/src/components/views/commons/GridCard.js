import React from 'react'
import { Col } from 'antd';
function GridCard(props) {

  if(props.landingPage){
    return (
      <Col lg={6} mb={8} xs={24}>
        <div style={{position:'relative'}}>
          <a href={`/movie/${props.movieId}`}>
            <img style={{width:'100%', height:'auto'}} src={props.image} alt={props.movieName}/>
          </a>
        </div>
      </Col>
    )
  }else{
    return (
      <Col lg={6} mb={8} xs={24}>
        <div style={{position:'relative'}}>
          <a href={`/movie/${props.movieId}`}>
            <img style={{width:'100%', height:'320px'}} src={props.image} alt={props.characterName}/>
          </a>
        </div>
      </Col>
    )
  }
}

export default GridCard
