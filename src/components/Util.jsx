import React from 'react';
import { Line } from 'react-konva';

const Grid = ({ gridSize, area, scale, style = { gridlines: 'black' } }) => {
  return Array.from({ length: area * scale }).map((n, i) => (
    <>
      <Line
        // [0, Math.round(j * padding), width, Math.round(j * padding)]
        points={[i * gridSize, 0, i * gridSize, area / scale]}
        stroke={style.gridlines}
        strokeWidth={0.5}
      />
      <Line
        // [0, Math.round(j * padding), width, Math.round(j * padding)]

        points={[0, i * gridSize, area / scale, i * gridSize]}
        stroke={style.gridlines}
        strokeWidth={0.5}
      />
    </>
  ));
};

export { Grid };
