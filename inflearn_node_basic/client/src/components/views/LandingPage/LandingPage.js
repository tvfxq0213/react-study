import React, { useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom';


function LandingPage(props) {
  const onClickHandler = () =>{
    axios.get('./api/users/logout')
    .then(response => {
      console.log(response.data);
      if(response.data.success) {
        props.history.push('./login');
      }else {
        alert("로그아웃 하는데 샐패했음")
      }
    })
  }

 
  return (
    <div className="LandingPage">
        <h2>시작 페이지</h2>

        <button onClick={onClickHandler}> LOGOUT </button>
    </div>
  )
}

export default withRouter(LandingPage)