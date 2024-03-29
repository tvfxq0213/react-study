import React , {useEffect, useState } from 'react'
import Axios from 'axios'
import {Button } from 'antd';

function Favorite(props) {

  const userFrom = props.userFrom;
  const movieId = props.movieId;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runTime;

  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  
  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime
  }
  useEffect(() => {
    Axios.post('/api/favorite/favoritenumber', variables )
    .then(response => {
       if(response.data.success){
        setFavoriteNumber(response.data.favoriteNumber);
        console.log(response.data);

       } else {
          alert('숫자 정보를 가져오는데 실패했습니다.');
       }
    });
    Axios.post('/api/favorite/favorited', variables )
    .then(response => {
       if(response.data.success){
        setFavorited(response.data.favorited);
        console.log(response.data);

       } else {
          alert('숫자 정보를 가져오는데 실패했습니다.');
       }
    });

    
   
  }, [])

  const onClickFavorite = () => {

    if(Favorited) {
      Axios.post('/api/favorite/removeFromFavorite', variables )
      .then(response => {
        if(response.data.success) {
          setFavoriteNumber(FavoriteNumber - 1)
          setFavorited(!Favorited)

        }else{
          alert("Favorite 리스트에서 지우는 것을 실패했습니다.")
        }
      })

    } else {

      Axios.post('/api/favorite/addToFavorite' , variables)
      .then(response => {
        if(response.data.success) {

          setFavoriteNumber(FavoriteNumber +1)
          setFavorited(!Favorited)
          
        } else {
          alert("Favorite 리스트에서 추가하는 걸 실패했습니다.");
        }
      })

    }

  }

  return (
      <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber}</Button>

  )
}

export default Favorite

