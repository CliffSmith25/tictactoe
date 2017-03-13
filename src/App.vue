<template>
  <div id="app">
    <table id="board">
      <tr>
        <td id="0" v-bind:class="{ active: isActive[0] }" v-on:click="played(0)">{{ tableState[0] }}</td>
        <td id="1" v-bind:class="{ active: isActive[1] }" v-on:click="played(1)">{{ tableState[1] }}</td>
        <td id="2" v-bind:class="{ active: isActive[2] }" v-on:click="played(2)">{{ tableState[2] }}</td>
      </tr>
      <tr>
        <td id="3" v-bind:class="{ active: isActive[3] }" v-on:click="played(3)">{{ tableState[3] }}</td>
        <td id="4" v-bind:class="{ active: isActive[4] }" v-on:click="played(4)">{{ tableState[4] }}</td>
        <td id="5" v-bind:class="{ active: isActive[5] }" v-on:click="played(5)">{{ tableState[5] }}</td>
      </tr>
      <tr>
        <td id="6" v-bind:class="{ active: isActive[6] }" v-on:click="played(6)">{{ tableState[6] }}</td>
        <td id="7" v-bind:class="{ active: isActive[7] }" v-on:click="played(7)">{{ tableState[7] }}</td>
        <td id="8" v-bind:class="{ active: isActive[8] }" v-on:click="played(8)">{{ tableState[8] }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

import { checkForWinner } from './modules/ai.js'

const initState = ['', '', '', '', '', '', '', '', '']
const initActive = [true, true, true, true, true, true, true, true, true]

export default {
  name: 'app',
  data () {
    return {
      tableState: initState.slice(),
      turn: 'O',
      isActive: initActive.slice(),
      compTurn: false
    }
  },
  methods: {
    toggleTurn: function () {
      if (this.turn === 'O') this.turn = 'X'
      else this.turn = 'O'
    },
    played: function (x) {
      let tempTable = this.tableState.slice()
      tempTable[x] = this.turn
      this.tableState = tempTable
      let tempActive = this.isActive.slice()
      tempActive[x] = false
      this.isActive = tempActive
      this.checkWin()
      this.toggleTurn()
    },
    checkWin: function () {
      const didWin = checkForWinner(this.tableState)
      console.log(didWin)
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

td {
  width: 33%;
  height: 33%;
  pointer-events: none;
}

td + td {
  border-left: 4px solid;
  border-color: #ccdfcb;
}

tr + tr {
  border-top: 4px solid;
  border-color: #ccdfcb;
}

.active {
  pointer-events: auto;
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
