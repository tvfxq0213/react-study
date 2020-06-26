import React , { useEffect, useState } from 'react'
import { List, Avatar, Row, Col, Button  } from 'antd';
import Axios from 'axios';
import DeleteBtn from './Sections/deleteBtn.js';
import SideVideo from './Sections/SideVideo.js';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';

function VideoDetailPage(props) {

  const videoId = props.match.params.videoId
  const variable = {
    videoId
  }

  const [VideoDetail, setVideoDetail] = useState([]);
  const [DeleteBtnShow, setDeleteBtnShow] = useState(false);

  const [Comments, setComments] = useState([]);
  



  useEffect(()=>{
    Axios.post('/api/video/getVideoDetail', variable)
    .then(response => {
        if (response.data.success) {
            setVideoDetail(response.data.video)
            if(response.data.video.writer._id == localStorage.getItem('userId')){ 
              // 작성자와 로그인한 userId가 같아야 삭제 버튼이 나타남
              setDeleteBtnShow(!DeleteBtnShow);
            }
        } else {
            alert('Failed to get video Info')
        }
    })
  }, [videoId]) //  props.match.params.videoId가 바뀔때만 재구독한다. 


  useEffect(()=>{
    Axios.post('/api/comment/getComment', variable)
    .then(response => {
        if (response.data.success) {
          console.log(response.data);
          setComments(response.data.comments);
        } else {
            alert('Failed to get video Info')
        }
    })
  },[])

  const updateComment = (newComment) => {
    setComments(Comments.concat(newComment))
  }


  

  if (VideoDetail.writer) {
    const subscribeBtn  = VideoDetail.writer._id !== VideoDetail.writer._id && <Subscribe userTo={VideoDetail.writer._id} userFrom={VideoDetail.writer._id}/>

    return (
      <div>
        
        <Row gutter={16,16}>
          <Col lg={18} xs={24}>

            <div style={{width:'100%', padding: '3rem 4rem'}}>
              <video style={{width:"100%"}} 
              src={`http://localhost:5000/${VideoDetail.filePath}`} 
              poster={`http://localhost:5000/${VideoDetail.thumbnail}`}
              controls/>
              <List.Item 
              actions={[subscribeBtn]}>
                <List.Item.Meta
                  avatar={<Avatar src={VideoDetail.writer.image}></Avatar>}
                  title={VideoDetail.title}
                  description={VideoDetail.description}
                  />

              </List.Item>
              {/*comment */}
              <Comment refreshFunction={updateComment} commentLists={Comments} postId={videoId}/>
           </div>
           <div>
            {DeleteBtnShow ? <DeleteBtn videoId= {videoId} userId={localStorage.getItem('userId')}/> : ''}
           </div>
          </Col>

          <Col lg={6} xs={24}>
            <SideVideo/>
          </Col>

        </Row>
  
      </div>
    )
  }
  else{
    return ( <div>loading</div>)
  }
}



export default VideoDetailPage
