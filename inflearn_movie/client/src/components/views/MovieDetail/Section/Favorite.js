import React , {useEffect, useState } from 'react'
import Axios from 'axios'

function Favorite(props) {

  useEffect(() => {

    const userFrom = props.userFrom;
    const movieId = props.movieId;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runTime

    let variables ={
      userFrom,
      movieId
    }

    Axios.post('/api/favorite/favoriteNumber', variables )
    .then(response => {
       if(response.data.success){

        console.log(response.data);

       } else {
          alert('숫자 정보를 가져오는데 실패했습니다.');
       }
    });
    
  }, [])

  return (
      <button>Favorite</button>

  )
}

export default Favorite
