import React, {useEffect, useState} from 'react'
import { Button, Input } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
const { TextArea } = Input;


function Comment(props) {
  const user = useSelector(state => state.user)
  const [CommentValue, setCommentValue] = useState("")
  
  const handleClick= (event) =>{

    setCommentValue(event.currentTarget.value)

  }

  const onSubmit = (event) =>{
    event.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id, 
      postId: props.postId

    }

    Axios.post(`/api/comment/saveComment`, variables)
    .then(response => {
      if(response.data.success){

        props.refreshFunction(response.data.result)
        console.log(response.data.result);
        setCommentValue("")


      }else{
        alert("코멘트를 저장하지 못했습니다.")
      }
    })
  }
  return (
    <div>
      <br/>
      <p>Replies</p>
      <hr/>

      {/* comment Lists*/}

      {props.commentLists && props.commentLists.map((comment,index)=>(
        (!comment.responseTo && 
          <React.Fragment key={comment._id}>
            <SingleComment refreshFunction={props.refreshFunction} comment={comment} key={index} postId={props.postId}/>
            <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} CommentLists={comment} postId={props.postId}/>

          </React.Fragment>
        )
      ))}

      {/*Root comment Form */}

      <form style={{display:'flex'}} onSubmit={onSubmit}>
        <TextArea
          style={{width:'100%', borderRadius:'5px'}}
          onChange={handleClick}
          value={CommentValue}
          placeholder="코멘트를 작성해 주세요"
          />
          <br/>
          <Button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</Button>
      </form>



    </div>
  )
}

export default Comment
