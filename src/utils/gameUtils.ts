export const calculateScore = (
  isCorrect: boolean,
  currentRound: number,
  isGuessingPlayer: boolean
): number => {
  if (isCorrect && isGuessingPlayer) {
    return currentRound * 100; // Correct guess
  } else if (!isCorrect && !isGuessingPlayer) {
    return currentRound * 50; // Failed guess rewards sequence creator
  }
  return 0;
};

export const determineNextTurn = (currentRound: number, currentTurn: number): number => {
  // In odd rounds, player 1 creates (turn 0), player 2 guesses (turn 1)
  // In even rounds, player 2 creates (turn 1), player 1 guesses (turn 0)
  const isOddRound = currentRound % 2 === 1;
  if (currentTurn === 0) {
    return isOddRound ? 1 : 0;
  }
  return isOddRound ? 0 : 1;
};

export const getRequiredSequenceLength = (round: number): number => {
  return round + 2;
};