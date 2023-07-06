import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startText: this.props.startText,
    };
  }

  changeStartText() {
    const { startText } = this.state;
    if (startText === 'Start') {
      this.setState({ startText: 'Stop' });
      this.props.setStartText('Stop');
    } else if (startText === 'Stop') {
      this.setState({ startText: 'Start' });
      this.props.setStartText('Start');
    }
  }

  restartStartTextHandler(){
    if(this.props.startText === 'Stop'){
      this.setState({startText: 'Start'});
      this.props.setStartText('Start');
    }
  }

  restartGrid() {
    this.restartStartTextHandler();
    this.props.setRestart(!this.props.restart)
  }

  render() {
    const { startText } = this.state;

    return (
      <div>
        <div className="navbar">
          <div className="left">
            <button onClick={() => this.changeStartText()} className="button">
              {startText}
            </button>
          </div>
          <div className="middle">
          </div>
          <div className="right">
            <button onClick={() => this.restartGrid()} className="button">
              Restart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
