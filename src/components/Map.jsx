import React, { useState } from 'react';
// import * as example from './fvtt-Scene-test-example.json';
import * as example from './fvtt-Scene-tvfbchicbrvuctrvjcdvbdlncfndfuti.json';

import { Square } from './Square';
import Downloadfile from './Downloadfile';

const Map = (props) => {
  const [dataShape, setDataShape] = useState(example);

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
          setDataShape={setDataShape}
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
        <button onClick={(e) => Downloadfile(dataShape)}>Save Map</button>

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
      <Grid shape={dataShape} />
    </div>
  );
};

export default Map;
