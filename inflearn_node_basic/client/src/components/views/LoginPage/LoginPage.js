import React, {useState} from 'react'
import '../../../index.scss';
import {Router, Route, hashHistory} from 'react-router'; 
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';


function LoginPage(props) {

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("")

  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)

  }
  const onSubmitHandler = (event) =>{
    event.preventDefault(); // 기존 이벤트 방지

    console.log('Email:',Email );
    console.log('Password:',Password );

    let body = {
      email:Email,
      password:Password
    }

    dispatch(loginUser(body))
    .then(response =>{
      if(response.payload.loginSuccess){
        props.history.push('/')
      }else{
        alert('Error');
      }
    })
    // 서버에 보낼때에는 axios 를 사용함
  
  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh'
    }}>

      <form onSubmit={onSubmitHandler} style={{display:'flex', flexDirection:'column'}}>
        <div className="inputWrap">
          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler} />
        </div>
        <div className="inputWrap">
          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler}/>
        </div>
        <button className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  )
}

export default withRouter(LoginPage);