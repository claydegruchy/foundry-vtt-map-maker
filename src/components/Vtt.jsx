import { v4 as uuidv4 } from 'uuid';
import * as example from './fvtt-base-scene.json';

var mapRenderStyle = {
  fillColor: '#003300',
  strokeWidth: 10,
  strokeColor: '#009933',
};

var mapRenderStyles = {
  default: {
    fillColor: '#003300',
    strokeWidth: 10,
    strokeColor: '#009933',
    stageBackground: '#999999',
    gridlines: '#000000',
  },
  paper: {
    fillColor: '#FFFFFF',
    strokeWidth: 20,
    strokeColor: '#000000',
    stageBackground: '#FFFFFF',
    gridlines: '#000000',
  },
  blueprint: {
    fillColor: '#98AEDD',
    strokeWidth: 30,
    strokeColor: '#E4EAF6',
    stageBackground: '#405CB1',
    gridlines: '#FFFFFF',
  },
CRT:{
      fillColor: '#030E04',
    strokeWidth: 20,
    strokeColor: '#00F562',
    stageBackground: '#152D1B',
    gridlines: '#8FBBA4',
}

};

// todo: add blueprint mode

var editShapeStyle = {
  fill: 'rgba(0,0,0,0.0)',
  stroke: 'black',
  strokeWidth: 8,
  strokeColor: '#009933',
};
const getOffset = (heightOfMap = 4000, widthOfMap = 3000) => {
  return [heightOfMap * 0.25, widthOfMap * 0.266];
  // return [heightOfMap * 0.5, widthOfMap * 0.5];
};
const applyOffset = ([x, y]) => {
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

  drawing: ({ points, texture, style }) => {
    console.log({ style });
    return {
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
      ...style,
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
    };
  },
};

const makeScene = ({ walls, drawings, style }) => {
  console.log({ style });
  var t = {
    ...example,
    name: uuidv4(),
    walls,
    drawings,
    backgroundColor: style.stageBackground,
    gridColor: style.gridlines,
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

    console.log(applyOffset([1, 2]));

    // applyOffset;
    var [xs, ys] = applyOffset(thisPoint);
    var [xe, ye] = applyOffset(nextPoint);

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

const makeDrawing = (points, style) => {
  console.group('makeDrawing');

  var points = points[0];
  points = points.map((p) => applyOffset(p));

  console.groupEnd('makeDrawing');
  return templates.drawing({ points, style });
};

export {
  makeWall,
  makeScene,
  makeDrawing,
  mapRenderStyle,
  editShapeStyle,
  mapRenderStyles,
};
