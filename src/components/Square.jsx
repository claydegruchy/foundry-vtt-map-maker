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

const Square = ({ rowNumber, columnNumber, shape, setDataShape }) => {
  const [style, setStyle] = useState(defaultStyle);

  const getNeighbours = () => {};

  // const addTiles =tiles =>

  var { x, y } = computeLocation({ rowNumber, columnNumber, shape });

  var foundTiles = getTilesForLocation({ x, y, shape });
  var hasTiles = foundTiles.length > 0;
  // apply styles
  var thisStyle = { ...style.node };

  if (hasTiles) {
    thisStyle = { ...thisStyle, ...style.hasTile };
  }

  const handleClick = (e) => {
    if (hasTiles) {
      foundTiles.forEach((tile) => {
        // updateTiles(shape.tiles.filter((t) => t._id != tile._id));

        removeTileFromLocation({ setDataShape, y, x, shape, tile });
      });
    } else {
      addTileToLocation({ setDataShape, y, x, shape });
    }
  };

  return (
    <div style={thisStyle} onClick={handleClick}>
      {rowNumber}:{columnNumber}
    </div>
  );
};

export { Square, computeLocation, getTilesForLocation };
