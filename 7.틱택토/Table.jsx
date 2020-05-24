import React, { useMemo } from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
  return (
    <table>
      {Array(tableData.length).fill().map((tr, i) => ( //요소가 3개인 배열이 만들어짐
        useMemo(
          () => <Tr key={i} dispatch={dispatch} rowIndex={i} rowData={tableData[i]} />,
          [tableData[i]],
        )
      ))}
    </table>
  );
};

export default Table;