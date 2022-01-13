import React, { useState } from 'react';
import * as example from './fvtt-Scene-test-example.json';
// import * as example from './fvtt-Scene-tvfbchicbrvuctrvjcdvbdlncfndfuti.json';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';
import * as turf from '@turf/turf';

var poly1 = turf.polygon(
  [
    [
      [-82.574787, 35.594087],
      [-82.574787, 35.615581],
      [-82.545261, 35.615581],
      [-82.545261, 35.594087],
      [-82.574787, 35.594087],
    ],
  ],
  { fill: '#0f0' }
);
var poly2 = turf.polygon(
  [
    [
      [-82.560024, 35.585153],
      [-82.560024, 35.602602],
      [-82.52964, 35.602602],
      [-82.52964, 35.585153],
      [-82.560024, 35.585153],
    ],
  ],
  { fill: '#00f' }
);

var union = turf.union(poly1, poly2);

console.log(union);

const Map = (props) => {
  const [dataShape, setDataShape] = useState(example);
  const [shapeData, setShapeData] = useState({
    isDragging: false,
    x: 50,
    y: 50,
  });

  var { width, height, grid } = dataShape;

  // height = height / grid;
  // width = width / grid;

  return (
    <div style={{ margin: 30, borderStyle: 'solid' }}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Rect
            width={100}
            height={100}
            stroke={'blue'}
            // shadowBlur={10}
            x={shapeData.x}
            y={shapeData.y}
            draggable
            // fillEnabled={false}
            fill={shapeData.isDragging ? 'green' : 'black'}
            onDragStart={() => {
              setShapeData({ ...shapeData, isDragging: true });
            }}
            onDragEnd={(e) => {
              var rect = e.target;
              console.log(
                e.target.getAbsoluteTransform().point({ x: 0, y: 0 })
              );
              // console.log(e.target.getAbsoluteTransform());

              let corners = [];
              let size = rect.size();
              console.log(size);

              // Now get the 4 corner points
              corners[0] = { x: 0, y: 0 }; // top left
              corners[1] = { x: size.width, y: 0 }; // top right
              corners[2] = { x: size.width, y: size.height }; // bottom right
              corners[4] = { x: 0, y: size.height }; // bottom left

              // console.log(corners);

              // And rotate the corners using the same transform as the rect.
              var newCorners = [];
              for (var corner of corners.filter((e) => e)) {
                newCorners.push(rect.getAbsoluteTransform().point(corner)); // top left
              }

              console.log(newCorners);
              setShapeData({
                isDragging: false,
                x: e.target.x(),
                y: e.target.y(),
              });
            }}
          />

          <Rect
            width={100}
            height={100}
            stroke={'blue'}
            // shadowBlur={10}
            x={200}
            y={200}
            // fillEnabled={false}
            fill={shapeData.isDragging ? 'green' : 'black'}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default Map;
