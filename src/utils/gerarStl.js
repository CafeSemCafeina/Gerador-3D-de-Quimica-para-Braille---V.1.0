import { gerarStlBuffer } from './stlBuffer';

let worker = null;
let proximoId = 1;
const pendentes = new Map();

function obterWorker() {
  if (worker) return worker;
  if (typeof Worker === 'undefined') return null;
  try {
    worker = new Worker(new URL('../workers/stlWorker.js', import.meta.url), { type: 'module' });
  } catch {
    return null;
  }

  worker.onmessage = (evento) => {
    const { id, ok, stl, error } = evento.data || {};
    const trabalho = pendentes.get(id);
    if (!trabalho) return;
    pendentes.delete(id);
    if (ok) trabalho.resolve(stl);
    else trabalho.reject(new Error(error || 'Falha ao gerar STL'));
  };

  worker.onerror = (evento) => {
    const erro = new Error(evento.message || 'Erro no worker de STL');
    for (const trabalho of pendentes.values()) trabalho.reject(erro);
    pendentes.clear();
    worker.terminate();
    worker = null;
  };

  return worker;
}

export function gerarStlAssincrono(kind, payload) {
  const atual = obterWorker();
  if (!atual) return Promise.resolve(gerarStlBuffer(kind, payload));

  return new Promise((resolve, reject) => {
    const id = proximoId++;
    pendentes.set(id, { resolve, reject });
    try {
      atual.postMessage({ id, kind, payload });
    } catch {
      pendentes.delete(id);
      try {
        resolve(gerarStlBuffer(kind, payload));
      } catch (fallback) {
        reject(fallback);
      }
    }
  });
}

export function criarUrlStl(buffer) {
  return URL.createObjectURL(new Blob([buffer], { type: 'model/stl' }));
}
