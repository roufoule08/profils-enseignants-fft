/**
 * Calcul de la première version du site, recopié à l'identique (seules
 * les variables globales ont été rendues locales).
 * Sert de référence : le nouveau calcul doit donner exactement le même portrait.
 */
(function () {
  'use strict';

  var V = {
    P: [-0.8, 0.4, -0.8], C: [-0.6, -0.4, 0.8], B: [0.9, -0.2, -0.6],
    E: [0.7, 0.7, 0.7], J: [-0.3, 0.9, -0.2], S: [-0.4, -0.9, 0.1]
  };
  var C = Object.keys(V);

  window.legacyCalc = function (answers) {
    var S = { a: answers };
    var sc = Object.fromEntries(C.map(function (c) { return [c, 0]; })), lv = [];
    S.a.forEach(function (a, i) {
      if (a == null) return;
      if (i < 5 || i === 6 || i === 7) sc[C[a]]++;
      if (i === 5) {
        var x = [{ J: 2 }, { P: 1, C: 1 }, { B: 1, E: 1 }, { S: 2 }][a];
        Object.entries(x || {}).forEach(function (kv) { sc[kv[0]] += kv[1]; });
      }
      if (i === 9) {
        if (a === 2) sc.E += .5;
        if (a === 3) { sc.P += .5; sc.C += .5; }
        if (a === 4) { sc.C += .5; sc.B += .5; }
      }
      if (i >= 8) lv.push(a);
    });
    var dep = S.a[2] != null ? C[S.a[2]] : null;
    var o = C.slice().sort(function (a, b) {
      return sc[b] - sc[a] || ((b === dep) - (a === dep)) || C.indexOf(a) - C.indexOf(b);
    });
    var tot = C.reduce(function (s, c) { return s + sc[c]; }, 0) || 1, d = {};
    ['t', 'x', 'g'].forEach(function (k, j) {
      var m = C.reduce(function (s, c) { return s + sc[c] * V[c][j]; }, 0) / tot;
      d[k] = Math.round((1 - m) / 2 * 100);
    });
    return {
      profile: o[0], second: o[1], scores: sc, t: d.t, x: d.x, g: d.g,
      code: [d.t >= 50 ? 'T' : 'K', d.x >= 50 ? 'R' : 'X', d.g >= 50 ? 'G' : 'I'].join('-'),
      ia: Math.floor(lv.reduce(function (a, b) { return a + b; }, 0) / lv.length + .5)
    };
  };

  window.LEGACY_IDS = { P: 'passeur', C: 'coach', B: 'batisseur', E: 'entrepreneur', J: 'jeune-pro', S: 'sage' };
})();
