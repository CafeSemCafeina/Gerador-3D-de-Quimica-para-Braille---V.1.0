import { primitives, transforms, booleans } from '@jscad/modeling';

const { cuboid } = primitives;
const { translate } = transforms;
const { union } = booleans;

// Pilha de fontes CSS reais usada pelo Canvas 2D do navegador para rasterizar
// cada opção do seletor "Fonte do Texto". Como depende do sistema operacional
// do usuário, o navegador usa automaticamente a melhor opção instalada (ou um
// fallback da mesma família, ex: sans-serif) - não há arquivos de fonte
// embutidos no site.
export const MAPA_FONTES_CSS = {
  sans: 'Arial, "Helvetica Neue", sans-serif',
  serif: 'Georgia, "Times New Roman", serif',
  mono: '"Courier New", Courier, monospace',
  arial: '"Arial Black", Arial, sans-serif',
  himalaya: '"Microsoft Himalaya", sans-serif',
  helvetica: 'Helvetica, Arial, sans-serif',
  times: '"Times New Roman", Times, serif',
  courier: '"Courier New", Courier, monospace',
  verdana: 'Verdana, Geneva, sans-serif',
  georgia: 'Georgia, serif',
  tahoma: 'Tahoma, Geneva, sans-serif',
  comic: '"Comic Sans MS", "Comic Sans", cursive',
  impact: 'Impact, Haettenschweiler, sans-serif'
};

const RENDER_PX = 200;          // Altura de fonte usada na amostragem (px no canvas)
const TAMANHO_CELULA_MM = 0.35; // Resolução física da malha (~diâmetro de um bico de impressora 0.4mm)
const ENTRELINHA_FATOR = 1.35;  // Espaço vertical entre linhas, em múltiplos da altura do texto

/**
 * Rasteriza UMA linha de texto num canvas offscreen usando a fonte real do
 * navegador, e devolve os pixels "acesos" já agrupados em retângulos por
 * linha de varredura (para manter a contagem de formas 3D baixa).
 * Cada célula é conferida por área (não por amostragem esparsa), então
 * traços finos não são perdidos mesmo em resoluções físicas maiores.
 */
function rasterizarLinha(linha, fontFamily, alturaTextoMM) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = `bold ${RENDER_PX}px ${fontFamily}`;
  const metricsIniciais = ctx.measureText(linha);

  const margemPx = 12;
  const larguraPx = Math.max(1, Math.ceil(metricsIniciais.width) + margemPx * 2);
  const ascent = metricsIniciais.actualBoundingBoxAscent || RENDER_PX * 0.75;
  const descent = metricsIniciais.actualBoundingBoxDescent || RENDER_PX * 0.2;
  const alturaPx = Math.max(1, Math.ceil(ascent + descent) + margemPx * 2);

  canvas.width = larguraPx;
  canvas.height = alturaPx;
  // Redimensionar o canvas reseta o contexto 2D: a fonte precisa ser reaplicada.
  ctx.font = `bold ${RENDER_PX}px ${fontFamily}`;
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(linha, margemPx, ascent + margemPx);

  const { data } = ctx.getImageData(0, 0, larguraPx, alturaPx);
  const escalaPxParaMM = alturaTextoMM / RENDER_PX;
  const passoPx = Math.max(2, Math.round(TAMANHO_CELULA_MM / escalaPxParaMM));

  const celulaAcesa = (x, y) => {
    const xMax = Math.min(x + passoPx, larguraPx);
    const yMax = Math.min(y + passoPx, alturaPx);
    for (let yy = y; yy < yMax; yy++) {
      for (let xx = x; xx < xMax; xx++) {
        if (data[(yy * larguraPx + xx) * 4 + 3] > 128) return true;
      }
    }
    return false;
  };

  const retangulos = [];
  for (let y = 0; y < alturaPx; y += passoPx) {
    let xInicioRun = -1;
    for (let x = 0; x <= larguraPx; x += passoPx) {
      const acesa = x < larguraPx && celulaAcesa(x, y);
      if (acesa && xInicioRun === -1) xInicioRun = x;
      else if (!acesa && xInicioRun !== -1) { retangulos.push({ xIni: xInicioRun, xFim: x, y }); xInicioRun = -1; }
    }
  }
  if (retangulos.length === 0) return null;

  return { retangulos, larguraPx, alturaPx, escalaPxParaMM, passoPx };
}

/**
 * Gera a malha 3D (JSCAD) de um bloco de texto em relevo, usando a fonte do
 * sistema escolhida pelo usuário. Suporta múltiplas linhas (separadas por
 * "\n"), centralizadas entre si. A espessura da malha ao longo de Z é
 * sempre `Math.abs(espessura)`, centrada em Z=0 - quem chama esta função
 * decide para qual lado/direção posicionar o relevo (união ou subtração).
 *
 * Retorna { geometria, largura, altura } em milímetros, com origem no canto
 * inferior esquerdo do bloco de texto - ou null se não houver texto/pixels.
 */
export function gerarTextoRelevo({ texto, fonte = 'sans', alturaTextoMM = 6, espessura = 1.0 }) {
  const textoLimpo = (texto || '').replace(/\r/g, '');
  if (!textoLimpo.trim() || espessura === 0) return null;

  const fontFamily = MAPA_FONTES_CSS[fonte] || MAPA_FONTES_CSS.sans;
  const linhas = textoLimpo.split('\n');
  const zSize = Math.abs(espessura);
  const alturaLinhaMM = alturaTextoMM * ENTRELINHA_FATOR;

  // 1ª passada: rasteriza cada linha e descobre a largura da maior delas,
  // para que todas as linhas fiquem centralizadas entre si.
  const rasters = linhas.map(linha => (linha.trim() ? rasterizarLinha(linha, fontFamily, alturaTextoMM) : null));
  const larguraMaxima = rasters.reduce((max, r) => (r ? Math.max(max, r.larguraPx * r.escalaPxParaMM) : max), 0);
  if (larguraMaxima === 0) return null;

  // 2ª passada: converte cada retângulo rasterizado em um cuboide 3D já
  // posicionado (linhas centralizadas entre si, empilhadas de cima para baixo).
  const blocosLinhas = [];
  rasters.forEach((raster, indice) => {
    if (!raster) return;
    const { retangulos, escalaPxParaMM, passoPx, larguraPx, alturaPx } = raster;
    const larguraLinhaMM = larguraPx * escalaPxParaMM;
    const offsetXLinha = (larguraMaxima - larguraLinhaMM) / 2;
    const yBaseLinhaMM = (linhas.length - 1 - indice) * alturaLinhaMM;

    retangulos.forEach(r => {
      const larguraMM = (r.xFim - r.xIni) * escalaPxParaMM;
      const alturaBlocoMM = passoPx * escalaPxParaMM;
      const xCentroMM = offsetXLinha + (r.xIni * escalaPxParaMM) + (larguraMM / 2);
      const yCentroMM = yBaseLinhaMM + (alturaPx * escalaPxParaMM) - (r.y * escalaPxParaMM) - (alturaBlocoMM / 2);
      const bloco = cuboid({ size: [larguraMM, alturaBlocoMM, zSize] });
      blocosLinhas.push(translate([xCentroMM, yCentroMM, 0], bloco));
    });
  });

  if (blocosLinhas.length === 0) return null;

  return {
    geometria: union(...blocosLinhas),
    largura: larguraMaxima,
    altura: linhas.length * alturaLinhaMM
  };
}
