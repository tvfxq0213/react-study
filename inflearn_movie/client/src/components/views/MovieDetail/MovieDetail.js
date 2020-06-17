import React, { useEffect , useState } from 'react'
import { API_KEY , API_URL, IMAGE_BASE_URL} from '../../Config';
import MainImage from '../LandingPage/Section/MainImage'
import MovieInfo  from '../MovieDetail/Section/MovieInfo';
import GridCard  from '../commons/GridCard';
import Favorite from '../MovieDetail/Section/Favorite'
import  {Row } from 'antd';


function MovieDetail(props) {

  let movieId = props.match.params.movieId;

  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [actorToggle, setactorToggle] =  useState(false);

  const toogleActorView = () =>{
    setactorToggle(!actorToggle);
  }

  useEffect(() => {
    
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

    fetch(endpointInfo)
      .then(response => response.json() )
      .then(response => {
        setMovie(response)
      })
     

    fetch(endpointCrew)
      .then(response => response.json() )
      .then(response => {
        console.log(response);
        setCasts(response.cast)
      })
     
    }, [])

  return (
    <div>
      {/*header */}
      <MainImage 
        image={ `${IMAGE_BASE_URL}w1280/${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
      />
      <div style={{width:'85%', margin:'1rem auto'}}>
        <div style={{display: 'flex', justifyContent:'flex-end'}}>
          <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}/>
        </div>
        <MovieInfo
        movie={Movie}
        />
        <br/>

        {/*actor grid */}
        
        <div style={{display:'flex', justifyContent: 'center', margin:'2rem'}}>
          <button onClick={toogleActorView}>Toggle Actor View</button>
        </div>
        {actorToggle && 
        <Row gutter={[16,16]}>
                    {Casts && Casts.map((cast, index) => (
        <React.Fragment key={index}>
          <GridCard
            image={cast.profile_path ? `${IMAGE_BASE_URL}w500/${cast.profile_path}` : null}
            movieId={cast.cast_id}
            characterName={cast.name}
          />
        </React.Fragment>
          ))}
        </Row>
        }

      </div>
    </div>
  )
}

export default MovieDetail
