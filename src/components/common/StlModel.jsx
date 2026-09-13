import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { STLLoader } from 'three-stdlib';

// Renderiza uma malha STL centralizada na cena e reporta suas dimensões (X/Y/Z)
// via callback, para alimentar o DimensionsOverlay.
const StlModel = ({ url, cor, onDimensionsParsed }) => {
  const originalGeom = useLoader(STLLoader, url);

  const geom = useMemo(() => {
    const clonedGeom = originalGeom.clone();
    clonedGeom.computeBoundingBox();
    const box = clonedGeom.boundingBox;

    if (onDimensionsParsed) {
      const sizeX = Math.abs(box.max.x - box.min.x);
      const sizeY = Math.abs(box.max.y - box.min.y);
      const sizeZ = Math.abs(box.max.z - box.min.z);
      onDimensionsParsed({ x: sizeX.toFixed(1), y: sizeY.toFixed(1), z: sizeZ.toFixed(1) });
    }

    const centerX = (box.max.x + box.min.x) / 2;
    const centerZ = (box.max.z + box.min.z) / 2;
    clonedGeom.translate(-centerX, -box.min.y, -centerZ);
    clonedGeom.computeBoundingBox();
    return clonedGeom;
  }, [originalGeom, onDimensionsParsed]);

  return (
    <mesh geometry={geom} castShadow receiveShadow position={[0, 0, 0]}>
      <meshStandardMaterial color={cor || "#0e52c2"} roughness={0.4} metalness={0.1} />
    </mesh>
  );
};

export default StlModel;
