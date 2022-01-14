import React, { useState } from 'react';
import * as example from './fvtt-Scene-test-example.json';
// import * as example from './fvtt-Scene-tvfbchicbrvuctrvjcdvbdlncfndfuti.json';
import { Stage, Layer, Rect, Text, Circle, Line, Shape } from 'react-konva';
import * as turf from '@turf/turf';

const getCorners = (rect) => {
  let corners = [];
  let size = rect.size();

  // Now get the 4 corner points
  corners[0] = { x: 0, y: 0 }; // top left
  corners[1] = { x: size.width, y: 0 }; // top right
  corners[2] = { x: size.width, y: size.height }; // bottom right
  corners[4] = { x: 0, y: size.height }; // bottom left
  corners[5] = { x: 0, y: 0 }; // join the circle of points

  // And rotate the corners using the same transform as the rect.
  var newCorners = [];
  for (var corner of corners.filter((e) => e)) {
    newCorners.push(rect.getAbsoluteTransform().point(corner)); // top left
  }

  newCorners = newCorners.map(({ x, y }) => [x, y]);
  // console.log({ rect, newCorners });

  return newCorners;
};

const createTerfPoly = (coords) => turf.polygon([coords], { fill: '#0f0' });

const union = (shape1, shape2) => {
  console.log({ shape1, shape2 });
  if (!shape1 || shape1.length < 1) return shape2;
  if (!shape2 || shape2.length < 1) return shape1;

  var poly1 = turf.polygon([shape1], { fill: '#0f0' });
  var poly2 = turf.polygon([shape2], { fill: '#00f' });
  var union = turf.union(poly1, poly2);

  var u = turf.getCoords(union);

  return u;
};

var CustomPoly = ({ points }) => (
  <Shape
    sceneFunc={(context, shape) => {
      context.beginPath();

      for (var d of points) {
        context.lineTo(...d);
      }
      context.closePath();
      context.fillStrokeShape(shape);
    }}
    fill='#00D2FF'
    stroke='black'
    strokeWidth={1}
  />
);

const BuildingSquare = ({ x = 50, y = 50 }) => {
  const [shapeData, setShapeData] = useState({
    isDragging: false,
    x,
    y,
  });

  return (
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
        setShapeData({
          isDragging: false,
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
    />
  );
};

const Map = (props) => {
  const [dataShape, setDataShape] = useState(example);

  const [unionisedShape, setUnionisedShape] = useState([]);

  var { width, height, grid } = dataShape;

  console.log({ unionisedShape });
  return (
    <div style={{ margin: 30, borderStyle: 'solid' }}>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer
          onDragEnd={(e) => {
            var transformedShapes = [];
            for (var shape of e.currentTarget.getChildren()) {
              transformedShapes.push(createTerfPoly(getCorners(shape)));
            }
            var newShape = [];

            for (var shape of transformedShapes) {
            }

            console.log(transformedShapes);

            // var combined =
            //   // .map((shape) => getCorners(shape))
            //   .reduce((previousValue, currentValue) => {
            //     return union(previousValue, currentValue);
            //   }, []);
            // console.log({ newShape });
            // setUnionisedShape(newShape);
          }}
        >
          <BuildingSquare />
          <BuildingSquare />
          <BuildingSquare />
        </Layer>
        <Layer offsetX={-500}>
          <CustomPoly points={unionisedShape} />
        </Layer>
      </Stage>
    </div>
  );
};

export default Map;
