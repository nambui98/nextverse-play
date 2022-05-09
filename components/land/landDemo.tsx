import { useEffect, useRef, useState } from 'react';
import { Layer, Rect, Stage, Group, KonvaNodeComponent} from 'react-konva';
import { LandConst } from '../../libs/landConst';

export default function LandDemo() {
  interface IStageCoords {
    x: number;
    y: number;
  }

  const [grid, setGrid] = useState<KonvaNodeComponent<any>[]>([]);
  const [lands, setLands] = useState<KonvaNodeComponent<any>[]>([]);
  const [stagePos, setStagePos] = useState<IStageCoords>({ x: 700, y: 150 });
  const [scale, setScale] = useState(0.5)
  const layerRef = useRef<any>()

  function handleDragEnd(e: any) {
    setStagePos(e.currentTarget.position());
  }
  
  const handleWheelZoom = (e: any) => {
    e.evt.preventDefault();

    const scaleBy = 0.5;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();

    const newScale = e.evt.deltaY > 0 ? oldScale + scaleBy : oldScale - scaleBy;

    if (newScale >= 0.5 && newScale <= 3) {
      const pointer = stage.getPointerPosition()
      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };
      const newPos = {
        x: pointer.x - mousePointTo.x * newScale,
        y: pointer.y - mousePointTo.y * newScale,
      };
      setStagePos(newPos)
      setScale(newScale)
    }
  }

  const padding: number = 30;

  const startX = -600
  const endX = 1560

  const startY = -600
  const endY = 1560

  const gridTemp: any = [];
  
  function drawGrid() {
    for (var x = startX; x < endX; x += padding) {
      for (var y = startY; y < endY; y += padding) {
        gridTemp.push(
          <Rect
            key={Math.random()}
            x={x}
            y={y}
            width={padding}
            height={padding}
            stroke="black"
          />
        );
      }
    }

    setGrid(gridTemp);
  }
  
  function drawLand() {
    const landsTemp: any = []
    LandConst.map((land: any, idx: number) => {
      landsTemp.push(
        <Rect
          key={idx}
          x={land.x * padding + 2}
          y={land.y * padding + 2}
          width={padding * land.type - 4}
          height={padding * land.type - 4}
          fill={land.color}
        />
      )
    })
    
    setLands(landsTemp)
  }

  useEffect(() => {
    drawGrid()
    drawLand()
  }, []);
  
  const [image, setImage] = useState(new window.Image());
  const imageRef = useRef<any>();
  
  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "Anonymous";
    img.src =
      "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80";
    setImage(img);
  }, []);
  
  const [size, setSize] = useState({
    width: window.innerWidth - 240,
    height: window.innerHeight - 120
  });
  
  useEffect(() => {
    const checkSize = () => {
      setSize({
        width: window.innerWidth - 240,
        height: window.innerHeight - 120
      });
    };

    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);
  return (
  <>
      <Stage
        className="stage"
        x={stagePos.x}
        y={stagePos.y}
        scaleX={scale}
        scaleY={scale}
        width={window.innerWidth - 320}
        height={window.innerHeight - 120}
        preventDefault
        draggable
        onDragEnd={handleDragEnd}
        onWheel={handleWheelZoom}
      >
        <Layer ref={layerRef}>
          <Group>
            {grid}
            {lands}
          </Group>
        </Layer>
      </Stage>
  </>
  );
}
