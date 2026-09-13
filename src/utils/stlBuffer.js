import { serialize } from '@jscad/stl-serializer';
import { gerarModeloJSCAD, geradorBlocoIonicoJSCAD } from '../braille3d';

export function montarModelo(kind, payload) {
  if (kind === 'braille') {
    return gerarModeloJSCAD(payload.cells, payload.config, payload.textoVerso);
  }
  if (kind === 'ionico') {
    return geradorBlocoIonicoJSCAD(payload);
  }
  throw new Error(`Tipo de malha desconhecido: ${kind}`);
}

export function serializarStl(modelo) {
  if (!modelo) throw new Error('Modelo 3D vazio');
  const partes = serialize({ binary: true }, modelo);
  const chunks = partes.map((parte) => {
    if (parte instanceof ArrayBuffer) return new Uint8Array(parte);
    if (ArrayBuffer.isView(parte)) return new Uint8Array(parte.buffer, parte.byteOffset, parte.byteLength);
    if (typeof parte === 'string') return new TextEncoder().encode(parte);
    throw new Error('Formato STL inesperado');
  });
  const total = chunks.reduce((n, chunk) => n + chunk.byteLength, 0);
  const saida = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    saida.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return saida.buffer;
}

export function gerarStlBuffer(kind, payload) {
  return serializarStl(montarModelo(kind, payload));
}
