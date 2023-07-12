import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startText: this.props.startText,
      hideShow: 'Show',
    };
  }

  changeStartText() {
    const startText = this.state.startText;
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

  showHideNavbar(){
    const hideShow = this.state.hideShow;
    if(hideShow === 'Show'){
      this.setState({hideShow: 'Hide'});
    }else if (hideShow === 'Hide'){
      this.setState({hideShow: 'Show'});
    }
  }

  render() {
    const { startText, hideShow } = this.state;

    return (
      <div>
        <div className={`navbar-${hideShow}`}>
          <div className={`left-${hideShow}`}>
            <button className="button" onClick={() => this.changeStartText()}>
              {startText}
            </button>
          </div>
          <div className="middle">
          </div>
          <div className={`right-${hideShow}`}>
            <button className="button" onClick={() => this.restartGrid()}>
              Restart
            </button>
          </div>
        </div>
        {(hideShow === 'Hide' || hideShow === 'Show') && (
            <div className="showhide-container">
              <div className={hideShow} onClick={() => this.showHideNavbar()}>
                <div className={`${hideShow}-arrow`}>
                </div>
              </div>
            </div>
            )}
      </div>
    );
  }
}

export default Navbar;
