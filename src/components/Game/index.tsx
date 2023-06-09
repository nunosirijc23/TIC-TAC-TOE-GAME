import { FC, useState } from "react";
import { Board } from "../Board";

import { calculateWinner } from "../../utils/calculateWinner"

interface StateType {
  history: any[]
  stepNumber: number
  xIsNext: boolean
}

export const Game: FC = () => {
  const [state, setState] = useState<StateType>({
    history: [{
        squares: Array(9).fill(null),
    }],
    stepNumber: 0,
    xIsNext: true,
  })

  const handleClick = (i: number) => {
      const history = state.history.slice(0, state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
          return;
      }
      squares[i] = state.xIsNext ? 'X' : 'O';
      setState({
          history: history.concat([{
              squares: squares,
          }]),
          stepNumber: history.length,
          xIsNext: !state.xIsNext,
      })
  }

  const jumpTo = (step: number) => {
    const stateTmp = {...state}
    setState({
        history: stateTmp.history,
        stepNumber: step,
        xIsNext: (step % 2) === 0,
    })
  }

  const history = state.history;
  const current = history[state.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
      const desc = move ? 
          'Go to move #' + move :
          'Go to game start';
      return (
          <li key={move}>
              <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
      )
  })

  let status;
  if (winner) {
      status = 'Winner: ' + winner;
  } else {
      status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
  }

  return (
      <div className="game">
          <div className="game-board">
              <Board 
                  squares={current.squares}
                  onClick={(i: number) => handleClick(i)}
              />
          </div>
          <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
          </div>
      </div>
  );
}