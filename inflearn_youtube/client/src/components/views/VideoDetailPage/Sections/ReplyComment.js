import React , {useEffect, useState} from 'react'
import SingleComment from './SingleComment'


function ReplyComment(props) {


  const [ChildCommentNumber, setChildCommentNumber] = useState(0)
  const [OpenReplyComments, setOpenReplyComments] = useState("false")

  useEffect(() => {

    let commentNumber = 0;
    const Commentlist =  props.CommentLists.length > 0 ? props.CommentLists : [];
    Commentlist.map((comment, index) => {

        if (comment.responseTo === props.parentCommentId) {
            commentNumber++
        }
    })
    setChildCommentNumber(commentNumber)
}, [props.CommentLists, props.parentCommentId])



  let renderReplyComment = (parentCommentId) => {


    props.CommentLists.map((comment, index) => (
      <React.Fragment>
        { comment.responseTo == parentCommentId && 
        <div style={{width:'80%', marginLeft:'40px'}}>
          <SingleComment refreshFunction={props.refreshFunction} comment={comment} key={index} postId={props.postId}/>
          <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} CommentLists={props.CommentLists} postId={props.postId}/>
        </div>
        }
      </React.Fragment> 
    ))
  }

  const HandleChange = () =>{
    console.log(OpenReplyComments)
    if(OpenReplyComments == "true"){
      setOpenReplyComments("false");
    }else{
      setOpenReplyComments("true");
    }
  }
  
  return (
    <div>
      
      { ChildCommentNumber > 0 &&
        <p style={{fontSize:'14px',margin:0, color: 'gray', cursor:'pointer'}} onClick={HandleChange}>
        View {ChildCommentNumber} more comment(s)
        </p>
      }
      {OpenReplyComments &&
          renderReplyComment(props.parentCommentId)
      }
    </div>
  )
}

export default ReplyComment
