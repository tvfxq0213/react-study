import React, { useEffect, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1],
};
// 만들었던 state들을 묶어두면 됨
//state가 많아지면 값 관리 하기가 힘들기 때문에 useReducer을 사용함


export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL'; // td에 있는 것
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

//tictactoe에서 td까지 값을 전달해주려면 table, tr 을 거쳐서 값을 전달해야함




//reducer ?
// 함수임 배열의 reduce 함수와 비슷함


//action ?

const reducer = (state, action) => {
  // 안에서 state를 어떻게 바꿀지 적어두면 됨

  //액션을 실행할 때마다 reducer가 실행됨 종류가 많기 때문에 switch로 구분해서 처리함

  switch (action.type) {
    case SET_WINNER:
      // state.winner = action.winner; 이렇게 하면 안됨.
      return {
        ...state, // 객체를 복사 기존 state를 직접바꾸는게 아니라 복사해서 바꿔줌
        winner: action.winner, //바뀔 부분만 새롭게 바꿔줌
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData]; //기존의 table 데이터 얕은 복사를 해줌
      tableData[action.row] = [...tableData[action.row]]; // immer라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O'); 계속 턴이 바뀌니깐 
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);

  //useReducer?

  const onClickTable = useCallback(() => { //컴포넌트에 넣는 함수들은 모두 useCallback()을 사용함
    dispatch({ type: SET_WINNER, winner: 'O' });
    //dispatch안에 들어가는 건 액션이라고 부름
    // 액션을 실행한다 라고 생각하면 됨 액션만 있다고해서 자동으로 state가 변경되는 것은 아니고 실행을 시켜줘야 하는데, 그것이  reducer임
  }, []);

  //dispatch?

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    console.log(win, row, cell, tableData, turn);
    if (win) { // 승리시
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_GAME });
    } else {
      let all = true; // all이 true면 무승부라는 뜻
      tableData.forEach((row) => { // 무승부 검사
        row.forEach((cell) => {
          if (!cell) {
            all = false;
          }
        });
      });
      if (all) {
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);

  //테이블과 결과창 테이블은 TR TD로 컴포넌트를 쪼개놓음 구조가 4단으로 되어있음
  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch} /> 
      {winner && <div>{winner}님의 승리</div>}
    </>
  )
};
export default TicTacToe;