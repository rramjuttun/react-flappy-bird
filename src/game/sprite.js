//Adapted from react-spritesheet
import React from 'react';
import bird_img from '../assets/ownable/bird2.png'
import fg_img from '../assets/common/fg.png'
import bg_img from '../assets/common/bg.png'
import pipeN_img from '../assets/common/pipeN.png'
import pipeS_img from '../assets/common/pipeS.png'
import gameover_img from '../assets/common/gameover.png'
import ok_img from '../assets/common/_ok_.png'
import splash_img from '../assets/common/splash.png'
import ready_img from '../assets/common/ready.png'

export const Sprite = ({ filename, x, y, width, height }) => {
  if (!filename) {
    return null;
  }

  const style = {
    backgroundImage: `url(${filename})`,
    backgroundPosition: `${x * (-1)}px ${y * (-1)}px`,
    width,
    height,
  };

  return <div style={style} data-x={x} data-y={y} data-w={width} data-h={height} />;
};

export const bg = Sprite({
  filename: bg_img,
  x: 0,
  y: 0,
  width: 276,
  height: 228
})

export const fg = Sprite({
  filename: fg_img,
  x: 0,
  y: 0,
  width: 222,
  height: 112
})

export const bird0 = Sprite({
  filename: bird_img,
  x : 0,
  y : 0,
  width : 34,
  height : 24
})

export const bird1 = Sprite({
  filename: bird_img,
  x : 0,
  y : 26,
  width : 34,
  height : 24
})

export const bird2 = Sprite({
  filename: bird_img,
  x : 0,
  y : 52,
  width : 34,
  height : 24
})

export const pipeN = Sprite({
  filename: pipeN_img,
  x: 0,
  y: 0,
  width: 52,
  height: 400
})

export const pipeS = Sprite({
  filename: pipeS_img,
  x: 0,
  y: 0,
  width: 52,
  height: 400
})

export const gameover = Sprite({
  filename: gameover_img,
  x: 0,
  y: 0,
  width: 188,
  height: 38
})

export const _ok_ = Sprite({
  filename: ok_img,
  x: 0,
  y: 0,
  width: 80,
  height: 28
})

export const splash = Sprite({
  filename: splash_img,
  x: 0,
  y: 0,
  width: 117,
  height: 100
})

export const ready = Sprite({
  filename: ready_img,
  x: 0,
  y: 0,
  width: 174,
  height: 44
})

export const bg_h = bg.props['data-h']
export const bg_w = bg.props['data-w']
export const fg_h = fg.props['data-h']
export const fg_w = fg.props['data-w']
export const bird_h = bird0.props['data-h']
export const bird_w = bird0.props['data-w'] 
export const pipe_h = pipeN.props['data-h'] 
export const pipe_w = pipeN.props['data-w'] 
