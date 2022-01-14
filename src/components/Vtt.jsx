import { v4 as uuidv4 } from 'uuid';
import * as example from './fvtt-Scene-tvfbchicbrvuctrvjcdvbdlncfndfuti.json';

const templates = {
  tile: ({ x, y }) => ({
    _id: uuidv4(),
    img: 'modules/ship-maker/textures/Grate_Metal_D_03_small.png',
    width: 100,
    height: 100,
    x,
    y,
    z: 1,
    rotation: 180,
    alpha: 1,
    tint: null,
    hidden: false,
    locked: false,
    overhead: false,
    occlusion: {
      mode: 1,
      alpha: 0,
    },
    video: {
      loop: true,
      autoplay: true,
      volume: 0,
    },
    flags: {},
  }),
  wall: ({ xs, ys, xe, ye }) => ({
    _id: uuidv4(),
    c: [xs, ys, xe, ye],
    light: 20,
    move: 20,
    sight: 20,
    sound: 20,
    dir: 0,
    door: 0,
    ds: 0,
    flags: {},
  }),
};

const makeScene = ({ walls }) => {
  var t = {
    ...example,
    name: uuidv4(),
    walls,
  };

  return t;
};

const makeWall = (e) => {
  console.group('makewall');

  var l = e[0];

  var walls = [];

  l.forEach((n, i) => {
    var thisPoint = l[i];
    var nextPoint = l[i + 1];
    if (!nextPoint) nextPoint = l[0];

    var [xs, ys] = thisPoint;
    var [xe, ye] = nextPoint;

    var w = templates.wall({
      xs,
      ys,
      xe,
      ye,
    });

    walls.push(w);
  });

  console.log(walls);
  console.groupEnd('makewall');
  return walls;
};

export { makeWall, makeScene };
