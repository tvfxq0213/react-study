const React = require('react');
const { useState, useRef} = React;


const WordRelay = () => {
  const [word, setWord] = useState('제로초');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);
  
  onSubmitForm = (e) =>{
    e.preventDefault();

    if(word[word.lenght -1] === value[0]){
      setResult('딩동댕!');
      setValue('');
      setWord(value);
      inputRef.current.focus();
    
    }else{
      setResult('떙');
      setValue('');
      setWord(value)
      inputRef.current.focus();

    }
  }
  
  onChangeInput = (e) =>{
    setValue(e.currentTarget.value)

  }

  onRefInput = (c) =>{
    this.input = c;
  }
    return (
      <>
        <div>{word}</div>
        <form onSubmit={onSubmitForm}>
          <label htmlFor="wordInput">글자를 입력하세요!</label>
          <input ref={inputRef} className="wordInput" value={value}
          onChange={onChangeInput}   />
          <button>입력</button>      
        </form>
      </>
    )
  
}

module.exports = WordRelay;
