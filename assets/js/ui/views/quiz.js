/** Questionnaire : une question à la fois. */
(function (App) {
  'use strict';

  var html = App.ui.html;

  /**
   * @param {{index: number, answers: Array<number|null>}} quiz état du questionnaire
   */
  App.views = App.views || {};
  App.views.quiz = function (quiz) {
    var questions = App.data.questions;
    var total = questions.length;
    var question = questions[quiz.index];
    var selected = quiz.answers[quiz.index];
    var isLast = quiz.index === total - 1;
    var progress = Math.round((quiz.index + (selected != null ? 1 : 0)) / total * 100);

    var answers = question.answers.map(function (answer, i) {
      var isSelected = selected === i;
      return html`
        <button type="button" class="answer${isSelected ? ' sel' : ''}"
                data-action="answer" data-index="${i}" aria-pressed="${isSelected ? 'true' : 'false'}">
          <span class="ball" aria-hidden="true"></span>
          <span>${answer.label}</span>
        </button>`;
    });

    return html`
      <section class="page">
        <div class="quiz">
          <div class="meta">
            <span>Question ${quiz.index + 1}/${total}</span>
            <span>${progress} %</span>
          </div>
          <div class="progress" role="progressbar" aria-label="Progression du questionnaire"
               aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}">
            <i style="width:${progress}%"></i>
          </div>
          <h1 class="question" id="question-title" tabindex="-1">${question.text}</h1>
          <div class="answers" role="group" aria-labelledby="question-title">${answers}</div>
          <div class="qnav">
            <button type="button" class="btn back" data-action="prev" ${quiz.index === 0 ? 'disabled' : ''}>Rejouer le point d’avant</button>
            <button type="button" class="btn" data-action="next" ${selected == null ? 'disabled' : ''}>
              ${isLast ? 'Voir mon portrait' : 'Servir le prochain point'}
            </button>
          </div>
        </div>
      </section>`;
  };
})(window.App = window.App || {});
