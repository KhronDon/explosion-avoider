import React, {Component} from 'react'
import Cell from './cell'
class GameBoard extends Component {

  static propTypes = {
    board: React.PropTypes.array,
    check: React.PropTypes.func,
    flag: React.PropTypes.func
  }

  reset () {
    console.logt('click')
    this.createGame()
  }
  render () {
    const rows = this.props.board.map((row, i) => {
      const cols = row.map((col, j) => {
        return <Cell
          value={col.toString()}
          handleCheck={() => { this.props.check(j, i) }}
          handleFlag={() => { this.props.flag(j, i) }}
          key={j} />
      })
      return <tr key={i}>
        {cols}
      </tr>
    })

    return <div className='GameBoard'>
      <table>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  }
}

export default GameBoard
