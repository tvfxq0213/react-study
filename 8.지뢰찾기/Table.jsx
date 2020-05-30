import React, { useContext, memo } from 'react';
import Tr from './Tr';
import { TableContext } from './MineSearch';

const Table = memo(() => { // memo적용하려면 하위컴포넌트에서 memo import 되어 있어야 함 
  const { tableData } = useContext(TableContext);
  return (
    <table>
      {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />)}
    </table>
  )
});
export default Table;