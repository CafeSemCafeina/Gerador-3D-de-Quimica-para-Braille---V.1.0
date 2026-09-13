import { gerarStlBuffer } from '../utils/stlBuffer';

self.onmessage = (evento) => {
  const { id, kind, payload } = evento.data || {};
  try {
    const stl = gerarStlBuffer(kind, payload);
    self.postMessage({ id, ok: true, stl }, [stl]);
  } catch (erro) {
    self.postMessage({ id, ok: false, error: erro?.message || String(erro) });
  }
};
