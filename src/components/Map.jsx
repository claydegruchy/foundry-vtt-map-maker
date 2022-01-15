import React, { useState } from 'react';
import * as example from './fvtt-Scene-test-example.json';
// import * as example from './fvtt-Scene-tvfbchicbrvuctrvjcdvbdlncfndfuti.json';
import {
  Stage,
  Layer,
  Rect,
  Text,
  Circle,
  Line,
  Shape,
  Transformer,
} from 'react-konva';
import * as turf from '@turf/turf';
import { makeWall, makeScene } from './Vtt';
import { Grid } from './Util';
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
    <Poly
      key={points.length}
      fill='#00FF00'
      stroke='black'
      strokeWidth={5}
      points={points}
    />
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
const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  draggable = true,
}) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={draggable}
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const toolBoxRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'black',
    id: 't1',
  },
  {
    x: 10,
    y: 150,
    width: 100,
    height: 50,
    fill: 'black',
    id: 't2',
  },
];

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'red',
    id: 'rect1',
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: 'green',
    id: 'rect2',
  },
];

const Map = (props) => {
  const [dataShape, setDataShape] = useState(example);
  const [unionisedShape, setUnionisedShape] = useState();
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, selectShape] = React.useState(null);
  const [stageParams, setStageParams] = React.useState({
    scaleX: 0.5,
    scaleY: 0.5,
    data: { gridSize: 100, area: 1000 },
  });

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  var changeZoom = (change) =>
    setStageParams({
      ...stageParams,
      scaleX: stageParams.scaleX * change,
      scaleY: stageParams.scaleY * change,
    });
  return (
    <div>
      <div onClick={(e) => Downloadfile(convertPolyToScene(unionisedShape))}>
        Export
      </div>

      <div onClick={(e) => changeZoom(1.5)}>Zoom In</div>
      <div onClick={(e) => changeZoom(0.5)}>Zoom Out</div>

      <input
        type='number'
        onInput={(e) =>
          setStageParams({
            ...stageParams,
            data: {
              ...stageParams.data,
              gridSize: (e.target.value > 0 && e.target.value) || 1,
            },
          })
        }
        value={stageParams.data.gridSize}
      />

      <div
        style={{
          flexDirection: 'row',
          alignItems: 'stretch',

          display: 'flex',
        }}
      >
        <Stage
          style={{ margin: 30, borderStyle: 'solid' }}
          width={window.innerWidth / 2.5}
          height={window.innerHeight / 1.1}
          {...stageParams}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          {/*draw the grid*/}
          <Layer>
            <Grid
              scale={stageParams.scaleX}
              gridSize={stageParams.data.gridSize}
              area={stageParams.data.area}
            />
          </Layer>
          {/*draw the toolbox*/}
          <Layer>
            <Rect
              x={0}
              y={0}
              opacity={0.5}
              width={Math.max(...toolBoxRectangles.map((s) => s.width)) + 30}
              height={toolBoxRectangles
                .map((s) => s.height)
                .reduce((partial_sum, a) => partial_sum + a, 100)}
              fill={'gray'}
            />

            {toolBoxRectangles.map((rect, i) => {
              return (
                <Rectangle
                  key={rect.id}
                  shapeProps={rect}
                  draggable={false}
                  onClick={(e) => console.log(e)}
                />
              );
            })}
          </Layer>
          {/*the later where we can cahnge shapes*/}
          <Layer
            onDragStart={(e) => {
              setUnionisedShape(
                ConvertLayerToTurfPoly(e.currentTarget.getChildren())
              );
            }}
            onDragEnd={(e) => {
              setUnionisedShape(
                ConvertLayerToTurfPoly(e.currentTarget.getChildren())
              );
            }}
          >
            {rectangles.map((rect, i) => {
              return (
                <Rectangle
                  key={i + 'r'}
                  shapeProps={rect}
                  isSelected={rect.id === selectedId}
                  onSelect={() => {
                    selectShape(rect.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = rectangles.slice();
                    rects[i] = newAttrs;
                    setRectangles(rects);
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
        <Stage
          style={{ margin: 30, borderStyle: 'solid' }}
          width={window.innerWidth / 2.5}
          height={window.innerHeight / 1.1}
          {...stageParams}
        >
          <Layer>
            <Grid
              scale={stageParams.scaleX}
              gridSize={stageParams.data.gridSize}
              area={stageParams.data.area}
            />
          </Layer>
          {/*the later where we can see the final scene*/}
          <Layer>
            <TerfMultiPoly features={unionisedShape} />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Map;
