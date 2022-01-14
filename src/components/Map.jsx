import React, { useState } from 'react';
import * as example from './fvtt-Scene-test-example.json';
// import * as example from './fvtt-Scene-tvfbchicbrvuctrvjcdvbdlncfndfuti.json';
import { Stage, Layer, Rect, Text, Circle, Line, Shape } from 'react-konva';
import * as turf from '@turf/turf';
import { makeWall, makeScene } from './Vtt';
import Downloadfile from './Downloadfile';

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

var Poly = ({ points }) => (
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

var TerfMultiPoly = ({ features }) => {
  if (!features) return null;

  const P = ({ points }) => (
    <Poly fill='#00FF00' stroke='black' strokeWidth={5} points={points} />
  );

  if (features.geometry.type == 'Polygon')
    return (
      <>
        <P points={[...turf.getCoords(features)[0]]} />
      </>
    );
  if (features.geometry.type == 'MultiPolygon')
    return (
      <>
        {turf.getCoords(features).map((c) => (
          <P points={[...c[0]]} />
        ))}
      </>
    );
  return null;
};

const BuildingSquare = ({
  x = 50,
  y = 50,
  width = 200,
  height = 200,
  stroke = 'blue',
}) => {
  const [shapeData, setShapeData] = useState({
    isDragging: false,
    x,
    y,
  });

  return (
    <Rect
      width={width}
      height={height}
      stroke={stroke}
      x={shapeData.x}
      y={shapeData.y}
      draggable
      fill={shapeData.isDragging ? 'gray' : 'black'}
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

const ConvertLayerToTurfPoly = (children) => {
  var transformedShapes = [];
  for (var shape of children) {
    transformedShapes.push(turf.polygon([getCorners(shape)], { fill: '#0f0' }));
  }
  var newShape = transformedShapes[0];

  for (var shape of transformedShapes.slice(1)) {
    newShape = turf.union(newShape, shape);
  }

  return newShape;
};

const convertPolyToScene = (poly) => {
  console.log({ poly });
  if (!poly) return;
  var walls = [];

  var addWall = (points) => {
    console.group('addwall');
    walls = [...walls, ...makeWall(points)];
    console.groupEnd('addwall');
  };

  if (poly.geometry.type == 'Polygon') {
    addWall(turf.getCoords(poly));
  }

  if (poly.geometry.type == 'MultiPolygon') {
    // console.log()
    turf.getCoords(poly).forEach((c) => addWall(c));
  }

  return makeScene({ walls });
};

const Map = (props) => {
  const [dataShape, setDataShape] = useState(example);
  const [unionisedShape, setUnionisedShape] = useState();
  const [rectangles, setRectangles] = useState([]);

  return (
    <div>
      <div onClick={(e) => Downloadfile(convertPolyToScene(unionisedShape))}>
        Export
      </div>
      <div
        style={{
          flexDirection: 'row',
          alignItems: 'stretch',

          display: 'flex',
        }}
      >
        <Stage
          style={{ flex: 1, margin: 30, borderStyle: 'solid' }}
          width={window.innerWidth / 2.5}
          height={window.innerHeight / 1.1}
          scaleX={0.5}
          scaleY={0.5}
        >
          <Layer
            onDragEnd={(e) => {
              setRectangles(e.currentTarget.getChildren());

              setUnionisedShape(
                ConvertLayerToTurfPoly(e.currentTarget.getChildren())
              );
            }}
          >
            <BuildingSquare />
            <BuildingSquare />
            <BuildingSquare />
            <BuildingSquare width={400} height={100} />
            <BuildingSquare width={100} height={400} />
          </Layer>
        </Stage>
        <Stage
          style={{ flex: 1, margin: 30, borderStyle: 'solid' }}
          width={window.innerWidth / 2.5}
          height={window.innerHeight / 1.1}
        >
          <Layer>
            <TerfMultiPoly features={unionisedShape} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Map;
