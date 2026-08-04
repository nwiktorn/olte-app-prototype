/* OLTE App — wykres dobowy dla ekranów historii.
   Dane godzinowe 00–24. Przełącznik Temperatura / Wilgotność przerysowuje
   wykres, legendę i wartość średnią w miejscu. */
(function () {
  /* Dane bazowe pomieszczenia „Sypialnia AJ" — profil referencyjny, dobowy
     przebieg z nasłonecznieniem w godz. 9–17 i spadkiem w nocy. */
  var ROOM_SERIES = {
    'sypialnia-aj': {
      temperatura: {
        label: 'Temperatura', color: 'var(--app-1)', dotColor: 'var(--app-1)',
        avg: '22,8', avgUnit: '°C śr.', range: 'min 18,8° · max 23,2°', domain: [18, 24],
        values: [22.8, 22.5, 22.0, 21.2, 20.0, 19.0, 18.8, 20.8, 22.6, 23.0,
                 23.1, 23.2, 23.2, 23.1, 23.2, 23.2, 23.1, 23.0, 23.0, 22.9,
                 23.0, 23.1, 23.0, 22.9, 22.8],
        cards: [
          { icon: 'sun', tone: 'sun', color: 'var(--app-1)', value: '+1,8 °C', label: 'Dzienny zysk słoneczny' },
          { icon: 'flame', tone: 'good', color: 'var(--accent)', value: '2 h', label: 'Krótsze ogrzewanie' }
        ]
      },
      wilgotnosc: {
        label: 'Wilgotność', color: 'var(--status-info)', dotColor: 'var(--status-info)',
        avg: '54', avgUnit: '% śr.', range: 'min 46% · max 61%', domain: [42, 64],
        values: [52, 51, 50, 49, 48, 47, 46, 52, 61, 59, 56, 54, 53, 52, 52,
                 53, 54, 56, 58, 60, 59, 57, 55, 54, 53],
        cards: [
          { icon: 'droplets', tone: 'hum', color: 'var(--status-info)', value: '+15 pp', label: 'Wzrost po prysznicu 07:00' },
          { icon: 'fan', tone: 'good', color: 'var(--accent)', value: '38 min', label: 'Praca wentylacji dobowo' }
        ]
      }
    },
    /* Salon AJ — duży metraż, stabilny, mocny zysk słoneczny po południu (okna na zachód) */
    'salon-aj': {
      temperatura: {
        label: 'Temperatura', color: 'var(--app-1)', dotColor: 'var(--app-1)',
        avg: '23,1', avgUnit: '°C śr.', range: 'min 21,6° · max 24,6°', domain: [20, 26],
        values: [22.2, 22.0, 21.8, 21.6, 21.6, 21.7, 21.8, 22.2, 22.8, 23.2,
                 23.6, 24.0, 24.3, 24.5, 24.6, 24.5, 24.2, 23.8, 23.4, 23.1,
                 22.9, 22.7, 22.5, 22.3, 22.2],
        cards: [
          { icon: 'sun', tone: 'sun', color: 'var(--app-1)', value: '+2,6 °C', label: 'Zysk słoneczny po południu' },
          { icon: 'flame', tone: 'good', color: 'var(--accent)', value: '3 h', label: 'Krótsze ogrzewanie' }
        ]
      },
      wilgotnosc: {
        label: 'Wilgotność', color: 'var(--status-info)', dotColor: 'var(--status-info)',
        avg: '47', avgUnit: '% śr.', range: 'min 42% · max 53%', domain: [38, 58],
        values: [45, 44, 44, 43, 42, 42, 43, 45, 47, 48, 49, 50, 51, 52, 53,
                 52, 51, 50, 49, 48, 47, 46, 46, 45, 45],
        cards: [
          { icon: 'droplets', tone: 'hum', color: 'var(--status-info)', value: '+11 pp', label: 'Wzrost przy gotowaniu w kuchni otwartej' },
          { icon: 'fan', tone: 'good', color: 'var(--accent)', value: '22 min', label: 'Praca wentylacji dobowo' }
        ]
      }
    },
    /* Łazienka — szpilka wilgotności po prysznicu, temperatura ponad normą w programie porannym;
       okno otwarte 06:15–06:35 po prysznicu wstrzymuje grzanie na 20 min (M-06) */
    'lazienka': {
      temperatura: {
        label: 'Temperatura', color: 'var(--app-1)', dotColor: 'var(--app-1)',
        avg: '23,4', avgUnit: '°C śr.', range: 'min 20,2° · max 24,8°', domain: [19, 26],
        values: [21.0, 20.6, 20.2, 20.2, 20.4, 21.5, 24.6, 24.8, 24.5, 23.8,
                 23.2, 22.8, 22.6, 22.5, 22.6, 22.8, 23.0, 24.4, 24.6, 24.2,
                 23.4, 22.6, 21.8, 21.2, 21.0],
        windowEvent: { fromH: 6.25, toH: 6.6, label: 'okno otwarte' },
        cards: [
          { icon: 'flame', tone: 'amber', color: 'var(--on-warning)', value: '+0,7 °C', label: 'Ponad górną granicą komfortu' },
          { icon: 'clock', tone: 'hum', color: 'var(--status-info)', value: '2×', label: 'Programy poranny i wieczorny' }
        ]
      },
      wilgotnosc: {
        label: 'Wilgotność', color: 'var(--status-info)', dotColor: 'var(--status-info)',
        avg: '58', avgUnit: '% śr.', range: 'min 44% · max 86%', domain: [40, 90],
        values: [46, 45, 44, 44, 45, 62, 86, 78, 64, 56, 52, 50, 49, 48, 48,
                 49, 50, 68, 80, 70, 58, 52, 49, 47, 46],
        cards: [
          { icon: 'droplets', tone: 'hum', color: 'var(--status-info)', value: '+42 pp', label: 'Szpilka po prysznicu 06:30 i 19:30' },
          { icon: 'fan', tone: 'amber', color: 'var(--on-warning)', value: '1 h 10', label: 'Wentylacja pracowała dłużej niż zwykle' }
        ]
      }
    },
    /* Kuchnia — wzrost temperatury i wilgotności w oknach posiłków (gotowanie) */
    'kuchnia': {
      temperatura: {
        label: 'Temperatura', color: 'var(--app-1)', dotColor: 'var(--app-1)',
        avg: '22,3', avgUnit: '°C śr.', range: 'min 20,8° · max 24,1°', domain: [19, 26],
        values: [21.2, 21.0, 20.9, 20.8, 20.9, 21.4, 22.6, 22.2, 21.6, 21.4,
                 21.6, 23.4, 24.1, 23.0, 21.8, 21.6, 21.8, 22.6, 24.0, 23.2,
                 22.0, 21.6, 21.4, 21.3, 21.2],
        cards: [
          { icon: 'cooking-pot', tone: 'amber', color: 'var(--on-warning)', value: '+1,6 °C', label: 'Wzrost przy obiedzie i kolacji' },
          { icon: 'flame', tone: 'good', color: 'var(--accent)', value: '1 h 40', label: 'Krótsze ogrzewanie' }
        ]
      },
      wilgotnosc: {
        label: 'Wilgotność', color: 'var(--status-info)', dotColor: 'var(--status-info)',
        avg: '46', avgUnit: '% śr.', range: 'min 41% · max 58%', domain: [36, 62],
        values: [43, 42, 42, 41, 42, 44, 52, 47, 44, 43, 44, 55, 58, 48, 44,
                 43, 44, 47, 56, 50, 45, 44, 43, 43, 43],
        cards: [
          { icon: 'droplets', tone: 'hum', color: 'var(--status-info)', value: '+16 pp', label: 'Para wodna przy gotowaniu' },
          { icon: 'fan', tone: 'good', color: 'var(--accent)', value: '54 min', label: 'Praca okapu i wentylacji' }
        ]
      }
    },
    /* Gabinet — tryb eco, płasko, ciepło własne od sprzętu komputerowego */
    'gabinet': {
      temperatura: {
        label: 'Temperatura', color: 'var(--app-1)', dotColor: 'var(--app-1)',
        avg: '20,3', avgUnit: '°C śr.', range: 'min 18,9° · max 21,6°', domain: [17, 23],
        values: [19.0, 18.9, 18.9, 18.9, 19.0, 19.2, 19.6, 20.2, 20.8, 21.2,
                 21.4, 21.5, 21.6, 21.5, 21.4, 21.3, 21.0, 20.6, 20.1, 19.6,
                 19.3, 19.1, 19.0, 19.0, 19.0],
        cards: [
          { icon: 'cpu', tone: 'sun', color: 'var(--app-1)', value: '+0,6 °C', label: 'Ciepło własne sprzętu w godz. pracy' },
          { icon: 'leaf', tone: 'good', color: 'var(--accent)', value: '4 h', label: 'Grzanie wstrzymane w trybie eco' }
        ]
      },
      wilgotnosc: {
        label: 'Wilgotność', color: 'var(--status-info)', dotColor: 'var(--status-info)',
        avg: '42', avgUnit: '% śr.', range: 'min 39% · max 45%', domain: [34, 50],
        values: [41, 41, 40, 40, 40, 40, 41, 42, 43, 44, 45, 45, 44, 44, 43,
                 43, 42, 42, 41, 41, 40, 40, 40, 40, 41],
        cards: [
          { icon: 'droplets', tone: 'hum', color: 'var(--status-info)', value: '+5 pp', label: 'Niewielki wzrost w ciągu dnia' },
          { icon: 'fan', tone: 'good', color: 'var(--accent)', value: '0 min', label: 'Wentylacja nie była potrzebna' }
        ]
      }
    },
    /* Sypialnia Ala — pokój dziecięcy, stabilny, lekki spadek nocny kontrolowany */
    'sypialnia-ala': {
      temperatura: {
        label: 'Temperatura', color: 'var(--app-1)', dotColor: 'var(--app-1)',
        avg: '22,6', avgUnit: '°C śr.', range: 'min 21,4° · max 23,3°', domain: [19, 25],
        values: [22.6, 22.2, 21.8, 21.5, 21.4, 21.6, 22.0, 22.6, 23.0, 23.2,
                 23.3, 23.2, 23.1, 23.0, 23.0, 23.1, 23.1, 23.0, 22.9, 22.8,
                 22.8, 22.7, 22.7, 22.6, 22.6],
        cards: [
          { icon: 'sun', tone: 'sun', color: 'var(--app-1)', value: '+1,1 °C', label: 'Dzienny zysk słoneczny' },
          { icon: 'flame', tone: 'good', color: 'var(--accent)', value: '1 h 30', label: 'Krótsze ogrzewanie' }
        ]
      },
      wilgotnosc: {
        label: 'Wilgotność', color: 'var(--status-info)', dotColor: 'var(--status-info)',
        avg: '46', avgUnit: '% śr.', range: 'min 43% · max 50%', domain: [38, 56],
        values: [45, 44, 44, 44, 43, 43, 44, 45, 46, 47, 48, 49, 50, 49, 48,
                 47, 47, 46, 46, 45, 45, 45, 45, 45, 45],
        cards: [
          { icon: 'droplets', tone: 'hum', color: 'var(--status-info)', value: '+7 pp', label: 'Lekki wzrost w środku dnia' },
          { icon: 'fan', tone: 'good', color: 'var(--accent)', value: '18 min', label: 'Praca wentylacji dobowo' }
        ]
      }
    }
  };

  /* Zgodność wsteczna: window.OLTE_ROOM nieustawione → profil bazowy Sypialni AJ. */
  var SERIES = ROOM_SERIES[window.OLTE_ROOM || 'sypialnia-aj'] || ROOM_SERIES['sypialnia-aj'];
  Object.keys(SERIES).forEach(function (key) {
    SERIES[key].fmt = key === 'wilgotnosc'
      ? function (v) { return Math.round(v) + '%'; }
      : function (v) { return v.toFixed(1).replace('.', ',') + '°'; };
  });

  var W = 295, H = 130, TOP = 8, BOT = 108;
  var TT_W = 84, TT_H = 40; /* wymiary bąbla tooltipa */

  function pts(s) {
    var lo = s.domain[0], hi = s.domain[1];
    return s.values.map(function (v, i) {
      return [
        (i / (s.values.length - 1)) * W,
        BOT - ((v - lo) / (hi - lo)) * (BOT - TOP)
      ];
    });
  }

  /* Catmull-Rom → krzywe Béziera, żeby linia była gładka jak w Figmie */
  function smooth(p) {
    var d = 'M' + p[0][0].toFixed(1) + ' ' + p[0][1].toFixed(1);
    for (var i = 0; i < p.length - 1; i++) {
      var p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
      var c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
      var c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d += 'C' + c1x.toFixed(1) + ' ' + c1y.toFixed(1) + ',' +
                 c2x.toFixed(1) + ' ' + c2y.toFixed(1) + ',' +
                 p2[0].toFixed(1) + ' ' + p2[1].toFixed(1);
    }
    return d;
  }

  /* Etykieta godziny dla punktu o indeksie i (0–24 → "00:00"…"24:00") */
  function hourLabel(i) {
    var h = i % 24;
    return (h < 10 ? '0' + h : '' + h) + ':00';
  }

  /* Pozycja i markup bąbla tooltipa dla punktu (px,py), przypięty tak,
     żeby nigdy nie wychodził poza szerokość viewBox (0..W) ani ponad
     zarezerwowany pas nad wykresem (TOP_PAD..). */
  function tooltipMarkup(s, i, px, py) {
    var tx = Math.min(Math.max(px - TT_W / 2, 2), W - TT_W - 2);
    var above = (py - TT_H - 14) >= 2;
    var below = !above && (py + 14 + TT_H) <= H - 2;
    var ty = above ? (py - TT_H - 14) : (below ? (py + 14) : 2);
    var lineY1 = above ? (ty + TT_H) : (below ? py - 6 : ty);
    var lineY2 = above ? (py - 6) : (below ? ty : py + 6);
    var text = s.fmt(s.values[i]);
    var hour = hourLabel(i);
    return (
      '<g id="chart-tip" pointer-events="none">' +
        '<rect x="' + tx.toFixed(1) + '" y="' + ty.toFixed(1) + '" width="' + TT_W + '" height="' + TT_H +
          '" rx="9" style="fill:var(--n-900);opacity:.92"/>' +
        '<text x="' + (tx + TT_W / 2).toFixed(1) + '" y="' + (ty + 17).toFixed(1) +
          '" text-anchor="middle" style="fill:var(--n-0);font-family:var(--font-display);font-weight:800;font-size:14px">' + text + '</text>' +
        '<text x="' + (tx + TT_W / 2).toFixed(1) + '" y="' + (ty + 31).toFixed(1) +
          '" text-anchor="middle" style="fill:var(--n-200);font-family:var(--font-body);font-size:10px">' + hour + '</text>' +
        '<line x1="' + px.toFixed(1) + '" y1="' + lineY1.toFixed(1) + '" x2="' + px.toFixed(1) + '" y2="' + lineY2.toFixed(1) +
          '" style="stroke:var(--n-900);stroke-width:1;opacity:.5"/>' +
        '<circle cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="3.5" style="fill:' + s.dotColor + '"/>' +
      '</g>'
    );
  }

  /* Rysuje/usuwa bąbel tooltipa nad punktem o indeksie i; aktualizuje
     aria-live tak, że czytnik ekranu ogłasza wartość po klawiaturze. */
  function showTip(svg, s, p, i) {
    var prev = svg.querySelector('#chart-tip');
    if (prev) prev.remove();
    svg.insertAdjacentHTML('beforeend', tooltipMarkup(s, i, p[i][0], p[i][1]));
    var live = document.getElementById('chart-live');
    if (live) live.textContent = hourLabel(i) + ' — ' + s.fmt(s.values[i]);
    svg.querySelectorAll('.chart-hit').forEach(function (h) {
      h.setAttribute('aria-selected', String(Number(h.dataset.i) === i));
    });
  }

  function hideTip(svg) {
    var prev = svg.querySelector('#chart-tip');
    if (prev) prev.remove();
  }

  /* Warstwa hit-targetów: jeden przezroczysty, dostatecznie duży okrąg
     per godzina, do hover myszą, tap/klik i nawigacji klawiaturą. */
  function hitLayerMarkup(p) {
    var out = '<g id="chart-hits">';
    p.forEach(function (pt, i) {
      out +=
        '<circle class="chart-hit" data-i="' + i + '" cx="' + pt[0].toFixed(1) + '" cy="' + pt[1].toFixed(1) +
          '" r="9" tabindex="0" role="option" aria-selected="false" ' +
          'style="fill:transparent;stroke:none;cursor:pointer;outline:none" ' +
          'focusable="true"/>';
    });
    out += '</g>';
    return out;
  }

  /* Podłącza interakcję do warstwy hit-targetów: hover/focus pokazuje
     tooltip nad punktem, opuszczenie/blur chowa go, klik/Enter/Space
     "przypina" tooltip — nie chowa się przy odejściu myszą, więc na
     dotyku da się przeglądać punkt po punkcie bez utraty go po puszczeniu
     palca. Strzałki lewo/prawo przesuwają fokus między punktami. */
  var pinned = null;

  function bindHits(svg, s, p) {
    pinned = null;
    svg.querySelectorAll('.chart-hit').forEach(function (hit) {
      var i = Number(hit.dataset.i);
      hit.addEventListener('pointerenter', function () {
        if (pinned === null) showTip(svg, s, p, i);
      });
      hit.addEventListener('pointerleave', function () {
        if (pinned === null) hideTip(svg);
      });
      hit.addEventListener('focus', function () { showTip(svg, s, p, i); });
      hit.addEventListener('blur', function () {
        if (pinned === null) hideTip(svg);
      });
      hit.addEventListener('click', function () {
        pinned = (pinned === i) ? null : i;
        showTip(svg, s, p, i);
      });
      hit.addEventListener('keydown', function (ev) {
        var next = null;
        if (ev.key === 'ArrowRight') next = Math.min(i + 1, p.length - 1);
        else if (ev.key === 'ArrowLeft') next = Math.max(i - 1, 0);
        else if (ev.key === 'Enter' || ev.key === ' ') {
          pinned = (pinned === i) ? null : i;
          showTip(svg, s, p, i);
          ev.preventDefault();
          return;
        }
        if (next !== null && next !== i) {
          ev.preventDefault();
          svg.querySelectorAll('.chart-hit')[next].focus();
        }
      });
    });
  }

  /* pasmo „okno otwarte" na wykresie dobowym (M-06): kreskowany prostokąt
     w tonie neutralnym (nie temperatury/wilgotności, żeby nie konkurował
     z linią serii) + etykieta nad osią godzin, tej samej wysokości co
     podpis „nasłonecznienie" */
  function windowBandMarkup(ev) {
    var pxPerH = W / 24;
    var x = (ev.fromH * pxPerH).toFixed(1);
    var w = ((ev.toH - ev.fromH) * pxPerH).toFixed(1);
    var midX = (ev.fromH * pxPerH + (ev.toH - ev.fromH) * pxPerH / 2).toFixed(1);
    return '<rect x="' + x + '" y="0" width="' + w + '" height="' + H +
        '" style="fill:var(--muted);opacity:.14"/>' +
      '<line x1="' + x + '" y1="0" x2="' + x + '" y2="' + H + '" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:2 2;opacity:.5"/>' +
      '<line x1="' + (parseFloat(x) + parseFloat(w)).toFixed(1) + '" y1="0" x2="' + (parseFloat(x) + parseFloat(w)).toFixed(1) + '" y2="' + H +
        '" style="stroke:var(--muted);stroke-width:1;stroke-dasharray:2 2;opacity:.5"/>' +
      '<text x="' + midX + '" y="122" text-anchor="middle" ' +
        'style="fill:var(--muted);font-family:var(--font-body);font-size:9px">' + ev.label + '</text>';
  }

  function render(key) {
    var s = SERIES[key];
    if (!s) return;
    var p = pts(s);
    var line = smooth(p);
    var area = line + 'L' + W + ' ' + H + 'L0 ' + H + 'Z';

    /* znacznik na maksimum doby */
    var maxI = 0;
    s.values.forEach(function (v, i) { if (v > s.values[maxI]) maxI = i; });

    var mid = (TOP + BOT) / 2;
    var svg = document.getElementById('chart');
    svg.innerHTML =
      '<defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0" style="stop-color:' + s.color + ';stop-opacity:.28"/>' +
        '<stop offset="1" style="stop-color:' + s.color + ';stop-opacity:0"/>' +
      '</linearGradient></defs>' +
      /* pasmo nasłonecznienia 09–17 */
      '<rect x="110.6" y="0" width="98.3" height="' + H + '" style="fill:var(--app-2);opacity:.10"/>' +
      '<text x="159.8" y="12" text-anchor="middle" ' +
        'style="fill:var(--app-1a);font-family:var(--font-body);font-size:9px">nasłonecznienie</text>' +
      /* pasmo „okno otwarte" (M-06) — tylko gdy seria je deklaruje; skala
         identyczna jak pasmo nasłonecznienia: W=295 na 24 h = 12,29 px/h */
      (s.windowEvent ? windowBandMarkup(s.windowEvent) : '') +
      /* siatka */
      '<line x1="0" y1="' + TOP + '" x2="' + W + '" y2="' + TOP + '" style="stroke:var(--border)"/>' +
      '<line x1="0" y1="' + mid + '" x2="' + W + '" y2="' + mid + '" style="stroke:var(--border)"/>' +
      '<line x1="0" y1="' + BOT + '" x2="' + W + '" y2="' + BOT + '" style="stroke:var(--border)"/>' +
      '<path d="' + area + '" style="fill:url(#chartFill)"/>' +
      '<path d="' + line + '" style="fill:none;stroke:' + s.color +
        ';stroke-width:2.5;stroke-linejoin:round;stroke-linecap:round"/>' +
      '<circle cx="' + p[maxI][0].toFixed(1) + '" cy="' + p[maxI][1].toFixed(1) +
        '" r="4.5" style="fill:var(--surface);stroke:' + s.dotColor + ';stroke-width:2.5"/>' +
      hitLayerMarkup(p);

    bindHits(svg, s, p);

    document.getElementById('avg-val').textContent = s.avg;
    document.getElementById('avg-unit').textContent = s.avgUnit;
    document.getElementById('legend-label').textContent = s.label;
    document.getElementById('legend-range').textContent = s.range;
    document.getElementById('legend-dot').style.background = s.color;

    var cardEls = document.querySelectorAll('[data-od-id="metryki-dnia"] .card');
    s.cards.forEach(function (c, i) {
      var el = cardEls[i];
      if (!el) return;
      el.querySelector('.iconbox').className = 'iconbox iconbox--42 iconbox--' + c.tone;
      el.querySelector('.iconbox use').setAttribute('href', '#i-' + c.icon);
      var valEl = el.querySelector('.t-num');
      valEl.textContent = c.value;
      valEl.style.color = c.color;
      el.querySelector('.muted').textContent = c.label;
    });

    document.querySelectorAll('.segment button').forEach(function (b) {
      b.setAttribute('aria-selected', String(b.dataset.metric === key));
    });
    svg.setAttribute('aria-label',
      s.label + ' w ciągu doby, ' + s.range + ', średnia ' + s.avg + ' ' + s.avgUnit);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.segment button').forEach(function (b) {
      b.addEventListener('click', function () { render(b.dataset.metric); });
    });
    document.querySelectorAll('.daycell').forEach(function (c) {
      c.addEventListener('click', function () {
        document.querySelectorAll('.daycell').forEach(function (x) {
          x.setAttribute('aria-pressed', 'false');
        });
        c.setAttribute('aria-pressed', 'true');
      });
    });
    render(window.OLTE_METRIC || 'temperatura');
  });
})();
