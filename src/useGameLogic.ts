import { useState, useEffect } from "react";

interface ReturnValue {
  board: string[];
  status: string;
  winner: string | null;
  handleClick: (index: number) => void;
  OnStartGame: (players: string[]) => void;
  reOnStartGame: () => void;
}
const useGameLogic = (): ReturnValue => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [status, setStatus] = useState("created");
  const [players, setPlayers] = useState(["", ""]);

  useEffect(() => {
    if (status !== "playing") return;
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let winningPositionsIndex = 0;
    let winner: string | null = null;


    while (winningPositionsIndex < winningPositions.length && !winner) {
      const boardPositionsToCheck = winningPositions[winningPositionsIndex];
      const boardValuesToCkeck = boardPositionsToCheck.map(
        (index) => board[index]
      );
      const checkingValue = boardValuesToCkeck[0];
      const isFinished = boardValuesToCkeck.every(
        (value) => value === checkingValue && checkingValue
      );
      winner = !isFinished ? null : checkingValue;
      winningPositionsIndex++;
    }
    
    if (winner) {
      setWinner(winner === "X" ? players[0] : players[1]);
      setStatus("finished");
      return;
    }
    setStatus(board.filter((value) => !value).length ? "playing" : "finished");
  }, [board, players, status]);

  const handleClick = (index: number): void => {
    if (index < 0 || index > 9 || winner) return;
    const newBoard = [...board];
    newBoard.splice(index, 1, turn);
    setBoard(newBoard);
    const newTurn = turn === "X" ? "O" : "X";
    setTurn(newTurn);
  };
  const OnStartGame = (players: string[]) => {
    setPlayers(players);
    setTurn("X");
    setStatus("playing");
  };
  const reOnStartGame = () => {
    setBoard(Array(9).fill(""));
    setWinner("");
    setStatus("created");
  };

  return { board, status, winner, handleClick, reOnStartGame, OnStartGame };
};

export default useGameLogic