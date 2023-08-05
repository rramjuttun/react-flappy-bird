import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {bg,fg, birdImages, pipeN, pipeS, gameover, _ok_, _start_, splash, ready} from './game/sprite';
import {width, height} from './game/common';
import { observer} from 'mobx-react';
import {rungame, states, web3login, userInfo} from './game/store';

const SpriteWrapper = observer(class SpriteWrapper extends Component {
  render() {
    const gameSprite = this.props.gameSprite;
    const rotate = 'rotate('+ gameSprite.rotation +'rad)'
    const translate = 'translate(' + gameSprite.cx + 'px,' + gameSprite.cy + 'px)'
    const ctrans = (gameSprite.rotation == null) ? translate : translate + ' ' + rotate;
    const onClickHandler = (this.props.onClickHandler) == null ? null : this.props.onClickHandler;
    var style = {
      transform: ctrans,
      position: 'absolute'
    }

    return (
      <div style={style} onClick={onClickHandler}>
        {this.props.children}
      </div>)
  }
})

const Bg = observer(class Bg extends Component {
  render() {
      return <SpriteWrapper gameSprite={this.props.bg}> {bg} </SpriteWrapper>;
  }
})

const Fg = observer(class Fg extends Component {
  render() {
      return <SpriteWrapper gameSprite={this.props.fg}> {fg} </SpriteWrapper>;
  }
})

export const Bird = observer(class Bird extends Component {
  constructor(props) {
    super(props);
    this.bird0 = null;
    this.bird1 = null;
    this.bird2 = null;
  }

  componentDidMount() {
    const { publicKey } = userInfo;
    let birds;
    if(publicKey) {
      birds = birdImages("https://hardbin.com/ipfs/bafkreiclqv6folmmrgyiasyd7wfftyvhmcqjxzzbyncmdtgvs7h5xrg6h4") //hardcode for now
    } 
    this.bird0 = birds.bird0
    this.bird1 = birds.bird1
    this.bird2 = birds.bird2
  }

  render() {
         let wbird;
         switch(this.props.bird.frame) {
           case 1:
           case 3:
             wbird = this.bird1
             break
           case 2:
             wbird = this.bird2
             break
           case 0:
           default:
             wbird = this.bird0
             break
         }

         return <SpriteWrapper gameSprite={this.props.bird}> {wbird} </SpriteWrapper>;
     }
})

const Pipe = observer(class Pipe extends Component {
  render() {
    let wpipe;
    switch(this.props.pipe.type) {
      default:
      case "N":
        wpipe = pipeN
        break
      case "S":
        wpipe = pipeS
        break
    }

    return <SpriteWrapper gameSprite={this.props.pipe}> {wpipe} </SpriteWrapper>;
  }
})

const Gameover = observer(
  class Gameover extends Component {

  render() {
      return <SpriteWrapper gameSprite={{cx: width/2 - 94, cy: height-400}}> {gameover} </SpriteWrapper>;
  }
})

export const OK = observer(
  class OK extends Component {

  render() {
      return <SpriteWrapper gameSprite={{cx: width/2 - 40, cy: height-340}} onClickHandler={rungame} > {_ok_} </SpriteWrapper>;
  }
})

export const Start = observer(
  class Start extends Component {

  render() {
      return <SpriteWrapper gameSprite={{cx: width/2 - 40, cy: height-340}} onClickHandler={web3login} > {_start_} </SpriteWrapper>;
  }
})

export const Splash = observer(
  class Splash extends Component {

  render() {
      return <SpriteWrapper gameSprite={{cx: width/2 - 59, cy: height-300}}> {splash} </SpriteWrapper>;
  }
})

export const Ready = observer(
  class Ready extends Component {

  render() {
      return <SpriteWrapper gameSprite={{cx: width/2 - 87, cy: height-380}}> {ready} </SpriteWrapper>;
  }
})

const App = observer(class App extends Component {
  componentDidMount() {
    this.req = window.requestAnimationFrame(this.appUpdateFrame)
  }

  //Call to store to update the frame
  appUpdateFrame = () => {
    this.props.updateFrame(); //this will trigger mobx to update the view when the observable value changes
    this.req = window.requestAnimationFrame(this.appUpdateFrame) //rerun this function again when browser is ready to update new frame
  }

  render() {
    const {bgs, fgs, bird, pipes} = this.props.store
    const { currentstate } = this.props.game;

    const style = {
      width: width,
      height: height
    }

    return (
      <div className="App" id="fakingcanvas" style={style}>
      { bgs.map( (bg) => ( <Bg bg={bg} key={bg.id} /> )     )}
      { pipes.map( (pipe) => (  <Pipe pipe={pipe} key={pipe.id} /> )   )}
      { (currentstate === states.Login)   ? <Start /> : null}
      { (currentstate !== states.Login)   ? <Bird bird={bird} />: null}
      { (currentstate === states.Score) ? <Gameover /> : null }
      { (currentstate === states.Score) ? <OK /> : null }
      { (currentstate === states.Splash) ? <Splash /> : null }
      { (currentstate === states.Splash) ? <Ready /> : null }
      { fgs.map( (fg) => ( <Fg fg={fg} key={fg.id} /> )     )}
      </div>
    );
  }
})

export default App