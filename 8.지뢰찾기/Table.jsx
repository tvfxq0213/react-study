import React, { useContext, memo } from 'react';
import Tr from './Tr';
import { TableContext } from './MineSearch';

const Table = memo(() => { // memo적용하려면 하위컴포넌트에서 memo import 되어 있어야 함 
  const { tableData } = useContext(TableContext); //useContext를 쓰면 실제로 리렌더링이 되지 않더라도 깜빡거리는 현상이 발생해서 상위컴포넌트에서 return 할때 useMemo()를 써서 해결함
  return (
    <table>
      {Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i} />)}
    </table>
  )
});
export default Table;