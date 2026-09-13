import * as THREE from 'three';
import { STLLoader, STLExporter } from 'three-stdlib';

/**
 * Recarrega a malha STL gerada, reorienta para posição de impressão
 * (deitada, centralizada e apoiada em Z=0) e dispara o download do arquivo
 * .stl final no navegador do usuário.
 */
export const baixarModeloSTL = (urlModelo, nomeArquivo) => {
  if (!urlModelo) return;

  const loader = new STLLoader();
  loader.load(urlModelo, (geometry) => {
    geometry.rotateX(Math.PI / 2);
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    const centerX = (box.max.x + box.min.x) / 2;
    const centerY = (box.max.y + box.min.y) / 2;
    geometry.translate(-centerX, -centerY, -box.min.z);

    const mesh = new THREE.Mesh(geometry);
    const exporter = new STLExporter();
    const stlString = exporter.parse(mesh);

    const blob = new Blob([stlString], { type: 'text/plain' });
    const downloadUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(downloadUrl);
  });
};
