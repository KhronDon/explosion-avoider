import React, { Component } from 'react'
// import Cell from './Cell'
import GameBoard from './gameboard'

import scoopImage from '../images/scoop.png'
import winImage from '../images/win.png'
import loseImage from '../images/bummer.png'

class App extends Component {

  constructor () {
    super()
    this.state = {
      board: [],
      state: 'start',
      gameOver: false
    }
  }

  createGame (i) {
    console.log(i)
    window.fetch(`http://minesweeper-api.herokuapp.com/games?difficulty=${i}`, {method: 'POST'}).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        id: data.id,
        board: data.board,
        state: data.state,
        mines: data.mines,
        gameOver: false
      })
    })
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.state === 'playing' && this.state.state === 'lost') {
      setTimeout((e) => { this.setState({gameOver: true}) }, 2500)
    } else if (prevState.state === 'playing' && this.state.state === 'won') {
      setTimeout((e) => { this.setState({gameOver: true}) }, 2500)
    }
  }

  check (x, y) {
    console.log(`Im checking ${x} and ${y}`)
    window.fetch(`http://minesweeper-api.herokuapp.com/games/${this.state.id}/check?row=${y}&col=${x}`, {method: 'POST'}).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        board: data.board,
        state: data.state
      })
    })
  }

  flag (x, y) {
    console.log(`Im flagging ${x} and ${y}`)
    window.fetch(`http://minesweeper-api.herokuapp.com/games/${this.state.id}/flag?row=${y}&col=${x}`, {method: 'POST'}).then((response) => {
      return response.json()
    }).then((data) => {
      this.setState({
        board: data.board
      })
    })
  }

  reset () {
    console.log('resetting')
    this.setState({
      state: 'start'
    })
  }

  render () {
    let view
    if (this.state.state === 'start') {
      console.log('start')
      view = <div className='selectGame'>
        <img src={scoopImage} height='250px' width='250px' />
        <section className='scooper'>
          <button onClick={() => this.createGame(0)}> <img src='http://www.clker.com/cliparts/0/8/4/2/1195432749646093124johnny_automatic_salad_tongs.svg.hi.png' height='90px' width='75px' /> </button>
          <button onClick={() => this.createGame(1)}> <img src='http://vignette2.wikia.nocookie.net/clubpenguin/images/6/67/5177_icon.png/revision/latest?cb=20121004190158' height='85px' width='80px' /> </button>
          <button onClick={() => this.createGame(2)}> <img src='https://cdn4.iconfinder.com/data/icons/REALVISTA_construction/400/bulldozer.png' height='100px' width='85px' /> </button>
        </section>
        <h1>Choose your scooper!</h1>
      </div>
    } else if (this.state.gameOver) {
      view = <div className='ended'>
        <section className='newGame'>
          <h2>{this.state.state === 'won' ? <img src={winImage} height='250px' width='250px' /> : <img src={loseImage} height='250px' width='250px' />}</h2>
          <button className='scoopAgain' onClick={() => this.reset()}>
            <p>Scoop Again? </p>
            <img src='https://cdn.shopify.com/s/files/1/1061/1924/files/Poop_Emoji.png?9898922749706957214' height='100px' width='100px' />
          </button>
        </section>
      </div>
    } else {
      view = <GameBoard board={this.state.board} check={(x, y) => this.check(x, y)} flag={(x, y) => this.flag(x, y)} />
    }

    return <div className='app'>
      <section className='head'>
        <h1>Sooper Dooper Pooper Scooper!</h1>
      </section>

      <div className='Gameboard'>
        {view}
      </div>
      <footer>Potatoes made with love at The Iron Yard.</footer>
    </div>
  }
}

export default App
