
export function checkForWinner (boardState) {
  const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

  return winCombos.map(arr => {
    return arr.reduce((acc, num) => {
      return boardState[num] + acc
    }, '')
  }).reduce((acc, str) => {
    if (str === 'XXX') return 'X Wins!'
    else if (str === 'OOO') return 'O Wins!'
    else return acc
  }, 'no winner')
}
