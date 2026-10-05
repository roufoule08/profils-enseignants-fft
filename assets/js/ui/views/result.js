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

  function pisteCard(piste, i) {
    return html`
      <li class="piste">
        <span class="piste-num" aria-hidden="true">${i + 1}</span>
        <div>
          <h3>${piste.title}</h3>
          <p>${piste.text}</p>
        </div>
      </li>`;
  }

  /** Échelle en 5 cases : les cases jusqu'au niveau atteint sont pleines. */
  function iaScale(level) {
    var levels = App.data.iaLevels;
    return html`
      <ol class="ia-scale" aria-label="Niveau ${level + 1} sur ${levels.length}">
        ${levels.map(function (l, i) {
          return html`<li class="${i <= level ? 'on' : ''}${i === level ? ' current' : ''}">${l.name}</li>`;
        })}
      </ol>`;
  }

  function statCard(stat) {
    return html`
      <li class="stat${stat.value ? '' : ' stat-quote'}">
        ${stat.value ? html`<b class="stat-value">${stat.value}</b>` : ''}
        <span class="stat-label">${stat.label}</span>
        <small class="stat-source">${stat.source}</small>
      </li>`;
  }

  /** @param {Object|null} result portrait enregistré (voir core/storage.js) */
  App.views = App.views || {};
  App.views.result = function (result) {
    var p = result && App.data.getProfile(result.profile);
    var s = result && App.data.getProfile(result.secondary);
    if (!p || !s) return emptyState();

    var ia = App.data.iaLevels[result.iaLevel];
    var name = App.data.profileName(p, result.gender);
    var secondaryName = App.data.profileName(s, result.gender);
    var interpretation = App.scoring.interpretAxes(result.axes);

    return html`
      <section class="page">
        <article class="mag">
          <div class="cover">
            <img class="cover-img" src="${p.image}" alt="Illustration du profil ${name}">
            <div class="cover-copy">
              <div class="kicker">Votre portrait</div>
              <h1 tabindex="-1">${name}</h1>
              <p class="deck">« ${p.quote} »</p>
              <span class="tag">${result.code} · IA : ${ia.name}</span>
              <p>${p.intro}</p>
            </div>
          </div>
          <div class="article">
            <div class="summary">
              <b>En bref</b>
              <p>Profil principal : <strong>${name}</strong>. Profil secondaire : <strong>${secondaryName}</strong>. Votre manière d’enseigner est unique : ce portrait en éclaire les grandes tendances.</p>
            </div>

            ${App.data.axes.map(function (axis) { return axisBar(axis, result.axes[axis.key]); })}

            <div class="analysis">
              <section class="panel">
                <h2>Votre façon d’enseigner</h2>
                ${interpretation.map(function (t) { return html`<p>${t}</p>`; })}
              </section>
              <section class="panel">
                <h2>Vos points forts</h2>
                <div class="chips">${p.strengths.map(function (x) { return html`<span>${x}</span>`; })}</div>
              </section>

              <section class="panel wide">
                <h2>3 pistes où l’IA peut vous faciliter le travail</h2>
                <ol class="pistes">${p.pistes.map(pisteCard)}</ol>
                <p class="panel-note">L’IA prépare, vous décidez : votre expertise reste au centre.</p>
              </section>

              <section class="panel wide">
                <h2>Votre rapport à l’IA : ${ia.name}</h2>
                ${iaScale(result.iaLevel)}
                <p>${ia.message}</p>
              </section>

              <section class="panel action">
                <h2>Votre prompt pour démarrer</h2>
                <p class="prompt" id="prompt-text">${p.prompt}</p>
                <button type="button" class="btn btn-light" data-action="copy-prompt">Copier le prompt</button>
                <span class="copy-status" role="status" aria-live="polite"></span>
                <p class="panel-note">Collez-le dans ChatGPT, Copilot ou Gemini, puis complétez les passages entre crochets […].</p>
              </section>

              <section class="panel wide">
                <h2>Repères chiffrés sur le métier</h2>
                <ul class="stats">${p.stats.map(statCard)}</ul>
                <p class="panel-note">Ces chiffres décrivent la profession dans son ensemble, pas votre activité personnelle.</p>
              </section>
            </div>

            <button type="button" class="btn" data-action="restart">Refaire le questionnaire</button>
          </div>
        </article>
      </section>`;
  };
})(window.App = window.App || {});
