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

const Square = ({ rowNumber, columnNumber, shape, setDataShape }) => {
  const [style, setStyle] = useState(defaultStyle);

  const updateTiles = (tiles) => {
    var newShape = produce(shape, (draft) => {
      draft.tiles = tiles;
      return draft;
    });
    setDataShape(newShape);
  };

  var { grid, tiles, walls } = shape;

  var y = columnNumber * grid;
  var x = rowNumber * grid;

  var foundTiles = tiles.filter((t) => t.y == y && t.x == x);
  var hasTiles = foundTiles.length > 0;
  // apply styles
  var thisStyle = { ...style.node };

  if (hasTiles) {
    thisStyle = { ...thisStyle, ...style.hasTile };
  }

  const handleClick = (e) => {
    if (hasTiles) {
      foundTiles.forEach((tile) => {
        updateTiles(shape.tiles.filter((t) => t._id != tile._id));
      });
    } else {
      updateTiles([...shape.tiles, templates.tile({ y, x })]);
    }
  };

  return (
    <div style={thisStyle} onClick={handleClick}>
      {rowNumber}:{columnNumber}
    </div>
  );
};

export default Square;
