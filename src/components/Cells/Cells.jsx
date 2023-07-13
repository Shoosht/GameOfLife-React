import React, { Component } from 'react';
import "./Cells.css";

const COLUMNS = 152;
const ROWS = 100;

class Cells extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cellData: [],
    };
    this.cellDataTemp = [];
  }

  Cell = class {
    constructor(life, x, y, newFutureLife){
      this.life = life;
      this.futureStatus = newFutureLife;
      this.x = x;
      this.y = y;
    }
  };

  componentDidMount() {
    this.emptyGridSetup();
  }

  componentDidUpdate(prevProps) {
    if(this.props.restart !== prevProps.restart){
      this.restartGrid();
    }
    const startText = this.props.startText;
    if (startText === 'Start' && prevProps.startText === 'Stop') {
      clearInterval(this.interval);
    }

    if (startText === 'Stop' && prevProps.startText === 'Start') {
      this.interval = setInterval(this.gameLogic, 300);
    }
  }

  emptyGridSetup(){
    let initialArray = [];
    
    for (let i = 0; i < ROWS; i++) {
      const tempArray = [];
      for (let j = 0; j < COLUMNS; j++) {
        let tempCell = new this.Cell("dead", i, j, "dead");
        tempArray.push(tempCell);
      }
      initialArray.push(tempArray);
    }
    this.cellDataTemp = initialArray;
    this.setState({ cellData: initialArray });
  }

  changeCellLife(x, y) {
    this.setState(prevState => {
      const updatedData = prevState.cellData.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
          if (rowIndex === x && columnIndex === y) {
            let newLife = cell.life === 'dead' ? 'alive' : 'dead';
            let newFutureLife = newLife;
            return new this.Cell(newLife, x, y, newFutureLife);
          }
          return cell;
        })
      );
      this.cellDataTemp = updatedData;
      return { cellData: updatedData };
    });
  }

  changeCellFutureStatus = (x, y) => {
    const updatedData = this.state.cellData.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
          if (rowIndex === x && columnIndex === y) {
            if(cell.futureStatus === "dead"){
              cell.futureStatus = "alive"
            }else if(cell.futureStatus === "alive"){
              cell.futureStatus = "dead"
            }
            let newFutureLife = cell.futureStatus;
            return new this.Cell(cell.life, x, y, newFutureLife);
          }
          return cell;
        })
      );
    this.cellDataTemp = updatedData;
  };
  
  checkAroundAlive(i, j){
    var aliveCellCounter = 0;

    for(let c = i - 1; c <= i + 1; c++){
      if(c<0 || c>=ROWS){
        continue;
      }
      for(let k = j - 1; k <= j + 1; k++){
        if(k<0 || k>=COLUMNS){
          continue;
        }
        if(c===i && k===j){
          continue;
        }
        if( this.state.cellData[c][k].life==="alive"){
          aliveCellCounter+=1;
        }
      }
    }
    return aliveCellCounter;
  }
  
  gameLogic = () =>{
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        var aliveCellCounter = 0;
        if (this.state.cellData[i][j].life === "dead") {
          aliveCellCounter = this.checkAroundAlive(i,j);
          if(aliveCellCounter === 3){
            this.changeCellFutureStatus(i, j);
          }
        }else if (this.state.cellData[i][j].life === "alive"){
          aliveCellCounter = this.checkAroundAlive(i,j);
          if(aliveCellCounter === 0 || aliveCellCounter === 1){
            this.changeCellFutureStatus(i, j);
          }
          else if(aliveCellCounter >= 4 && aliveCellCounter <= 8){
            this.changeCellFutureStatus(i, j);
          }
          else if(aliveCellCounter === 3){
            this.aliveFuture(i, j);
          }
        }
      }
    }
    this.futureStatusToLife();
    this.updateCells();
  };

  aliveFuture(x, y){
    const updatedData = this.state.cellData.map((row, rowIndex) =>
        row.map((cell, columnIndex) => {
          if (rowIndex === x && columnIndex === y) {
            let newFutureLife = "alive";
            return new this.Cell(cell.life, x, y, newFutureLife);
          }
          return cell;
        })
      );
    this.cellDataTemp = updatedData;
  }

  futureStatusToLife(){
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLUMNS; j++) {
        if(this.cellDataTemp[i][j].futureStatus !== this.cellDataTemp[i][j].life){
          this.cellDataTemp[i][j].life = this.cellDataTemp[i][j].futureStatus;
        }
      }
    }
  }

  updateCells(){
    this.setState({cellData: this.cellDataTemp});
  }

  restartGrid(){
    this.cellDataTemp = [];
    this.emptyGridSetup();
  }
  
  render() {

    const styles = {
      display: 'grid',
      gridTemplateColumns: `repeat(${COLUMNS}, 50px)`,
      gridTemplateRows: `repeat(${ROWS}, 50px)`,

    };

    return (
      <div>
          <div style={styles}>
            {this.state.cellData.map((row, rowIndex) =>
              row.map((cell, columnIndex) => (
                <div
                  className={cell.life}
                  key={`${rowIndex}-${columnIndex}`}
                  onClick={() => this.changeCellLife(rowIndex, columnIndex)}
                  life={cell.life}
                ></div>
              ))
            )}
          </div>
      </div>
    );
  }
}

export default Cells;