import React , { useEffect, useState } from 'react'
import { List, Avatar, Row, Col } from 'antd';
import Axios from 'axios';

function VideoDetailPage(props) {

  const videoId = props.match.params.videoId
  const variable = {
    videoId
  }


  const [VideoDetail, setVideoDetail] = useState([]);

  useEffect(()=>{
    Axios.post('/api/video/getVideoDetail', variable)
    .then(response => {
        if (response.data.success) {
            console.log(response.data.video)
            setVideoDetail(response.data.video)
        } else {
            alert('Failed to get video Info')
        }
    })
  }, [props.match.params.videoId]) //  props.match.params.videoId가 바뀔때만 재구독한다. 

  if (VideoDetail.writer) {

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
              actions>
                <List.Item.Meta
                  avatar={<Avatar src={VideoDetail.writer.image}></Avatar>}
                  title={VideoDetail.title}
                  description={VideoDetail.description}
                  />

              </List.Item>
              {/*comment */}
           </div>

          </Col>

          <Col lg={6} xs={24}>

            Side Nav
          </Col>

        </Row>
  
      </div>
    )
  }else{
    return ( <div>loading</div>)
  }
}



export default VideoDetailPage
