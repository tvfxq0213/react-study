import React, { useState, useCallback, useContext, memo } from 'react';
import { START_GAME, TableContext } from './MineSearch';

const Form = memo(() => {
  const [row, setRow] = useState(10);
  const [cell, setCell] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext); // MineSearch에서 Provider로 보낸 값을 사용함

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);

  const onChangeCell = useCallback((e) => {
    setCell(e.target.value);
  }, []);

  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch({ type: START_GAME, row, cell, mine }); // 입력한 값을 액션에 전해줌
  }, [row, cell, mine]);

  return (
    <div>
      <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="가로" value={cell} onChange={onChangeCell} />
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <button onClick={onClickBtn}>시작</button>
    </div>
  );
});

export default Form;