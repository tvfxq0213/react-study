import React , {useEffect, useState} from 'react'
import './favorite.css';
import Axios from 'axios';
import {Button, Popover} from 'antd';
import { IMAGE_BASE_URL} from '../../Config';

function FavoritePage(props) {

  const [Favorites, setFavorites] = useState([]);

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom
    }

    Axios.post('/api/favorite/removeFromFavorite', variables)
    .then( response => {
      if(response.data.success) {
        fetchFavoritedMovie();
      }else{
        alert("리스트에서 삭제되지 못했습니다.")
      }
    })

  }

  const fetchFavoritedMovie = () =>{
    Axios.post('/api/favorite/getFavoriteMovie', {userFrom: localStorage.getItem('userId')})
    .then(response => {
      if(response.data.success){
        console.log(response.data)
        setFavorites(response.data.favorites)

      }else{
        alert("영화 정보를 가져오는데 실패했습니다.");
      }
    }).catch(err =>{
      alert(err);
  })
  }


  useEffect(()=>{
    fetchFavoritedMovie();
   

  },[])


  const renderCards = Favorites.map((favorites, index)=>{

    const content = (
      <div>
          {favorites.moviePost ? 
          <img src={`${IMAGE_BASE_URL}w500${favorites.moviePost}`}/> :"no image"}
      </div>
    )
    return (
    <tr key={index}>
      <Popover content={content} title={`${favorites.movieTitle}`}>
      <td>{favorites.movieTitle}</td>
      </Popover>
      <td>{favorites.movieRuntime}</td>

      <td><Button onClick={()=> onClickDelete(favorites.movieId, favorites.userFrom)}>remove</Button></td>

    </tr>
    ) 
  })


  return (
    <div style={{width:'85%', margin:"3rem auto"}}>
      <h2>Favorite Movies</h2>
      <hr/>

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <th>Remove From favorite</th>

          </tr>
        </thead>
        <tbody>
          {renderCards}
        </tbody>
      </table>
    </div>
  )
}

export default FavoritePage
