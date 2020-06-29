import React , {useEffect, useState} from 'react'
import {Tooltip} from 'antd';
import {LikeOutlined , DislikeOutlined} from '@ant-design/icons';
import Axios from 'axios';

function LikeDislikes(props) {

  let variable = {}
  const [Likes, setLikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [Dislikes, setDislikes] = useState(0)
  const [DislikeAction, setDislikeAction] = useState(null);


  if(props.video){
    variable = {videoId : props.videoId, userId: props.userId}
  }else{
    variable = {commentId : props.commentId, userId: props.userId}
  }

  useEffect(() => {
    Axios.post('/api/like/getlikes', variable)
    .then(response => {
      if(response.data.success){

        console.log(response.data);
        //얼마나 많은 좋아요를 받았는지

        setLikes(response.data.likes.length);
        response.data.likes.map(like => {
          if(like.userId === props.userId){
            setLikeAction('liked');
          }else{

          }
        })

        // 내가 좋아요를 눌렀었는지

      }else {
        alert("Likes에 대한 정보를 가져오지 못했습니다. ")
      }
    })


    Axios.post('/api/like/getdislikes', variable)
    .then(response => {
      if(response.data.success){

        console.log(response.data);
        //얼마나 많은 싫어요를 받았는지

        setDislikes(response.data.dislikes.length);
        response.data.dislikes.map(dislike => {
          if(dislike.userId === props.userId){
            setDislikeAction('disliked');
          }else{

          }
        })
      }else {
        alert("disikes에 대한 정보를 가져오지 못했습니다. ")
      }
    })
  }, [])

  const onLike = () => {
    if(LikeAction === null){
      Axios.post('/api/like/upLike', variable)
      .then(response =>{

        if(response.data.success){
          setLikes(Likes + 1);
          setLikeAction('liked');

          if(DislikeAction !== null){
            setDislikeAction(null);
            setDislikes(Dislikes - 1 );
          }
        }else{
          alert('Like를 올리지 못했습니다.')
        }

      })
    }else {
      Axios.post('/api/like/unLike', variable)
      .then(response =>{

        if(response.data.success){
          setLikes(Likes - 1);
          setLikeAction(null);
        }else{
          alert('unLike를 올리지 못했습니다.')
        }

      })
    }
  }

  const onDislike = () => {
    if(DislikeAction !== null){
      Axios.post('/api/like/unDislike', variable)
      .then(response =>{

        if(response.data.success){
          setDislikeAction(null);
          setDislikes(Dislikes - 1 );
        }else{
          alert('disLike를 올리지 못했습니다.')
        }

      })
    }else {
      Axios.post('/api/like/upDislike', variable)
      .then(response =>{

        if(response.data.success){
          setDislikes(Dislikes + 1);
          setDislikeAction('unliked');

          if(LikeAction !== null){
            setLikeAction(null);
            setLikes(Likes - 1 );
          }
        }else{
          alert('disLike를 지우지 못했습니다.')
        }

      })
    }
  }

  return (
    <div>
      <span key="comment-basic-like" style={{marginRight:'10px'}}>
        <Tooltip title="Like">
          <LikeOutlined style={{color:LikeAction === 'liked' ? 'red' : 'black'}} onClick={onLike} />
        </Tooltip>
        <span style={{paddingLeft: '8px', cursor:'auto'}}>{Likes}</span>
      </span>
      <span key="comment-basic-dislike">
        <Tooltip title="Dislike">
          <DislikeOutlined style={{color: DislikeAction === 'disliked' ? 'red' : 'black'}} onClick={onDislike}/>
          </Tooltip>
        <span style={{paddingLeft: '8px', cursor:'auto'}}>{Dislikes}</span>
      </span>

    </div>
  )
}

export default LikeDislikes
