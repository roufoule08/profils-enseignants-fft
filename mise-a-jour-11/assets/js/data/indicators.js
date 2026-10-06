/**
 * Les 3 indicateurs du portrait : part de la gestion, envie d'essayer,
 * temps encore à gagner avec l'IA.
 *
 * Tout vient du référentiel (App.referentiel.indicateurs : points, maximum,
 * paliers, textes, liens). Ce fichier ne recopie rien. Il applique seulement
 * les écarts listés dans `OVERRIDES`, chacun tracé dans DECISIONS.md.
 */
(function (App) {
  'use strict';

  App.data = App.data || {};

  /**
   * Écarts de texte par rapport au référentiel, indexés par
   * « clé de l'indicateur / seuil du palier / champ ».
   */
  var OVERRIDES = Object.freeze({
    // D-19 : inclusion (« vos joueurs »)
    'gestion/0/texte': 'Votre métier se joue d’abord avec vos élèves. L’IA vous aide surtout à préparer vos séances et à écrire aux familles.',
    // D-19 : inclusion (libellé au masculin) et espace manquante avant « Aller plus loin »
    'essai/33/libelle': 'Curiosité quand c’est utile',
    'essai/33/texte': 'Vous essayez dès que vous voyez l’intérêt. Partez d’un prompt de la bibliothèque et adaptez-le avec «\u00a0Aller plus loin\u00a0».',
    // D-19 : inclusion (libellé au masculin)
    'essai/66/libelle': 'Envie d’explorer'
  });

  function withOverrides(cle, palier) {
    var out = {};
    Object.keys(palier).forEach(function (field) {
      var key = cle + '/' + palier.a_partir_de + '/' + field;
      out[field] = key in OVERRIDES ? OVERRIDES[key] : palier[field];
    });
    return Object.freeze(out);
  }

  App.data.indicators = Object.freeze(App.referentiel.indicateurs.map(function (ind) {
    return Object.freeze({
      key: ind.cle,
      name: ind.nom,
      roomName: ind.nom_vue_salle,
      definition: ind.definition,
      points: ind.points || null,   // { Q1: { C: 2, D: 1 }, … } ; absent pour « gain »
      maximum: ind.maximum || null,
      showPercent: ind.cle !== 'gain', // « gain » : libellé du palier, pas de % (référentiel, champ affichage)
      levels: Object.freeze(ind.paliers.map(function (p) { return withOverrides(ind.cle, p); }))
    });
  }));

  App.data.indicatorOverrides = OVERRIDES;

  /** Indicateur par sa clé ('gestion', 'essai', 'gain'). */
  App.data.getIndicator = function (key) {
    return App.data.indicators.find(function (i) { return i.key === key; });
  };

  /** Palier atteint : le dernier dont le seuil est inférieur ou égal à la valeur (référentiel, règles). */
  App.data.indicatorLevel = function (indicator, value) {
    var level = indicator.levels[0];
    indicator.levels.forEach(function (l) { if (l.a_partir_de <= value) level = l; });
    return level;
  };
})(window.App = window.App || {});
