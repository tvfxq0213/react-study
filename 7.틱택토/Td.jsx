import React, { useCallback, useEffect, useRef, memo } from 'react';
import { CLICK_CELL } from './TicTacToe'; //모듈화 시켜 놓음

const Td = memo(({ rowIndex, cellIndex, dispatch, cellData }) => {
  console.log('td rendered');

  const ref = useRef([]);
  useEffect(() => {
    console.log(rowIndex === ref.current[0], cellIndex === ref.current[1], dispatch === ref.current[2], cellData === ref.current[3]);
    console.log(cellData, ref.current[3]);
    ref.current = [rowIndex, cellIndex, dispatch, cellData];
  }, [rowIndex, cellIndex, dispatch, cellData]);

  const onClickTd = useCallback(() => { // 내가 몇번째 칸을 클릭했는지 알아야 하니깐
    console.log(rowIndex, cellIndex);
    if (cellData) {
      return;
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex }); //reducer에서 잘 처리만 해주면 됨
  }, [cellData]);

  return (
    <td onClick={onClickTd}>{cellData}</td>
  )
});

export default Td;