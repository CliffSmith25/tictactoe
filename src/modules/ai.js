
const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

export function checkForWinner (boardState) {
  return mapWinCombos(boardState).reduce((acc, str) => {
    if (str === 'XXX') return 'X Wins!'
    else if (str === 'OOO') return 'O Wins!'
    else return acc
  }, 'no winner')
}

export function computerPlay (boardState, compChar, humChar) {
  if (boardState.join('').length === 0) return 6
  else if (boardState.join('').length === 1) return getSecondMove(boardState)
  else {
    const move = minimax(boardState, 6, 'computer', compChar, humChar)
    return move.square
  }
}

function minimax (board, level, player, compChar, humChar) {
  if (gameOver(board) || level === 0) return {score: getScore(board, compChar, humChar)}
  let children = getLegalMoves(board)
  if (player === 'computer') {
    let bestScore = {score: Number.NEGATIVE_INFINITY}
    for (let i = 0; i < children.length; i++) {
      let newBoard = board.slice()
      newBoard[children[i]] = compChar
      let score = minimax(newBoard, level - 1, 'opponent', compChar, humChar)
      if (score.score > bestScore.score) {
        bestScore.score = score.score
        bestScore.square = children[i]
      }
    }
    console.log(bestScore.score + '  ' + 'computer' + '   ' + level)
    return bestScore
  } else {
    let bestScore = {score: Number.POSITIVE_INFINITY}
    for (let i = 0; i < children.length; i++) {
      let newBoard = board.slice()
      newBoard[children[i]] = humChar
      let score = minimax(newBoard, level - 1, 'computer', compChar, humChar)
      if (score.score < bestScore.score) {
        bestScore.score = score.score
        bestScore.square = children[i]
      }
    }
    console.log(bestScore.score + '  ' + 'human' + '   ' + level)
    return bestScore
  }
}

function gameOver (board) {
  let winPossibilities = mapWinCombos(board)
  for (let i = 0; i < winPossibilities.length; i++) {
    if (winPossibilities[i] === 'XXX' || winPossibilities[i] === 'OOO') return true
  }
  if (board.join('').length === 9) return true
  return false
}

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
    return 4
  }
}

function mapWinCombos (boardState) {
  return winCombos.map(arr => {
    return arr.reduce((acc, num) => {
      return boardState[num] + acc
    }, '')
  })
}
