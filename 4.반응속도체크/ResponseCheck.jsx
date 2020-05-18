import React, { useState, useRef } from 'react';

const ResponseCheck = () => {


  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState ([]);
  
  
  const timeout = useRef(null);
  const startTime = useRef(0);
  const endTime = useRef(0);

  //hooks 로 표현할 때는 ref를 사용함
  //this의 속성들을 ref로 사용함\

  //state와 ref의 차이점은?
  //state는 return부분이 다시 실행됨 
  //useref의 값을 바꿀 때에는 return부분이 다시 실행되지 않음
  //값이 바뀌어도 다시 렌더링을 실행시키지 않았으면 할 때(화면에는 영향을 미치고 싶지 않을때) ref를 사용함
  //setState는 렌더링에 영향을 미치지만, ref를 사용하는 것은 렌더링에 영향을 미치지 않음

  //화면은 바꾸고 싶지 않은데 값은 자주 바뀌는 것들을 ref에 사용


  const onClickScreen = () => {
    if (state === 'waiting') {
      timeout.current = setTimeout(() => { // ref는 current 에 넣어야함
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
      setState('ready');
      setMessage('초록색이 되면 클릭하세요.');
    } else if (state === 'ready') { // 성급하게 클릭
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.');
    } else if (state === 'now') { // 반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요.');
      setResult((prevResult) => { // ref는 항상 current로 접근!!
        return [...prevResult, endTime.current - startTime.current]; //예전 state를 참고하는 것
      });
    }
  };
  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0
      ? null
      : <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
  };
  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      { //return 내부에 for와 if 쓰기
      /*
        ()=> {
          if(result.length === 0 ){
            return null;
          }else{
            return <>
              <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
              <button onClick={onReset}>리셋</button>
            </>
          }
        }*/
      }
      {renderAverage()}
    </>
  );
};
export default ResponseCheck;