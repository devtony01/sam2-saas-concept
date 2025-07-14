import { useRef } from 'react';
import Konva from 'konva';
import { Stage } from 'react-konva';

export const Canvas = () => {
  const stageRef = useRef<Konva.Stage>(null);

  return (
    <Stage ref={stageRef} width={window.innerWidth} height={window.innerHeight} style={{ backgroundColor: '#f0f0f0' }}>
      {/* Add your layers and components here */}
    </Stage>
  );
};
