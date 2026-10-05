/** Portrait : le résultat détaillé, façon magazine. */
(function (App) {
  'use strict';

  var html = App.ui.html;

  function emptyState() {
    return html`
      <section class="page">
        <div class="room">
          <h1 tabindex="-1">Mon portrait</h1>
          <p>Vous n’avez pas encore de portrait. Répondez aux ${App.data.questions.length} questions pour découvrir votre profil.</p>
          <button type="button" class="btn" data-action="go" data-route="quiz">Commencer</button>
        </div>
      </section>`;
  }

  function axisBar(axis, value) {
    var leftWins = value >= 50;
    return html`
      <div class="axis">
        <div class="axis-head">
          <span>${axis.label}</span>
          <b>${leftWins ? axis.left : axis.right} ${leftWins ? value : 100 - value} %</b>
        </div>
        <div class="track" aria-hidden="true"><i style="width:${value}%"></i></div>
      </div>`;
  }

  function list(tag, items) {
    var li = items.map(function (x) { return html`<li>${x}</li>`; });
    return tag === 'ol' ? html`<ol>${li}</ol>` : html`<ul>${li}</ul>`;
  }

  /** @param {Object|null} result portrait enregistré (voir core/storage.js) */
  App.views = App.views || {};
  App.views.result = function (result) {
    var p = result && App.data.getProfile(result.profile);
    var s = result && App.data.getProfile(result.secondary);
    if (!p || !s) return emptyState();

    var iaLabel = App.data.iaLevels[result.iaLevel];
    var interpretation = App.scoring.interpretAxes(result.axes);
    var stats = p.stats.map(function (st) { return st.value + ' ' + st.label; }).join(' ; ');

    return html`
      <section class="page">
        <article class="mag">
          <div class="cover">
            <img class="cover-img" src="${p.image}" alt="Illustration du profil ${p.name}">
            <div class="cover-copy">
              <div class="kicker">Votre portrait</div>
              <h1 tabindex="-1">${p.name}</h1>
              <p class="deck">« ${p.quote} »</p>
              <span class="tag">${result.code} · IA ${iaLabel}</span>
              <p>${p.intro}</p>
            </div>
          </div>
          <div class="article">
            <div class="summary">
              <b>En bref</b>
              <p>Votre profil dominant est ${p.name}. Votre profil secondaire, ${s.name}, nuance ce résultat : votre manière d’enseigner ne se résume pas à une seule catégorie.</p>
            </div>
            ${App.data.axes.map(function (axis) { return axisBar(axis, result.axes[axis.key]); })}
            <div class="analysis">
              <section class="panel">
                <h2>Ce que vos chiffres racontent</h2>
                ${interpretation.map(function (t) { return html`<p>${t}</p>`; })}
              </section>
              <section class="panel warning">
                <h2>Points de vigilance</h2>
                ${list('ul', p.watchouts)}
              </section>
              <section class="panel">
                <h2>Vos appuis</h2>
                <div class="chips">${p.strengths.map(function (x) { return html`<span>${x}</span>`; })}</div>
                <h2>Deux prochaines étapes</h2>
                ${list('ol', p.nextSteps)}
              </section>
              <section class="panel">
                <h2>Comment l’IA peut vous aider</h2>
                ${list('ul', p.aiUses)}
              </section>
              <section class="panel action">
                <h2>Votre prompt pour démarrer</h2>
                <p class="prompt">« ${p.prompt} »</p>
              </section>
            </div>
            <p><small>Données d’ancrage : ${stats}. Ces chiffres contextualisent le profil et ne mesurent pas votre performance individuelle.</small></p>
            <button type="button" class="btn" data-action="restart">Refaire le questionnaire</button>
          </div>
        </article>
      </section>`;
  };
})(window.App = window.App || {});
