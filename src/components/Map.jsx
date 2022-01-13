import React, { useState } from 'react';
import * as example from './fvtt-Scene-test-example.json';

var defaultStyle = {
  node: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    outline: '1px solid rgba(144, 175, 175, 0.75)',
    display: 'inline-block',
    overflow: 'hidden',
    fontSize: 10,
  },
  hasTile: {
    backgroundColor: 'blue',
  },

  hasWall: {
    border: 'solid',
    'box-sizing': 'border-box',
  },
};

const Map = (props) => {
  const [style, setStyle] = useState(defaultStyle);

  const Square = ({ rowNumber, columnNumber, shape }) => {
    var { grid, tiles, walls } = shape;

    var y = columnNumber * grid;
    var x = rowNumber * grid;

    var bounds = {
      leftSide: Array.from({ length: grid }, (n, i) => i + y),
      // rightSide:Array.from({length: grid}, (n, i) => i+y),
      topSide: Array.from({ length: grid }, (n, i) => i + x),
      // bottomSide:Array.from({length: grid}, (n, i) => i+x),
    };

    var foundTiles = tiles.filter((t) => t.y == y && t.x == x);

    var foundWalls = walls.filter(({ c }) => {
      var [startY, startX, endY, endX] = c;
      if (x >= startX && x <= endX) return true;
      if (y >= startY && y <= endY) return true;
    });

    // apply styles
    var thisStyle = { ...style.node };

    if (foundTiles.length > 0) {
      // console.log(foundTiles);
      thisStyle = { ...thisStyle, ...style.hasTile };
    }

    if (foundWalls.length > 0) {
      console.log(foundWalls);
      // thisStyle = { ...thisStyle, ...style.hasWall };
    }

    return (
      <div style={thisStyle}>
        {rowNumber}:{columnNumber}
      </div>
    );
  };

  const Row = ({ shape, width, columnNumber }) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        // rowGap: '10px',
      }}
    >
      {Array.from({ length: width }, (v, i) => (
        <Square
          key={i + 'row'}
          rowNumber={i}
          columnNumber={columnNumber}
          shape={shape}
        />
      ))}
    </div>
  );

  const Grid = ({ shape }) => {
    var { width, height, grid } = shape;

    height = height / grid;
    width = width / grid;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {Array.from({ length: height }, (v, i) => (
          <Row
            key={i + 'column'}
            columnNumber={i}
            width={width}
            shape={shape}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Grid shape={example} />
    </div>
  );
};

export default Map;
