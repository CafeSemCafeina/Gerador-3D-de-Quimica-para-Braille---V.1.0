import { primitives, transforms, booleans, text } from '@jscad/modeling';
import { serialize } from '@jscad/stl-serializer';
import { gerarTextoRelevo } from './textoRelevo3d';

const { cuboid, roundedCuboid, sphere, cylinder } = primitives;
const { translate, rotateZ, scale } = transforms;
const { union, subtract } = booleans;
const { vectorText } = text;

function calcularRaioEsfera(diametroBase, alturaCalota) {
  const raioBase = diametroBase / 2.0;
  return (Math.pow(raioBase, 2) + Math.pow(alturaCalota, 2)) / (2 * alturaCalota);
}

// ============================================================================
// GERADOR ORIGINAL BRAILLE (MANTIDO)
// ============================================================================
export function gerarModeloJSCAD(cells, config = {}, textoVerso = null) {
  if (!cells || cells.length === 0) return null;

  const ALTURA_PONTO = config.alturaPonto !== undefined ? parseFloat(config.alturaPonto) : 0.75;
  const DIAMETRO_PONTO = config.diametroPonto !== undefined ? parseFloat(config.diametroPonto) : 1.9;
  const ESPESSURA_PLACA = config.espessuraPlaca !== undefined ? parseFloat(config.espessuraPlaca) : 5.0;
  const DIST_PONTOS_X = config.distPontos !== undefined ? parseFloat(config.distPontos) : 2.5;
  const DIST_PONTOS_Y = config.distPontos !== undefined ? parseFloat(config.distPontos) : 2.5;
  const DIST_CELAS = config.distCelas !== undefined ? parseFloat(config.distCelas) : 6.0;
  const DIST_LINHAS = config.distLinhas !== undefined ? parseFloat(config.distLinhas) : 10.0;
  const MARGEM = config.margem !== undefined ? parseFloat(config.margem) : 2.0;
  const RAIO_BORDA = config.borda !== undefined ? parseFloat(config.borda) : 0.0;

  const COORDS_PONTO = {
    1: [0, 2 * DIST_PONTOS_Y], 2: [0, DIST_PONTOS_Y], 3: [0, 0],
    4: [DIST_PONTOS_X, 2 * DIST_PONTOS_Y], 5: [DIST_PONTOS_X, DIST_PONTOS_Y], 6: [DIST_PONTOS_X, 0]
  };

  const raioEsfera = calcularRaioEsfera(DIAMETRO_PONTO, ALTURA_PONTO);
  let zOffset = ESPESSURA_PLACA > 0 ? ESPESSURA_PLACA - (raioEsfera - ALTURA_PONTO) : raioEsfera;

  let maxCols = 0; let currentCol = 0; let numLines = 1;
  cells.forEach(cell => {
    if (cell.isNewline) { numLines++; currentCol = 0; }
    else { currentCol++; if (currentCol > maxCols) maxCols = currentCol; }
  });

  const textoW = maxCols > 0 ? ((maxCols - 1) * DIST_CELAS) + DIST_PONTOS_X : 0;
  const textoH = ((numLines - 1) * DIST_LINHAS) + (2 * DIST_PONTOS_Y);
  const comprimentoPlaca = textoW + (2 * MARGEM);
  const larguraPlaca = textoH + (2 * MARGEM);

  let placa = null;
  if (ESPESSURA_PLACA > 0) {
    if (RAIO_BORDA > 0) {
      const maxRadius = Math.min(comprimentoPlaca / 2, larguraPlaca / 2, ESPESSURA_PLACA / 2) - 0.01;
      const safeRadius = Math.min(RAIO_BORDA, maxRadius);
      placa = roundedCuboid({ size: [comprimentoPlaca, larguraPlaca, ESPESSURA_PLACA], roundRadius: safeRadius, segments: 32 });
    } else {
      placa = cuboid({ size: [comprimentoPlaca, larguraPlaca, ESPESSURA_PLACA] });
    }
    placa = translate([comprimentoPlaca / 2, larguraPlaca / 2, ESPESSURA_PLACA / 2], placa);
  }

  const formasPontos = [];
  let currentXIndex = 0; let currentYIndex = 0;
  cells.forEach((cell) => {
    if (cell.isNewline) { currentYIndex++; currentXIndex = 0; return; }
    const xOffsetCela = MARGEM + (currentXIndex * DIST_CELAS);
    const yOffsetCela = MARGEM + ((numLines - 1 - currentYIndex) * DIST_LINHAS);

    if (cell.dots && cell.dots.length > 0) {
      cell.dots.forEach(numeroDoPonto => {
        const [px, py] = COORDS_PONTO[numeroDoPonto];
        let ponto = sphere({ radius: raioEsfera, segments: 32 });
        ponto = translate([xOffsetCela + px, yOffsetCela + py, zOffset], ponto);
        formasPontos.push(ponto);
      });
    }
    currentXIndex++;
  });

  let malhaBraille = placa ? union(placa, ...formasPontos) : union(...formasPontos);

  // ==========================================================================
  // TEXTO EM RELEVO NO VERSO (opcional): grava o texto/fórmula original em
  // letras comuns (usando a fonte do sistema escolhida) no lado de trás da
  // placa, tornando a peça legível também para pessoas videntes.
  // Só é possível gravar/relevar algo se existir uma placa (ESPESSURA_PLACA > 0).
  // ==========================================================================
  if (textoVerso && textoVerso.ativo && textoVerso.texto && textoVerso.texto.trim() && ESPESSURA_PLACA > 0) {
    const espessuraBruta = parseFloat(textoVerso.espessura ?? 1.0);

    // Limita a profundidade de gravação (relevo negativo) para sempre sobrar
    // ao menos ~0.6mm de placa sólida, protegendo os pontos Braille da frente.
    const profundidadeMaxima = Math.max(ESPESSURA_PLACA - 0.6, 0.2);
    const espessuraTexto = espessuraBruta < 0 ? -Math.min(Math.abs(espessuraBruta), profundidadeMaxima) : espessuraBruta;

    if (espessuraTexto !== 0) {
      const resultadoTexto = gerarTextoRelevo({
        texto: textoVerso.texto,
        fonte: textoVerso.fonte,
        alturaTextoMM: parseFloat(textoVerso.tamanho ?? 6),
        espessura: espessuraTexto
      });

      if (resultadoTexto && resultadoTexto.geometria) {
        // Reduz o texto proporcionalmente se ele não couber na placa (nunca amplia).
        const margemTexto = Math.min(MARGEM, 2.0);
        const larguraDisponivel = comprimentoPlaca - (2 * margemTexto);
        const alturaDisponivel = larguraPlaca - (2 * margemTexto);

        let fatorEscala = 1;
        if (larguraDisponivel > 0 && resultadoTexto.largura > larguraDisponivel) fatorEscala = Math.min(fatorEscala, larguraDisponivel / resultadoTexto.largura);
        if (alturaDisponivel > 0 && resultadoTexto.altura > alturaDisponivel) fatorEscala = Math.min(fatorEscala, alturaDisponivel / resultadoTexto.altura);

        let geometriaTexto = resultadoTexto.geometria;
        if (fatorEscala < 1) geometriaTexto = scale([fatorEscala, fatorEscala, 1], geometriaTexto);

        // Centraliza o bloco de texto no verso da placa (face Z=0).
        const larguraFinal = resultadoTexto.largura * fatorEscala;
        const alturaFinal = resultadoTexto.altura * fatorEscala;

        // Espelha verticalmente (mantendo a esquerda/direita intactas): o
        // bloco físico é lido virando-o 180° no eixo X (Braille passa a
        // ficar voltado para baixo). Essa rotação física inverte o eixo Y
        // do que está gravado no verso: sem este espelhamento aqui no
        // modelo, o texto apareceria de cabeça para baixo depois de virado.
        geometriaTexto = translate([0, alturaFinal, 0], scale([1, -1, 1], geometriaTexto));

        const offsetX = (comprimentoPlaca - larguraFinal) / 2;
        const offsetY = (larguraPlaca - alturaFinal) / 2;
        // Relevo positivo: bloco inteiramente fora da placa (Z < 0), unido.
        // Relevo negativo: bloco inteiramente dentro da placa, subtraído.
        const zPos = espessuraTexto > 0 ? -(espessuraTexto / 2) : (Math.abs(espessuraTexto) / 2);

        geometriaTexto = translate([offsetX, offsetY, zPos], geometriaTexto);
        malhaBraille = espessuraTexto > 0 ? union(malhaBraille, geometriaTexto) : subtract(malhaBraille, geometriaTexto);
      }
    }
  }

  return malhaBraille;
}

// ============================================================================
// NOVO: GERADOR PARA BLOCOS IÔNICOS (COM ENCAIXES E TEXTO 3D MELHORADO)
// ============================================================================
export function geradorBlocoIonicoJSCAD(params) {
  const {
    tipo = 'cation',      // 'cation' | 'anion'
    valencia = 1,         // 1, 2, 3, 4
    largura = 55.9,       // Largura base (X)
    altura = 25.0,        // Altura por carga (Y) -> Altura total = altura * valencia
    espessura = 5.0,      // Espessura da placa (Z)
    larguraEncaixe = 9.1, // Largura do pino/rasgo
    alturaEncaixe = 11.0, // Altura do pino/rasgo
    formula = "H3O+",     
    espessuraTexto = 1.0, 
    incluirBraille = false,
    cellsBraille = []
  } = params;

  // Altura total varia com a valência (empilhamento)
  const qtdEncaixes = Math.min(Math.max(valencia, 1), 4);
  const alturaTotal = altura * qtdEncaixes;

  // 1. Cria o bloco base principal
  let blocoBase = cuboid({ size: [largura, alturaTotal, espessura] });
  // Posicionamos a base partindo de X=0, Y=0
  blocoBase = translate([largura / 2, alturaTotal / 2, espessura / 2], blocoBase);

  // 2. Geração dos Encaixes
  const encaixes = [];
  
  for (let i = 0; i < qtdEncaixes; i++) {
    // Centro Y de cada "sub-bloco" de carga
    const posY = (i * altura) + (altura / 2);
    
    if (tipo === 'cation') {
      // Macho: Projeta para fora no lado direito
      let pino = cuboid({ size: [larguraEncaixe, alturaEncaixe, espessura] });
      pino = translate([largura + (larguraEncaixe / 2) - 0.05, posY, espessura / 2], pino);
      encaixes.push(pino);
    } else {
      // Fêmea: Subtrai do lado esquerdo. Ganha folga (+0.15mm) para encaixar o macho perfeito.
      let buraco = cuboid({ size: [larguraEncaixe + 0.15, alturaEncaixe + 0.15, espessura + 2] });
      buraco = translate([(larguraEncaixe / 2) - 0.05, posY, espessura / 2], buraco);
      encaixes.push(buraco);
    }
  }

  let malhaFinal = tipo === 'cation' ? union(blocoBase, ...encaixes) : subtract(blocoBase, ...encaixes);

  // 3. Processamento de Texto Vectorial Robusto
  const parseFormulaVetorial = (str) => {
    const elementos = [];
    let xOffset = 0;
    const escalaNormal = 0.40;
    const escalaPequena = 0.25;
    const grossuraLinha = 1.6; // Deixa a fonte gordinha e legível
    const zSize = Math.abs(espessuraTexto);

    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      let isSub = /[₀-₉]/.test(char);
      let isSup = /[⁺⁻⁰⁻⁹]/.test(char) || (i === str.length - 1 && /[+-]/.test(char));
      let escala = (isSub || isSup) ? escalaPequena : escalaNormal;
      let yOffset = isSub ? -3.0 : (isSup ? 4.0 : 0);

      const subMap = { '₀':'0', '₁':'1', '₂':'2', '₃':'3', '₄':'4', '₅':'5', '₆':'6', '₇':'7', '₈':'8', '₉':'9' };
      const supMap = { '⁺':'+', '⁻':'-', '⁰':'0', '¹':'1', '²':'2', '³':'3', '⁴':'4', '⁵':'5', '⁶':'6', '⁷':'7', '⁸':'8', '⁹':'9' };
      let charClean = subMap[char] || supMap[char] || char;

      let vetorChar = vectorText({ x: 0, y: 0, input: charClean });
      
      let hastesChar = [];
      vetorChar.forEach(segmento => {
        const p1 = segmento[0]; const p2 = segmento[1];
        const dist = Math.hypot(p2[0] - p1[0], p2[1] - p1[1]);
        const angulo = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);
        
        // Cuboide rotacionado para formar a linha
        let haste = cuboid({ size: [dist, grossuraLinha, zSize] });
        haste = translate([dist/2, 0, 0], haste);
        haste = rotateZ(angulo, haste);
        haste = translate([p1[0] * escala + xOffset, p1[1] * escala + yOffset, 0], haste);
        
        // Cilindros nas pontas para arredondar cantos e fechar buracos da fonte
        let junta1 = translate([p1[0] * escala + xOffset, p1[1] * escala + yOffset, 0], cylinder({ radius: grossuraLinha/2, height: zSize, segments: 16 }));
        let junta2 = translate([p2[0] * escala + xOffset, p2[1] * escala + yOffset, 0], cylinder({ radius: grossuraLinha/2, height: zSize, segments: 16 }));

        hastesChar.push(haste, junta1, junta2);
      });

      if (hastesChar.length > 0) {
        elementos.push(union(...hastesChar));
      }
      xOffset += (isSub || isSup) ? 6.0 : 9.5; // Espaçamento entre letras
    }
    return { geometria: elementos.length > 0 ? union(...elementos) : null, larguraTotal: xOffset };
  };

  const objTexto = parseFormulaVetorial(formula);
  let geometriaConteudo = [];

  // Centro Visual da peça
  // Se for ânion, a parte esquerda está cavada, então o centro real da área "escrevível" muda ligeiramente
  const centroXVisual = tipo === 'anion' ? (largura + larguraEncaixe) / 2 : largura / 2;
  
  let larguraTotalConteudo = objTexto.larguraTotal;
  let brailleW = 0;
  
  if (incluirBraille && cellsBraille.length > 0) {
    brailleW = cellsBraille.length * 6.0;
    larguraTotalConteudo = Math.max(larguraTotalConteudo, brailleW);
  }

  // Alinhamento
  const startX = centroXVisual - (objTexto.larguraTotal / 2);
  const startY = incluirBraille ? (alturaTotal / 2) + 4 : (alturaTotal / 2) - 2;

  if (objTexto.geometria) {
    let zPos = espessuraTexto >= 0 ? espessura + (espessuraTexto / 2) : espessura - (Math.abs(espessuraTexto) / 2);
    let textoAlinhado = translate([startX, startY, zPos], objTexto.geometria);
    geometriaConteudo.push(textoAlinhado);
  }

  // 4. Adiciona o Braille se requisitado
  if (incluirBraille && cellsBraille.length > 0) {
    const ALTURA_PONTO = 0.75;
    const DIAMETRO_PONTO = 1.8;
    const DIST_CELAS = 6.0;
    const DIST_PONTOS_X = 2.5; const DIST_PONTOS_Y = 2.5;
    const COORDS_PONTO = {
      1: [0, 2 * DIST_PONTOS_Y], 2: [0, DIST_PONTOS_Y], 3: [0, 0],
      4: [DIST_PONTOS_X, 2 * DIST_PONTOS_Y], 5: [DIST_PONTOS_X, DIST_PONTOS_Y], 6: [DIST_PONTOS_X, 0]
    };
    const raioEsfera = calcularRaioEsfera(DIAMETRO_PONTO, ALTURA_PONTO);
    let zOffset = espessuraTexto >= 0 ? espessura - (raioEsfera - ALTURA_PONTO) : espessura - Math.abs(espessuraTexto);

    const pontinhos = [];
    let currentXIndex = 0;
    const brailleStartX = centroXVisual - (brailleW / 2) + 1.25;
    const brailleStartY = (alturaTotal / 2) - 10;

    cellsBraille.forEach(cell => {
      if (cell.dots && cell.dots.length > 0) {
        cell.dots.forEach(num => {
          const [px, py] = COORDS_PONTO[num];
          let ponto = sphere({ radius: raioEsfera, segments: 24 });
          ponto = translate([brailleStartX + (currentXIndex * DIST_CELAS) + px, brailleStartY + py, zOffset], ponto);
          pontinhos.push(ponto);
        });
      }
      currentXIndex++;
    });
    if (pontinhos.length > 0) geometriaConteudo.push(union(...pontinhos));
  }

  // 5. União ou Subtração com o Bloco principal
  if (geometriaConteudo.length > 0) {
    const malhaConteudo = union(...geometriaConteudo);
    if (espessuraTexto < 0) {
      malhaFinal = subtract(malhaFinal, malhaConteudo);
    } else {
      malhaFinal = union(malhaFinal, malhaConteudo);
    }
  }

  // Centraliza o modelo inteiro para o exportador STL ficar no meio da mesa
  let centroY = alturaTotal / 2;
  let centroX = (largura + (tipo === 'cation' ? larguraEncaixe : 0)) / 2;
  malhaFinal = translate([-centroX, -centroY, 0], malhaFinal);

  return malhaFinal;
}

export function gerarUrlSTL(modelo3D) {
  if (!modelo3D) return null;
  const stlDados = serialize({ binary: true }, modelo3D);
  const blob = new Blob(stlDados, { type: 'model/stl' });
  return URL.createObjectURL(blob);
}

export function baixarArquivoSTL(url, nomeArquivo = 'formula_braille.stl') {
  if (!url) return;
  const link = document.createElement('a');
  link.href = url;
  link.download = nomeArquivo;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
