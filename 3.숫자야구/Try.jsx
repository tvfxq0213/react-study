import React, { Component, createRef, memo } from 'react';

const Try = memo(({tryInfo}) => {
 // const [result, setResult] = useState(tryinfo.result);
  const onClick = () => {
    setResult('1');
  }
    return (
      <li >
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    )
  
});
/*
const Try = ({tryInfo}) => {
  return (
    <li >
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  )
}
*/

export default Try;