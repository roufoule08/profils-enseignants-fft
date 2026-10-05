/**
 * Point d'entrée : état de l'application, navigation et actions.
 *
 * Flux : une action (clic) modifie `state`, puis `render()` réaffiche la page.
 */
(function (App) {
  'use strict';

  var appEl = document.getElementById('app');
  var navButtons = document.querySelectorAll('[data-nav]');
  var store = App.storage.roomStore;

  function emptyAnswers() {
    return App.data.questions.map(function () { return null; });
  }

  var state = {
    route: 'home',
    quiz: { index: 0, answers: emptyAnswers() },
    result: App.storage.loadResult(),
    room: { status: 'idle', entries: [] }
  };

  /* ---------- Affichage ---------- */

  function renderView() {
    switch (state.route) {
      case 'quiz': return App.views.quiz(state.quiz);
      case 'result': return App.views.result(state.result);
      case 'room': return App.views.room(state.room, store);
      default: return App.views.home();
    }
  }

  /**
   * @param {{focus?: 'page'|string}} [options]
   *   'page' : place le focus sur le titre (changement de page) ;
   *   sélecteur CSS : place le focus sur cet élément (ex. la réponse cliquée).
   */
  function render(options) {
    options = options || {};
    appEl.innerHTML = renderView().toString();

    navButtons.forEach(function (b) {
      if (b.dataset.nav === state.route) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });

    var target = options.focus === 'page'
      ? appEl.querySelector('h1')
      : options.focus && appEl.querySelector(options.focus);
    if (target) target.focus({ preventScroll: true });
  }

  /* ---------- La salle ---------- */

  function loadRoom() {
    state.room = { status: 'loading', entries: state.room.entries };
    store.list().then(function (entries) {
      state.room = { status: 'ready', entries: entries };
    }, function (err) {
      console.error('Chargement de la salle impossible', err);
      state.room = { status: 'error', entries: [] };
    }).then(function () {
      if (state.route === 'room') render();
    });
  }

  /* ---------- Navigation ---------- */

  function onRouteChange(route, info) {
    state.route = route;
    if (route === 'room') loadRoom();
    render({ focus: info.initial ? null : 'page' });
    if (!info.initial) window.scrollTo(0, 0);
  }

  function go(route) {
    App.router.navigate(route, function (same) { onRouteChange(same, { initial: false }); });
  }

  /* ---------- Questionnaire ---------- */

  function resetQuiz() {
    state.quiz = { index: 0, answers: emptyAnswers() };
  }

  function finishQuiz() {
    var record = App.storage.createRecord(App.scoring.computeResult(state.quiz.answers));
    state.result = record;
    App.storage.saveResult(record);
    store.add(record).catch(function (err) {
      console.error('Enregistrement dans la salle impossible', err);
    });
    // Le questionnaire repart de zéro : revenir dessus ne peut pas
    // renvoyer (et compter deux fois) le même résultat.
    resetQuiz();
    go('result');
  }

  var actions = {
    go: function (el) { go(el.dataset.route); },

    answer: function (el) {
      var index = Number(el.dataset.index);
      state.quiz.answers[state.quiz.index] = index;
      render({ focus: '[data-action="answer"][data-index="' + index + '"]' });
    },

    prev: function () {
      if (state.quiz.index === 0) return;
      state.quiz.index--;
      render({ focus: 'page' });
    },

    next: function () {
      var quiz = state.quiz;
      if (quiz.answers[quiz.index] == null) return;
      if (quiz.index < App.data.questions.length - 1) {
        quiz.index++;
        render({ focus: 'page' });
      } else {
        finishQuiz();
      }
    },

    restart: function () {
      resetQuiz();
      go('quiz');
    },

    'reload-room': function () {
      loadRoom();
      render();
    }
  };

  appEl.addEventListener('click', function (event) {
    var el = event.target.closest('[data-action]');
    if (!el || el.disabled || !appEl.contains(el)) return;
    var action = actions[el.dataset.action];
    if (action) action(el);
  });

  navButtons.forEach(function (b) {
    b.addEventListener('click', function () { go(b.dataset.nav); });
  });

  App.router.start(onRouteChange);
})(window.App = window.App || {});
