<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <table id="board">
      <tr>
        <td id="0" v-bind:class="{ inactive: isInactive[0] }" v-on:click="playerPlayed(0)">{{ tableState[0] }}</td>
        <td id="1" v-bind:class="{ inactive: isInactive[1] }" v-on:click="playerPlayed(1)">{{ tableState[1] }}</td>
        <td id="2" v-bind:class="{ inactive: isInactive[2] }" v-on:click="playerPlayed(2)">{{ tableState[2] }}</td>
      </tr>
      <tr>
        <td id="3" v-bind:class="{ inactive: isInactive[3] }" v-on:click="playerPlayed(3)">{{ tableState[3] }}</td>
        <td id="4" v-bind:class="{ inactive: isInactive[4] }" v-on:click="playerPlayed(4)">{{ tableState[4] }}</td>
        <td id="5" v-bind:class="{ inactive: isInactive[5] }" v-on:click="playerPlayed(5)">{{ tableState[5] }}</td>
      </tr>
      <tr>
        <td id="6" v-bind:class="{ inactive: isInactive[6] }" v-on:click="playerPlayed(6)">{{ tableState[6] }}</td>
        <td id="7" v-bind:class="{ inactive: isInactive[7] }" v-on:click="playerPlayed(7)">{{ tableState[7] }}</td>
        <td id="8" v-bind:class="{ inactive: isInactive[8] }" v-on:click="playerPlayed(8)">{{ tableState[8] }}</td>
      </tr>
    </table>
    <div id="playerDiv">
      <h2>Select X or O</h2>
      <div id="radio">
        <input type="radio" name="XO" value="X" v-model="playerPiece"><label>X</label>
        <input type="radio" name="XO" value="O" v-model="playerPiece"><label>O</label>
      </div>
    </div>
    <h4><a href="https://github.com/CliffSmith25/tictactoe">View the source code here</a></h4>
  </div>
</template>

<script>
import { checkForWinner, computerPlay } from './modules/ai.js'

const initState = ['', '', '', '', '', '', '', '', '']
const initInactive = [false, false, false, false, false, false, false, false, false]

export default {
  name: 'app',
  data () {
    return {
      tableState: initState.slice(),
      isInactive: initInactive.slice(),
      compTurn: false,
      playerPiece: 'X',
      msg: this.initGame()
    }
  },
  watch: {
    playerPiece: function () {
      this.initGame()
    }
  },
  computed: {
    compPiece: function () {
      if (this.playerPiece === 'X') return 'O'
      else return 'X'
    },
    turn: function () {
      if (this.compTurn) return this.compPiece
      else return this.playerPiece
    }
  },
  methods: {
    toggleTurn: function () {
      this.compTurn = !this.compTurn
      this.msg = (this.compTurn) ? 'Computer Playing' : 'Your Turn'
    },
    playerPlayed: function (x) {
      let tempTable = this.tableState.slice()
      tempTable[x] = this.turn
      this.tableState = tempTable
      let tempInactive = this.isInactive.slice()
      tempInactive[x] = true
      this.isInactive = tempInactive
      if (checkForWinner(this.tableState) !== 'no winner') {
        this.msg = 'You win!'
        setTimeout(this.initGame, 2000)
      } else if (this.tableState.join('').length === 9) {
        this.msg = 'Game over - Tie!'
        setTimeout(this.initGame, 2000)
      } else {
        this.toggleTurn()
        this.playComputerTurn()
      }
    },
    playComputerTurn: function () {
      const i = computerPlay(this.tableState, this.compPiece, this.playerPiece)
      this.tableState[i] = this.compPiece
      let tempInactive = this.isInactive.slice()
      tempInactive[i] = true
      this.isInactive = tempInactive
      if (checkForWinner(this.tableState) !== 'no winner') {
        this.msg = 'Computer Wins!'
        setTimeout(this.initGame, 2000)
      } else if (this.tableState.join('').length === 9) {
        this.msg = 'Game over - Tie!'
        setTimeout(this.initGame, 2000)
      } else {
        this.toggleTurn()
      }
    },
    getFirstPlayer: function () {
      return (Math.random() >= 0.5)
    },
    initGame: function () {
      this.tableState = initState.slice()
      this.isInactive = initInactive.slice()
      this.compTurn = this.getFirstPlayer()
      this.msg = (this.compTurn) ? 'Computer Playing' : 'Your Turn'
      if (this.compTurn) this.playComputerTurn()
      return this.msg
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#radio {
  display: inline-flex;
  align-items: center;
}

input {
  margin-left: 2em;
}

label {
  font-size: 2em;
}

td {
  width: 33%;
  height: 33%;
  cursor: pointer;
}

td + td {
  border-left: 4px solid;
  border-color: #ccdfcb;
}

tr + tr {
  border-top: 4px solid;
  border-color: #ccdfcb;
}

.inactive {
  pointer-events: none;
}

table {
  background-color: #414141;
  width: 90%;
  margin-left: 5%;
  height: 800px;
  border-collapse: collapse;
  color: #ccdfcb;
  font-size: 10em;
}

</style>
