import React, { Component, createRef } from 'react';
import Try from './Try';

function getNumbers() { // 숫자 네 개를 겹치지 않고 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result: '',
    value: '',
    answer: getNumbers(), // ex: [1,3,5,7]
    tries: [], // push 쓰면 안 돼요
  };

  onSubmitForm = (e) => {  // 화살표 함수를 안쓰면 this. 를 사용할 수 없음
    const { value, tries, answer } = this.state;
    e.preventDefault();
    if (value === answer.join('')) {
      this.setState((prevState) => {
        return {
          result: '홈런!',
          tries: [...prevState.tries, { try: value, result: '홈런!' }],
          // 그냥 push를 하면 react가 값이 변한걸 알수가 없음
          // 그래서 복제한 배열을 하나 더 만들어주고, 예전 배열과 복제된 배열(값이 변경된 배열)을 비교함 
        }
      });
      alert('게임을 다시 시작합니다!');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      });
      this.inputRef.current.focus();
    } else { // 답 틀렸으면
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) { // 10번 이상 틀렸을 때
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
        });
        alert('게임을 다시 시작합니다!');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        });
        this.inputRef.current.focus();
      } else { //10번 이하로 틀렸을 때
        for (let i = 0; i < 4; i += 1) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
            value: '',
          };
        });
        this.inputRef.current.focus();
      }
    }
  };

  onChangeInput = (e) => {
    console.log(this.state.answer);
    this.setState({
      value: e.target.value,
    });
  };

  inputRef = createRef(); // this.inputRef

  render() { //render 안에 setState 생성하면 안됨
    const { result, value, tries } = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} /> //defaultValue={}
        </form>
        <div>시도: {tries.length}</div>
        <ul> 
          {tries.map((v, i) => { // 리액트 반복문 i는 몇번째
            return ( // 코드가 길어진다면 컴포넌트 별로 잘게 쪼개서 사용한다. 
              <Try key={`${i + 1}차 시도 :`} tryInfo={v} /> //Try 에서의 연결 고리를 만들어 줌
            ); // 중괄호 없애면 return 안써도 됨
          })}

          {
            /*
             반복문 만들때, 2차원 배열로 값을 만들어서 [['사과','맛있다.']['딸기','맛없다']] => {v[0],v[1]}
             객체로 만드면 [{fruit : '사과', taste:'맛있다'},{fruit : '딸기', taste:'맛업다'}] => v.fruit, v.taste
            */
           /*
             가독성 좋게 만들기 위해서 props를 씀 그리고 반복문을 돌릴 때 key(고유한 값) 값을 넣어줘야함
             리액트가 key를 보고 같은 컴포넌트인지 아닌지 판단한다. 
           */
          }
        </ul>
      </>
    );
  }
}
// const React = requite('react');
// exports.hello = 'Hello';
// module.exports = NumberBaseball;
// node에서 import쓰면 에러남 jsx에서는 바벨에서 require로 바꿔줌
export default NumberBaseball; // import NumberBaseball 한번만 쓸수 있음 ;
//module.exports 는 엄밀히 말하자면 다르나, 호환이 되긴 한다. 

// redux , context 등은 부모 이상들의 유산을 물려 받을 때 쓴다. 