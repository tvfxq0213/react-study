import React from 'react'
import Axios from 'axios'
import {Button } from 'antd';
import 'antd/dist/antd.css';


function deleteBtn(props) {

  const variable = {
    videoId: props.videoId
  }
  const DeleteVideo = (props) => {
    Axios.post('/api/video/deleteVideo', variable)
    .then(response => {
      if( response.data.success) {
        alert('비디오가 삭제되었습니다.')
        props.history.push('/')
      }else{
        alert('영상을 삭제하는데 실패했습니다.')
      }
    })

  }
  if(props.userId) { 

    return (
        <div className="btn-wrap" >
          <Button type="primary" danger="true" onClick={DeleteVideo}>Delete</Button>
        </div>
        )
    
  
  }
}

export default deleteBtn
