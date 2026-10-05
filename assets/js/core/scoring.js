/**
 * Calcul du portrait à partir des réponses (référentiel v3, « regles »).
 *
 * Module « pur » : il ne touche ni à la page ni au stockage, ce qui le rend
 * facile à tester (voir tests/).
 */
(function (App) {
  'use strict';

  var data = App.data;
  var LETTERS = 'ABCDEFGHIJ';

  /** Arrondi à l'entier le plus proche, 0,5 vers le haut (référentiel, « regles.indicateurs »). */
  function roundHalfUp(x) {
    return Math.floor(x + 0.5);
  }

  /**
   * Vérifie que `answers` contient une réponse valide pour chaque question.
   * @param {Array<number|null>} answers index de la réponse choisie, par question
   * @param {Array} [questions]
   * @returns {boolean}
   */
  function isComplete(answers, questions) {
    questions = questions || data.questions;
    return Array.isArray(answers) &&
      answers.length === questions.length &&
      answers.every(function (a, i) {
        return Number.isInteger(a) && a >= 0 && a < questions[i].answers.length;
      });
  }

  /** Profil désigné par la réponse à la question « départage », ou null. */
  function findTiebreakerProfile(answers, questions) {
    for (var i = 0; i < questions.length; i++) {
      if (!questions[i].tiebreaker) continue;
      var points = questions[i].answers[answers[i]].points || {};
      var ids = Object.keys(points);
      return ids.length === 1 ? ids[0] : null;
    }
    return null;
  }

  /**
   * Indicateur à points (« gestion », « essai ») : somme des points des réponses
   * choisies, divisée par le maximum, × 100, arrondie.
   * Les points sont indexés par la lettre de la réponse (A = 1re réponse…).
   */
  function pointsIndicator(indicator, answers, questions) {
    var sum = 0;
    questions.forEach(function (q, i) {
      var table = indicator.points[q.ref];
      if (!table) return;
      sum += table[LETTERS[answers[i]]] || 0;
    });
    return roundHalfUp(sum / indicator.maximum * 100);
  }

  /** « gain » : arrondi((50 + gestion / 2) × (1 − maturité IA / 8)), avec la gestion déjà arrondie. */
  function gainIndicator(gestion, iaLevel) {
    return roundHalfUp((50 + gestion / 2) * (1 - iaLevel / 8));
  }

  /**
   * Calcule le portrait complet.
   * @param {number[]} answers index de la réponse choisie, pour chaque question
   * @param {{profiles?: Array, questions?: Array}} [config]
   *        permet de tester avec d'autres données (par défaut : App.data)
   * @returns {{profile: string, secondary: string, scores: Object,
   *            indicators: {gestion: number, essai: number, gain: number}, iaLevel: number}}
   */
  function computeResult(answers, config) {
    config = config || {};
    var profiles = config.profiles || data.profiles;
    var questions = config.questions || data.questions;

    if (!isComplete(answers, questions)) {
      throw new Error('Questionnaire incomplet : impossible de calculer le portrait.');
    }

    var scores = {};
    profiles.forEach(function (p) { scores[p.id] = 0; });
    var iaValues = [];

    answers.forEach(function (answerIndex, i) {
      var answer = questions[i].answers[answerIndex];
      var points = answer.points || {};
      Object.keys(points).forEach(function (id) {
        if (!(id in scores)) throw new Error('Profil inconnu dans les questions : ' + id);
        scores[id] += points[id];
      });
      if (typeof answer.iaLevel === 'number') iaValues.push(answer.iaLevel);
    });

    // Classement : score décroissant, puis profil de la question « départage »,
    // puis ordre de déclaration des profils.
    var tiebreaker = findTiebreakerProfile(answers, questions);
    var order = profiles.map(function (p) { return p.id; });
    var ranking = order.slice().sort(function (a, b) {
      return (scores[b] - scores[a]) ||
        ((b === tiebreaker) - (a === tiebreaker)) ||
        (order.indexOf(a) - order.indexOf(b));
    });

    // Maturité IA : moyenne arrondie des niveaux des réponses qui en ont un.
    // Depuis D-08, seule la question 9 en porte (voir DECISIONS.md).
    var iaLevel = 0;
    if (iaValues.length) {
      var mean = iaValues.reduce(function (s, v) { return s + v; }, 0) / iaValues.length;
      iaLevel = Math.min(data.iaLevels.length - 1, Math.max(0, roundHalfUp(mean)));
    }

    var gestion = pointsIndicator(data.getIndicator('gestion'), answers, questions);
    var essai = pointsIndicator(data.getIndicator('essai'), answers, questions);

    return {
      profile: ranking[0],
      secondary: ranking[1],
      scores: scores,
      indicators: { gestion: gestion, essai: essai, gain: gainIndicator(gestion, iaLevel) },
      iaLevel: iaLevel
    };
  }

  App.scoring = {
    isComplete: isComplete,
    computeResult: computeResult,
    gainIndicator: gainIndicator,
    roundHalfUp: roundHalfUp
  };
})(window.App = window.App || {});
