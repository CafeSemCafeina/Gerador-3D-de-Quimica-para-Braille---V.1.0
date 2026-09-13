import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Bounds, Environment } from '@react-three/drei';
import StlModel from './StlModel';
import DimensionsOverlay from './DimensionsOverlay';
import iconeRotacao from '../../assets/icone-rotacao.svg';

/**
 * Visualizador 3D interativo compartilhado pelas abas "Gerador Braille" e "Blocos Iônicos": 
 * renderiza o STL, o overlay de dimensões e o botão de auto-rotação, com câmera/altura configuráveis por peça.
 */
const StlViewer3D = ({
  url, cor, dimensions, onDimensionsParsed, mostrarDimensoes, onToggleDimensoes,
  autoRotate, onToggleAutoRotate, height = 350, cameraPosition = [0, 50, 100],
  helpText = 'Arraste para girar • Role para aproximar • 2 cliques para ocultar dimensões'
}) => {
  return (
    <div
      aria-hidden="true"
      className="w-full bg-slate-900 rounded-lg overflow-hidden relative cursor-move"
      style={{ height }}
      onDoubleClick={onToggleDimensoes}
    >
      <DimensionsOverlay dimensions={dimensions} isVisible={mostrarDimensoes} />

      {/* Botão de rotação atualizado com a máscara SVG */}
      <button 
        onClick={onToggleAutoRotate} 
        className="absolute top-4 right-4 z-10 p-1 rounded-full shadow-lg transition-all duration-300 hover:scale-105" 
        style={{ 
          backgroundColor: autoRotate ? cor : 'transparent', // Fundo totalmente transparente quando inativo
          border: `2px solid ${cor}` 
        }}
        title={autoRotate ? "Parar rotação" : "Iniciar rotação"}
      >
        <div 
          className="w-12 h-12 transition-all duration-500" 
          style={{ 
            backgroundColor: autoRotate ? '#ffffff' : cor, // Ícone branco se ativo, pintado com a paleta se inativo
            maskImage: `url(${iconeRotacao})`, 
            WebkitMaskImage: `url(${iconeRotacao})`,
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center'
          }} 
        />
      </button>

      <Canvas shadows camera={{ position: cameraPosition, fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
          <Bounds fit clip observe margin={1.2}>
            <StlModel url={url} cor={cor} onDimensionsParsed={onDimensionsParsed} />
          </Bounds>
        </Suspense>
        <axesHelper args={[30]} />
        <gridHelper args={[200, 20, '#94a3b8', '#475569']} position={[0, 0, 0]} />
        <OrbitControls autoRotate={autoRotate} autoRotateSpeed={2.0} makeDefault enablePan={true} enableZoom={true} />
      </Canvas>

      <p className="absolute bottom-3 left-0 w-full text-center text-xs text-slate-300 font-medium pointer-events-none drop-shadow-md">{helpText}</p>
    </div>
  );
};

export default StlViewer3D;
