import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action';

function RegisterPage(props) {

  const dispatch = useDispatch();
  
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("")
  const [ConfirmPassword, setComfirmPassword] = useState("")

  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  const onNameHandler = (event) =>{
    setName(event.currentTarget.value)
  }
  const onConfirmPasswordHandler = (event) => {
    setComfirmPassword(event.currentTarget.value)
  }
  const onSubmitHandler = (event) =>{
    event.preventDefault(); // 기존 이벤트 방지

    console.log('Email:',Email );
    console.log('Password:',Password );

    if(Password !== ConfirmPassword){
      return alert(' 비밀번호와 비밀번호 확인은 같아야 합니다');
    }
    let body = {
      email:Email,
      password:Password,
      name:Name,
    }

    dispatch(registerUser(body))
    .then(response =>{
      if(response.payload.success){
        props.history.push('/login')
      }else{
        alert('Failed to dign up');
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
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>
        <label>Comfirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
        <br/>
        <button>
          Register
        </button>
      </form>
    </div>
  )
  
}

export default RegisterPage;