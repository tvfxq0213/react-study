import React , {useEffect, useState} from 'react'
import './favorite.css'
import Axios from 'axios'
import {Button} from 'antd'

function FavoritePage() {

  const [Favorites, setFavorites] = useState([]);



  useEffect(()=>{
    Axios.post('/api/favorite/getFavoriteMovie', {userForm: localStorage.getItem('userId')})
    .then(response => {
      if(response.data.success){
        console.log(response.data)
        setFavorites(response.data.favorites)

      }else{
        alert("영화 정보를 가져오는데 실패했습니다.");
      }
    })

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
          {Favorites && Favorites.map((favorites, index)=>{
            return (
            <tr key={index}>
              <td>{favorites.movieTitle}</td>
              <td>{favorites.movieRuntime}</td>

              <td><Button>remove</Button></td>

            </tr>
            ) 
          })}

        </tbody>
      </table>
    </div>
  )
}

export default FavoritePage
