import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import reportWebVitals from './reportWebVitals';
import { store, updateFrame, birdjump, game, states, rungame, userInfo } from './game/store';

const root = ReactDOM.createRoot(
  document.getElementById('root')
);

root.render(
  <App store={store} updateFrame={updateFrame} game={game} userInfo={userInfo}/>
)

function onPress(evt) {
  switch (game.currentstate) {
    default:
    case states.Login:
      break
    case states.Splash:
      rungame()
      birdjump(store.bird)
      break
    case states.Game:
      birdjump(store.bird)
      break
    case states.Score:
      break
  }
}

document.addEventListener('mousedown', onPress);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
