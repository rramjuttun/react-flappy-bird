import {bg, fg, bird, pipe } from './asset'
import { height } from './common';
import { bg_h, bg_w, fg_h, fg_w, pipe_h, pipe_w, bird_h, bird_w} from './sprite'; //To get sprite properties
import { action, observable, runInAction } from 'mobx';
import { Web3Auth } from "@web3auth/modal";

const bg1 = new bg(guid(), 0, height - bg_h)
const bg2 = new bg(guid(), bg_w, height - bg_h)

//Build the moving ground
const fg1 = new fg(guid(), 0, height - fg_h )
const fg2 = new fg(guid(), fg_w, height - fg_h )

export const states = {
  Login: 0, Splash: 1, Game: 2, Score: 3
}

//Game state
export const game = observable({
    currentstate:0,
})

export const store = {
  bird : new bird(guid(),60,0),
  fgpos: 0,
  frames: 1,
  bgs: [ bg1, bg2 ],
  fgs: [ fg1, fg2 ],
  pipes: observable([]), //initialize with empty pipe
}

export const web3login = action(async function() {
  const web3auth = new Web3Auth({
    clientId: process.env.REACT_APP_WEB3AUTH_CLIENT_ID,
    chainConfig: {
      chainNamespace: "eip155",
      chainId: "0x13881",
      rpcTarget: process.env.REACT_APP_ETH_NODE_URI,
    },
    web3AuthNetwork: "cyan"
  });

  await web3auth.initModal();
  const provider = await web3auth.connect();
  const publicKey = (await provider.request({ method: "eth_accounts" }))[0]

  runInAction(() => {
    userInfo.web3Provider = provider;
    userInfo.publicKey = publicKey;
    game.currentstate = states.Splash;
  });
})

export const userInfo = {
  web3Provider: null,
  publicKey: null,
  bird: null
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

const updateBird = function(bird) {
  bird.frame += store.frames % 10 === 0 ? 1 : 0;
  bird.frame %= bird.animation.length; //change bird frame every 10 frames

  if (game.currentstate === states.Splash) { //make the bird hover on the splash screen

    bird.cy = height - 280 + 5*Math.cos(store.frames/10)  // ~199 - ~201
    bird.rotation = 0;

  } else {

    bird.velocity += bird.gravity;
  	bird.cy += bird.velocity;

    if (bird.cy >= height - fg_h-10) {
      bird.cy = height - fg_h-10;
      if (game.currentstate === states.Game) {

            game.currentstate = states.Score;

  		}
      // set velocity to jump speed for correct rotation
      bird.velocity = bird._jump;
    }

    // when bird lacks upward momentum, increment the rotation angle
    if (bird.velocity >= bird._jump) {

      bird.frame = 1;
      bird.rotation = Math.min(Math.PI/2, bird.rotation + 0.3);

    } else {

      bird.rotation = -0.3;

    }
  }
}

const updatePipe = function() {

  if (store.frames % 100 === 0) {

    var _y = height - (pipe_h + fg_h +120+200*Math.random());
    store.pipes.push(
      new pipe(guid(), pipe_h, _y, "S"),
      new pipe(guid(), pipe_h, _y+100+ pipe_h, "N")
    )
  }

  store.pipes.forEach( (p) => {
    const bird = store.bird
    var cx = Math.min(Math.max(bird.cx + bird_w/2 , p.cx), p.cx + pipe_w);
    var cy = Math.min(Math.max(bird.cy + bird_h/2, p.cy), p.cy + pipe_h);

    // closest difference
    var dx = bird.cx + bird_w/2 - cx;
    var dy = bird.cy + bird_h/2 - cy;

    // vector length
    var d1 = dx*dx + dy*dy;
    var r = bird.radius*bird.radius;

    // determine intersection
    if (r > d1) {
      game.currentstate = states.Score;
    }
    //Move the pipe left
    p.cx -= 2
    if (p.cx < -pipe_w) {
      store.pipes.splice(0, 2); //remove first 2 pipe
    }

  })
}

export const birdjump =  action(function(bird) {
    bird.velocity = -bird._jump;
})

export const rungame = action(function() {
    store.bird = new bird(guid(),60,0)
    store.fgpos = 0
    store.frames = 1
    store.pipes = observable([])  //Initalize to empty empty on game start

    game.currentstate= states.Game;
})

//Call to update frame
export const updateFrame = action(function() {

  store.frames++;
  store.fgpos = (store.fgpos - 2) % 14;
  fg1.cx = store.fgpos;  //Fg is observing the cx position not fgpos
  fg2.cx = store.fgpos + fg_w;

  updateBird(store.bird)

  if (  game.currentstate  === states.Game) {
      updatePipe()
  }

})
