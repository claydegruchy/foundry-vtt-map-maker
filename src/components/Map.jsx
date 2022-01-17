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
import {
  makeWall,
  makeDrawing,
  makeScene,
  mapRenderStyle,
  editShapeStyle,
} from './Vtt';
import { Grid } from './Util';
import Downloadfile from './Downloadfile';
import { v4 as uuidv4 } from 'uuid';

const getCorners = (rect, scale) => {
  let corners = [];
  let size = rect.size();
  console.log({ size, scale });
  console.log(
    'getTransform',
    rect.getTransform().m,

    'getAbsoluteTransform',
    rect.getAbsoluteTransform().m,
    rect.getAbsoluteScale(),
    rect.getAbsolutePosition()
  );

  // Now get the 4 corner points
  corners[0] = { x: 0, y: 0 }; // top left
  corners[1] = { x: size.width, y: 0 }; // top right
  corners[2] = { x: size.width, y: size.height }; // bottom right
  corners[4] = { x: 0, y: size.height }; // bottom left
  corners[5] = { x: 0, y: 0 }; // join the circle of points

  // And rotate the corners using the same transform as the rect.
  var newCorners = [];
  for (var corner of corners.filter((e) => e)) {
    newCorners.push(rect.getTransform().point(corner)); // top left
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
    fill={mapRenderStyle.fillColor}
    stroke={mapRenderStyle.strokeColor}
    strokeWidth={mapRenderStyle.strokeWidth}
    points={points}
  />
);

var TerfMultiPoly = ({ features }) => {
  if (!features) return null;

  const P = ({ points }) => (
    <Poly
      fill={mapRenderStyle.fillColor}
      stroke={mapRenderStyle.strokeColor}
      strokeWidth={mapRenderStyle.strokeWidth}
      points={points}
    />
  );

  var processFeature = (feature) => {
    // try {
    //   feature = turf.transformScale(feature, 4);
    //   return feature;
    // } catch (e) {
    //   return feature;
    // }
    return feature;
  };

  if (features.geometry.type == 'Polygon')
    return (
      <>
        <P points={[...turf.getCoords(processFeature(features))[0]]} />
      </>
    );
  if (features.geometry.type == 'MultiPolygon')
    return (
      <>
        {turf.getCoords(processFeature(features)).map((c) => (
          <P points={[...c[0]]} />
        ))}
      </>
    );
  return null;
};

const ConvertLayerToTurfPoly = (children, scale) => {
  var transformedShapes = [];
  for (var shape of children) {
    transformedShapes.push(
      turf.polygon([getCorners(shape, scale)], { fill: '#0f0' })
    );
  }
  var newShape = transformedShapes[0];

  for (var shape of transformedShapes.slice(1)) {
    newShape = turf.union(newShape, shape);
  }

  return newShape;
};

const convertPolyToScene = (poly) => {
  if (!poly) return;
  var walls = [];
  var drawings = [];

  var addWall = (points, center) => {
    console.group('addwall');
    walls = [...walls, ...makeWall(points)];
    drawings = [...drawings, makeDrawing(points)];
    console.groupEnd('addwall');
  };

  if (poly.geometry.type == 'Polygon') {
    addWall(turf.getCoords(poly));
  }

  if (poly.geometry.type == 'MultiPolygon') {
    turf.getCoords(poly).forEach((c) => addWall(c));
  }

  return makeScene({ walls, drawings });
};
const Rectangle = ({
  shapeProps,
  isSelected,
  onSelect,
  onChange,
  onClick,
  draggable = true,
  transformEnd,
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
        onClick={onClick || onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable={draggable}
        onDragStart={(e) => console.log({ ...e.target })}
        // onMouseMove={(e) => console.log({...e.target})}
        onKeyDown={(e) => console.log(key)}
        onDragStart={(e) =>
          onChange({
            ...shapeProps,
            strokeWidth: 8,
            x: e.target.x(),
            y: e.target.y(),
          })
        }
        onDragEnd={(e) =>
          onChange({
            ...shapeProps,
            strokeWidth: 0,
            x: e.target.x(),
            y: e.target.y(),
          })
        }
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

var defaultStageParams = {
  scale: 0.25,
  data: {
    gridSize: 100,
    area: 1000,
    defaultColour: 'brown',
    defaultEditStyle: {
      fill: 'rgba(0,0,0,0.0)',
      stroke: 'black',
      strokeWidth: 8,
      strokeColor: '#009933',
    },
  },
};

const toolBoxRectangles = [
  {
    width: 300,
    height: 300,
    fill: 'black',
    id: 't1',
  },
  {
    width: 150,
    height: 600,
    fill: 'black',
    id: 't2',
  },
];

const initialRectangles = [
  // {
  //   x: 300,
  //   y: 300,
  //   width: 300,
  //   height: 300,
  //   id: 'rect1',
  // ...editShapeStyle,
  // },
  {
    x: 300,
    y: 300,
    width: 500,
    height: 500,
    ...editShapeStyle,
    id: 'rect2',
  },
];

const addShape = (shape) => ({
  ...shape,
  ...editShapeStyle,
  id: uuidv4(),
});

const Map = (props) => {
  const [dataShape, setDataShape] = useState(example);
  const [unionisedShape, setUnionisedShape] = useState();
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, selectShape] = React.useState(null);
  const [stageParams, setStageParams] = React.useState(defaultStageParams);

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
      scale: stageParams.scale * change,
    });

  var toolboxDist = 0;
  return (
    <div
      onKeyDown={(e) => {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          // Execute your logic here.
          console.log(e);
        }
      }}
    >
      <div onClick={(e) => Downloadfile(convertPolyToScene(unionisedShape))}>
        Export
      </div>
      Zoom: {stageParams.scale}
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
        // this is beyond dumb
      >
        <Stage
          scaleY={stageParams.scale}
          scaleX={stageParams.scale}
          key={'edit'}
          style={{ margin: 30, borderStyle: 'solid' }}
          width={window.innerWidth / 2.5}
          height={window.innerHeight / 1.1}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer
          //the later where we can see the final scene
          >
            <Text text={stageParams.scale} fontSize={12 / stageParams.scale} />

            <TerfMultiPoly features={unionisedShape} />
          </Layer>
          {/*draw the grid*/}
          <Layer>
            <Grid
              scale={stageParams.scale}
              gridSize={stageParams.data.gridSize}
              area={stageParams.data.area * 4}
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
              cornerRadius={10}
            />
            {toolBoxRectangles.map((rect, i) => {
              toolboxDist += 10;
              rect.y = toolboxDist;
              rect.x = 10;
              toolboxDist += rect.height;
              return (
                <Rectangle
                  key={rect.id}
                  shapeProps={rect}
                  draggable={false}
                  onClick={(e) => {
                    // add a copy of this shape to the scene
                    setRectangles([...rectangles, addShape(rect)]);
                  }}
                />
              );
            })}
          </Layer>
          {/*the later where we can cahnge shapes*/}
          <Layer
            onClick={(e) => {
              setUnionisedShape(
                ConvertLayerToTurfPoly(
                  e.currentTarget.getChildren(
                    (e) => e.getClassName() == 'Rect'
                  ),
                  stageParams.scale
                )
              );
            }}
            onDragStart={(e) => {
              setUnionisedShape(
                ConvertLayerToTurfPoly(
                  e.currentTarget.getChildren(
                    (e) => e.getClassName() == 'Rect'
                  ),
                  stageParams.scale
                )
              );
            }}
            onDragEnd={(e) => {
              setUnionisedShape(
                ConvertLayerToTurfPoly(
                  e.currentTarget.getChildren(
                    (e) => e.getClassName() == 'Rect'
                  ),
                  stageParams.scale
                )
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
      </div>
      <div>
        <pre>
          ({JSON.stringify(convertPolyToScene(unionisedShape), null, 2)})
        </pre>
      </div>
    </div>
  );
};

export default Map;
