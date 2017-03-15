
const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

export function checkForWinner (boardState) {
  return mapWinCombos(boardState).reduce((acc, str) => {
    if (str === 'XXX') return 'X Wins!'
    else if (str === 'OOO') return 'O Wins!'
    else return acc
  }, 'no winner')
}

export function computerPlay (boardState, char) {
  const compCanWin = canWin(boardState, char)
  const humanCanWin = canWin(boardState, 'O')
  if (compCanWin.canWin === true) return getWinSquare(winCombos[compCanWin.combo], boardState)
  else if (humanCanWin.canWin === true) return getWinSquare(winCombos[humanCanWin.combo], boardState)
  else if (boardState[4] === '') return 4
  else if (cornerAvailable(boardState) !== false) {
    return cornerAvailable(boardState)
  } else return nextAvailable(boardState)
}

function nextAvailable (boardState) {
  for (let i = 0; i < boardState.length; i++) {
    if (boardState[i] === '') return i
  }
}

function cornerAvailable (boardState) {
  const corners = [0, 2, 6, 8]
  return corners.reduce((acc, val) => {
    return (boardState[val] === '') ? val : acc
  }, false)
}

function getWinSquare (winRow, boardState) {
  for (let i = 0; i < 3; i++) {
    if (boardState[winRow[i]] === '') {
      return winRow[i]
    }
  }
}

function mapWinCombos (boardState, char) {
  return winCombos.map(arr => {
    return arr.reduce((acc, num) => {
      return boardState[num] + acc
    }, '')
  })
}

function canWin (boardState, char) {
  const canWinSpots = mapWinCombos(boardState)
  for (let i = 0; i < canWinSpots.length; i++) {
    if (canWinSpots[i] === char + char) return { canWin: true, combo: i }
  }
  return { canWin: false }
}
