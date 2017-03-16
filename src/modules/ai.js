
const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

export function checkForWinner (boardState) {
  return mapWinCombos(boardState).reduce((acc, str) => {
    if (str === 'XXX') return 'X Wins!'
    else if (str === 'OOO') return 'O Wins!'
    else return acc
  }, 'no winner')
}

export function computerPlay (boardState, compChar, humChar) {
  const compCanWin = canWin(boardState, compChar)
  const humanCanWin = canWin(boardState, humChar)
  if (compCanWin.canWin === true) return getWinSquare(winCombos[compCanWin.combo], boardState)
  else if (humanCanWin.canWin === true) return getWinSquare(winCombos[humanCanWin.combo], boardState)
  else if (boardState.join('').length === 1) return getSecondMove(boardState)
  else if (boardState[4] === '') return 4
  else if (cornerAvailable(boardState) !== false) {
    return cornerAvailable(boardState)
  } else return nextAvailable(boardState)
}

/*
function minimax (board, level, player, compChar, humChar) {
  if (gameover || level === 0) return getScore(board, compChar, humChar)
  let children = getLegalMoves(board)
  if (player === 'computer') {
    let bestScore = Number.NEGATIVE_INFINITY
    for (let i = 0; i < children.length; i++) {
      let score = minimax(level - 1, 'opponent')
      if (score > bestScore) bestScore = score
    }
    return bestScore
  } else {
    let bestScore = Number.POSITIVE_INFINITY
    for (let i = 0; i < children.length; i++) {
      let score = minimax(level - 1, 'computer')
      if (score < bestScore) bestScore = score
    }
    return bestScore
  }
}
*/

console.log(getScore(['X', 'X', 'O', '', '', 'O', '', '', 'O'], 'X', 'O'))
console.log(getLegalMoves(['X', 'O', '', '', 'X', 'O', '', '', '']))

function getScore (board, compChar, humChar) {
  let score = 0
  winCombos.map(winRow => {
    let row = winRow.map(y => {
      return board[y]
    }).join('')
    switch (row) {
      case compChar.repeat(3):
        score += 100
        break
      case humChar.repeat(3):
        score -= 100
        break
      case compChar.repeat(2):
        score += 10
        break
      case humChar.repeat(2):
        score -= 10
        break
      case compChar:
        score += 1
        break
      case humChar:
        score -= 1
        break
    }
  })
  return score
}

function getLegalMoves (board) {
  let arr = []
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') arr.push(i)
  }
  return arr
}

function getSecondMove (boardState) {
  if (boardState[4] !== '') return 0
  else {
    const corners = [[0, 8], [2, 6]]
    return corners.reduce((acc, val) => {
      console.log(boardState[val[1]])
      if (boardState[val[0]] !== '') return val[1]
      else if (boardState[val[1]] !== '') return val[0]
      else return acc
    }, 0)
  }
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
