import React, { useState } from 'react';
import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';

var defaultStyle = {
  node: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    outline: '1px solid rgba(144, 175, 175, 0.75)',
    display: 'inline-block',
    overflow: 'hidden',
    fontSize: 10,
    userSelect: 'none',
  },
  hasTile: {
    backgroundColor: 'skyblue',
  },

  hasWall: {
    border: 'solid',
    'box-sizing': 'border-box',
  },
};

// console.log(Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 32))

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
  // wall:
};

var wallLocations = ['top', 'right', 'left', 'bottom'];

function isBetween(n, a, b) {
  return (n - a) * (n - b) <= 0;
}

function range(start, stop, step = 1) {
  var a = [start],
    b = start;
  while (b < stop) {
    a.push((b += step || 1));
  }
  return a;
}

const computeLocation = ({ rowNumber, columnNumber, shape }) => ({
  y: columnNumber * shape.grid,
  x: rowNumber * shape.grid,
});

const getTilesForLocation = ({ y, x, shape }) =>
  shape.tiles.filter((t) => t.y == y && t.x == x);

const updateTiles = ({ tiles, shape, setDataShape }) => {
  var newShape = produce(shape, (draft) => {
    draft.tiles = tiles;
    return draft;
  });
  setDataShape(newShape);
};

const addTileToLocation = ({ y, x, shape, setDataShape }) =>
  updateTiles({
    setDataShape,
    shape,
    tiles: [...shape.tiles, templates.tile({ y, x })],
  });

const removeTileFromLocation = ({ y, x, shape, tile, setDataShape }) =>
  updateTiles({
    setDataShape,
    shape,
    tiles: shape.tiles.filter((t) => t._id != tile._id),
  });

const getWallsForLocation = ({ y, x, shape }) =>
  shape.walls.filter(({ c }) => {
    var { grid } = shape;
    var [xs, ys, xe, ye] = c;

    if (x > 300 || y > 300) return;

    console.log(range(xs, xe));

    // if (xs) console.log({ xs, ys, xe, ye });

    if (isBetween(xs, x, x + grid) && isBetween(ys, y, y + grid)) return true;
    if (isBetween(xe, x, x + grid) && isBetween(ye, y, y + grid)) return true;

    // console.log(x, x + grid, y, y + grid);

    // x + grid;
    // y + grid;
  });

const addWallToLocation = ({ y, x, shape, setDataShape, wallLocation }) => {
  if (!wallLocations.includes(wallLocation)) throw 'give a valid wall location';
};

const Square = ({ rowNumber, columnNumber, shape, setDataShape }) => {
  const [style, setStyle] = useState(defaultStyle);
  var thisStyle = { ...style.node };

  const getNeighbours = () => {};

  // const addTiles =tiles =>

  var { x, y } = computeLocation({ rowNumber, columnNumber, shape });

  var foundTiles = getTilesForLocation({ x, y, shape });
  var hasTiles = foundTiles.length > 0;

  var foundWalls = getWallsForLocation({ x, y, shape });
  var hasWalls = foundWalls.length > 0;

  if (hasTiles) {
    thisStyle = { ...thisStyle, ...style.hasTile };
  }

  if (hasWalls) {
    thisStyle = { ...thisStyle, ...style.hasTile };
  }

  const handleClick = (e) => {
    if (hasTiles) {
      foundTiles.forEach((tile) => {
        removeTileFromLocation({ setDataShape, y, x, shape, tile });
      });
    } else {
      addTileToLocation({ setDataShape, y, x, shape });
    }
  };

  return (
    <div
      style={thisStyle}
      onClick={handleClick}
      onMouseMove={(e) => {
        // if (e.buttons == 1) handleClick();
      }}
    >
      <div>x{x}</div>
      <div>y{y}</div>
    </div>
  );
};

export { Square, computeLocation, getTilesForLocation };
