import { v4 as uuidv4 } from 'uuid';
import * as example from './fvtt-Scene-tvfbchicbrvuctrvjcdvbdlncfndfuti.json';

var mapRenderStyle = {
  fillColor: '#003300',
  strokeWidth: 10,
  strokeColor: '#009933',
};

var editShapeStyle = {
  fill: 'rgba(0,0,0,0.0)',
  stroke: 'black',
  strokeWidth: 8,
  strokeColor: '#009933',
};
const getOffset = (heightOfMap = 4000, widthOfMap = 3000) => {
  return [heightOfMap / 4, widthOfMap / 4];
};
const applyOffset = (x, y) => {
  var [xo, yo] = getOffset();
  return [x + xo, y + yo];
};

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

  drawing: ({ points, texture }) => ({
    _id: uuidv4(),
    author: 'HkYvsyS3L7U5KzuX',
    type: 'p',
    x: 0,
    y: 0,
    rotation: 0,
    z: 0,
    points,
    bezierFactor: 0,
    fillType: 2,
    ...mapRenderStyle,
    fillAlpha: 0.5,
    strokeAlpha: 2,
    texture,
    // texture: 'modules/ship-maker/textures/Grate_Metal_B_01_small.png',
    fontFamily: 'Signika',
    fontSize: 48,
    textColor: '#FFFFFF',
    textAlpha: 1,
    hidden: false,
    locked: false,
    flags: {},
    text: '',
  }),
};

const makeScene = ({ walls, drawings }) => {
  var t = {
    ...example,
    name: uuidv4(),
    walls,
    drawings,
  };
  delete t['default'];
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

  console.groupEnd('makewall');
  return walls;
};

const makeDrawing = (points) => {
  console.group('makeDrawing');

  var points = points[0];

  console.groupEnd('makeDrawing');
  return templates.drawing({ points });
};

export { makeWall, makeScene, makeDrawing, mapRenderStyle, editShapeStyle };
