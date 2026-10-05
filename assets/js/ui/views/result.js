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

  /** Barre d'un axe : pôle dominant et son pourcentage (documentation de reprise, étape 3). */
  function axisBar(axis, value) {
    var leftWins = value >= 50;
    return html`
      <div class="axis">
        <div class="axis-head">
          <span>${axis.label}</span>
          <b>${leftWins ? axis.left : axis.right} ${leftWins ? value : 100 - value} %</b>
        </div>
        <div class="track" aria-hidden="true"><i data-pct="${value}"></i></div>
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

  function statCard(stat) {
    return html`
      <li class="stat${stat.value ? '' : ' stat-quote'}">
        ${stat.value ? html`<b class="stat-value">${stat.value}</b>` : ''}
        <span class="stat-label">${stat.label}</span>
        <small class="stat-source">${stat.source}</small>
      </li>`;
  }

  /** Lien vers la bibliothèque de prompts, affiché seulement quand l'adresse est connue. */
  function libraryLink() {
    var url = App.data.links.promptLibrary;
    if (!url) return '';
    return html`<a class="text-link" href="${url}" target="_blank" rel="noopener">Voir d’autres cas d’usage dans la bibliothèque de prompts →</a>`;
  }

  /** @param {Object|null} result portrait enregistré (voir core/storage.js) */
  App.views = App.views || {};
  App.views.result = function (result) {
    var p = result && App.data.getProfile(result.profile);
    var s = result && App.data.getProfile(result.secondary);
    if (!p || !s) return emptyState();

    var ia = App.data.iaLevels[result.iaLevel];
    var name = App.data.profileName(p);
    var family = App.data.families[p.family];

    return html`
      <section class="page">
        <article class="mag">
          <div class="cover">
            <img class="cover-img" src="${p.image}" alt="Illustration du profil ${name}">
            <div class="cover-copy">
              <div class="kicker">Votre portrait · <span class="family-name">${family.name}</span></div>
              <h1 tabindex="-1">${name}</h1>
              <p class="deck">«&nbsp;${p.quote}&nbsp;»</p>
              <span class="tag">${result.code} · IA : ${ia.name}</span>
              <p>${p.intro}</p>
            </div>
          </div>
          <div class="article">
            <div class="summary">
              <b>En bref</b>
              <p>Profil principal : <strong>${name}</strong>. Profil secondaire : <strong>${App.data.profileName(s)}</strong>. Votre manière d’enseigner est unique : ce portrait en éclaire les grandes tendances.</p>
            </div>

            ${App.data.axes.map(function (axis) { return axisBar(axis, result.axes[axis.key]); })}

            <div class="analysis">
              <section class="panel wide">
                <h2>Vos points forts</h2>
                <div class="chips">${p.strengths.map(function (x) { return html`<span>${x}</span>`; })}</div>
              </section>

              <section class="panel wide">
                <h2>3 pistes où l’IA peut vous faciliter le travail</h2>
                <ol class="pistes">${p.pistes.map(pisteCard)}</ol>
                <p class="panel-note">L’IA prépare, vous décidez : votre expertise reste au centre.</p>
              </section>

              <section class="panel action">
                <h2>Votre cas d’usage pour démarrer</h2>
                <p class="prompt" id="prompt-text">${p.prompt}</p>
                <button type="button" class="btn btn-light" data-action="copy-prompt">Copier le prompt</button>
                <span class="copy-status" role="status" aria-live="polite"></span>
                <p class="panel-note">Collez-le dans ChatGPT, Copilot ou Gemini, puis complétez les passages entre crochets […].</p>
                ${libraryLink()}
              </section>

              <section class="panel wide">
                <h2>Pourquoi ce profil vous ressemble</h2>
                <p class="stats-intro">${p.statsIntro}</p>
                <ul class="stats">${p.stats.map(statCard)}</ul>
                <p class="panel-note">Ces chiffres décrivent la profession dans son ensemble, pas votre activité personnelle.
                  <a class="text-link" href="#methode">Sources et méthode →</a></p>
              </section>
            </div>

            <button type="button" class="btn" data-action="restart">Refaire le questionnaire</button>
          </div>
        </article>
      </section>`;
  };
})(window.App = window.App || {});
