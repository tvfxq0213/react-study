import React, {useEffect, useState} from 'react'
import Axios from 'axios';
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'

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
          <SingleComment refreshFunction={props.refreshFunction} comment={comment} key={index} postId={props.videoId}/>
        )
      ))}

      {/*Root comment Form */}

      <form style={{display:'flex'}} onSubmit={onSubmit}>
        <textarea
          style={{width:'100%', borderRadius:'5px'}}
          onChange={handleClick}
          value={CommentValue}
          placeholder="코멘트를 작성해 주세요"
          />
          <br/>
          <button style={{width:'20%', height:'52px'}} onClick={onSubmit}>Submit</button>
      </form>



    </div>
  )
}

export default Comment
