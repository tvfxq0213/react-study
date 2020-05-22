import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';

function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}

const Lotto = () => {
  //Hook는 순서가 매우 중요함 
  const lottoNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);
  //hookS는 조건문안에 절대 넣으면 안되고 함수나 반복문 안에도 웬만하면 넣지 않는 것이 좋다<div className=""></div>
  //두번째 인자들이 바뀔때 앞의 것들이 다시 실행된다. 
  useEffect(() => {
    //안에서 useState를 사용하면 안됨
    // 여기에서 ajax 호출 
    
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount와 동일
  // 배열에 요소가 있으면 componentDidMount랑 componentDidUpdate 둘 다 수행


  // 만약 componentDidUpate()에서만 실행하게 하고 싶다 라고 하면
  // 패턴이니까 기억해두기
  const mounted = useRef(false);
  useEffect( () => {
    if(!mounted.current){
      mounted.current = true;
    }else{
      //ajax
    }

  },['바뀌는 값']); //componentDidMount에서는 실행 안함 



  useEffect(() => {
    console.log('로또 숫자를 생성합니다.');
  }, [winNumbers]);

  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    console.log(winNumbers); // 새로운 값이 콘솔에 찍힐 거라고 생각했는데, 계속 첫번째 결과 값이 나옴
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]); // winNumber값이 바뀔때까지 값을 유지함 
  // 첫번째 값을 계속 유지 되지 않고 이전의 요소들이 바뀌어야 할 때에는 winNumbers를 넣어줘서 값을 고쳐주게 해야함

  // useCallBack은 함수 자체를 기억해두는 것 (함수 재사용)
  // 필수로 적용해야 할 때가 있는데, 자식컴포넌트의 함수로 넘길때, USECALLBACK이 없으면 매번 새로운 함수가 전달되기 때문에, 
  // 매번생성되면 자식컴포넌트는 매번 부모로 부터 받은 PROPS를 새로 줬다고 생각해서 매번 새로 렌더링을 하게 됨
  // usecallBack을 해줘야 같은 props라고 생각하고 쓸데없는 리렌더링을 하지 않음
  //useMemo 는 값을 기억해두는 것

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
};
export default Lotto;