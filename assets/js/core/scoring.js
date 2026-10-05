/**
 * Calcul du portrait à partir des réponses.
 *
 * Module « pur » : il ne touche ni à la page ni au stockage, ce qui le rend
 * facile à tester (voir tests/).
 */
(function (App) {
  'use strict';

  var data = App.data;

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
   * Score de chaque axe : pourcentage du pôle de gauche (0 à 100), obtenu en
   * pondérant la position de chaque profil par son score.
   */
  function computeAxes(scores, profiles, axes) {
    var total = profiles.reduce(function (sum, p) { return sum + scores[p.id]; }, 0) || 1;
    var result = {};
    axes.forEach(function (axis) {
      var mean = profiles.reduce(function (sum, p) {
        return sum + scores[p.id] * p.axes[axis.key];
      }, 0) / total;
      result[axis.key] = Math.round((1 - mean) / 2 * 100);
    });
    return result;
  }

  /**
   * Calcule le portrait complet.
   * @param {number[]} answers index de la réponse choisie, pour chaque question
   * @param {{profiles?: Array, questions?: Array, axes?: Array}} [config]
   *        permet de tester avec d'autres données (par défaut : App.data)
   * @returns {{profile: string, secondary: string, scores: Object,
   *            axes: Object, code: string, iaLevel: number}}
   */
  function computeResult(answers, config) {
    config = config || {};
    var profiles = config.profiles || data.profiles;
    var questions = config.questions || data.questions;
    var axes = config.axes || data.axes;

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

    var axisScores = computeAxes(scores, profiles, axes);
    var code = axes.map(function (axis) {
      return axisScores[axis.key] >= 50 ? axis.code.left : axis.code.right;
    }).join('-');

    var iaLevel = 0;
    if (iaValues.length) {
      var mean = iaValues.reduce(function (s, v) { return s + v; }, 0) / iaValues.length;
      iaLevel = Math.min(data.iaLevels.length - 1, Math.max(0, Math.floor(mean + 0.5)));
    }

    return {
      profile: ranking[0],
      secondary: ranking[1],
      scores: scores,
      axes: axisScores,
      code: code,
      iaLevel: iaLevel
    };
  }

  App.scoring = {
    isComplete: isComplete,
    computeResult: computeResult
  };
})(window.App = window.App || {});
