import React, { Componenet } from 'react';

class ResponseCheck extends Componnt {

  state ={
    state: 'waiting',
    message : '클릭해서 시작하세요',
    result:[]

  }

  timeout;
  startTime;
  endTime;
  
  onClickScreen = () => {
    const {state, message, result} = this.state;
    if( state === 'waiting'){
      this.setState({
        state: 'ready',
        message : '초록색이 되면 클릭하세요'
      });

      this.timeout = setTimeout( () => {
        this.setState({
          state : 'now',
          message : '지금 클릭'
        })
        this.startTime = new Date();
      }, Math.floor(Math.random()*1000) +2000) //2초 혹은 3초 뒤에 
    }else if(state === 'ready'){ //성급하게 클릭
      clearTimeout(this.timeout);
      this.setState({
        state : 'waiting',
        message:'성급하게 클릭했어요 초록색일 때 클릭하세요',
        result:[],
      })
    }else if(state === 'now'){ // 반응 속도 체크
      this.endTime = new Date();

      this.setState((prevState) => {
        return{
          state : 'waiting',
          message:'클릭해서 시작하세요',
          result:[...prevState.result, this.endTime - this.startTime]
        };
      });
/*
      this.setState({
        state : 'waiting',
        message:'클릭해서 시작하세요',
        result:[...prevState.result, this.endTime - this.startTime],
      })
      */
    }
  }

  
  renderAverage = () => {
    const {result} = this.state;
    return result.length === 0
      ? null
      : <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>
  };

  onReset = () => {
    this.setState({
      result:[]
    });
  };

  render(){
    const {state, message} = this.state
    return (
      <>
       <div
        id="screen"
        className={this.state.state}
        onClick={this.onClickScreen}
        >
          {message}

       </div>
       {/*리액트 안에서 조건문 사용   만약 너무 지저분하다면 밖으로 빼서 함수로 만든다.*/}
       {this.renderAverage()}
      </>
    );
  }
}

export default ResponseCheck;