/**
 * Portrait : le résultat détaillé, façon magazine.
 *
 * Le questionnaire sert à capter l'attention en début d'atelier : le portrait
 * se lit vite et ne disperse pas. Il ne contient que 2 liens (D-23) :
 * la bibliothèque de prompts (cas d'usage) et la page « Sources et méthode ».
 */
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

  /**
   * Un indicateur v3 : nom, valeur (% ou libellé du palier pour « gain »),
   * barre, puis « Libellé du palier. » en tête du texte (référentiel, champ
   * « affichage »). Les liens d'action des paliers ne sont pas affichés (D-23).
   */
  function indicatorBlock(indicator, value) {
    var level = App.data.indicatorLevel(indicator, value);
    return html`
      <div class="indicator">
        <div class="indicator-head">
          <h3>${indicator.name}</h3>
          <b class="indicator-value">${indicator.showPercent ? value + ' %' : level.libelle}</b>
        </div>
        <div class="track" aria-hidden="true"><i data-pct="${value}"></i></div>
        <p>${indicator.showPercent ? html`<strong>${level.libelle}.</strong> ` : ''}${level.texte}</p>
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
      </li>`;
  }

  /** Sources des chiffres du profil, réunies en une seule ligne et sans doublon. */
  function statSources(stats) {
    var unique = [];
    stats.forEach(function (st) {
      if (unique.indexOf(st.source) < 0) unique.push(st.source);
    });
    return unique.join(' ; ');
  }

  /**
   * Lien vers la page du profil dans la bibliothèque de prompts, où figure le
   * cas d'usage proposé. La bibliothèque n'a pas d'adresse directe par cas
   * d'usage : on ouvre la liste des cas d'usage du profil (DECISIONS.md D-22).
   */
  function libraryLink(profile) {
    var base = App.data.links.promptLibrary;
    if (!base) return '';
    var url = profile.useCase ? base + '#' + profile.useCase.libraryPage : base;
    return html`<a class="text-link" href="${url}" target="_blank" rel="noopener">Voir d’autres prompts pour mon profil →</a>`;
  }

  /** @param {Object|null} result portrait enregistré (voir core/storage.js) */
  App.views = App.views || {};
  App.views.result = function (result) {
    var p = result && App.data.getProfile(result.profile);
    var s = result && App.data.getProfile(result.secondary);
    if (!p || !s) return emptyState();

    var ia = App.data.iaLevels[result.iaLevel];
    var name = App.data.profileName(p);

    return html`
      <section class="page">
        <article class="mag">
          <div class="cover">
            <figure class="cover-figure">
              <img class="cover-img" src="${p.image}" alt="Illustration du profil ${name}">
              ${App.data.photoCredit(p) ? html`<figcaption class="photo-credit">© ${App.data.photoCredit(p)}</figcaption>` : ''}
            </figure>
            <div class="cover-copy">
              <div class="kicker">Votre portrait</div>
              <h1 tabindex="-1">${name}</h1>
              <p class="deck">«&nbsp;${p.quote}&nbsp;»</p>
              <span class="tag">IA : ${ia.name}</span>
              <p>${p.intro}</p>
            </div>
          </div>
          <div class="article">
            <div class="summary">
              <b>En bref</b>
              <p>Profil principal : <strong>${name}</strong>. Profil secondaire : <strong>${App.data.profileName(s)}</strong>. Votre manière d’enseigner est unique : ce portrait en éclaire les grandes tendances.</p>
            </div>

            <section class="indicators" aria-labelledby="indicators-title">
              <div class="kicker" id="indicators-title">Vos 3 indicateurs</div>
              ${App.data.indicators.map(function (ind) { return indicatorBlock(ind, result.indicators[ind.key]); })}
            </section>

            <div class="analysis">
              <section class="panel wide">
                <h2>Vos points forts</h2>
                <div class="chips">${p.strengths.map(function (x) { return html`<span>${x}</span>`; })}</div>
              </section>

              <section class="panel wide">
                <h2>3 pistes où l’IA peut vous faciliter le travail</h2>
                <ol class="pistes">${p.pistes.map(pisteCard)}</ol>
                <p class="panel-note">L’IA prépare, vous décidez : votre expertise reste au centre. Ne saisissez jamais de nom ni d’information personnelle sur vos élèves.</p>
              </section>

              <section class="panel action">
                <h2>Votre cas d’usage pour démarrer</h2>
                <p class="prompt" id="prompt-text">${p.prompt}</p>
                <button type="button" class="btn btn-light" data-action="copy-prompt">Copier le prompt</button>
                <span class="copy-status" role="status" aria-live="polite"></span>
                <p class="panel-note">Collez-le dans ChatGPT, Copilot ou Gemini, puis complétez les passages entre crochets […].</p>
                ${libraryLink(p)}
              </section>

              <section class="panel wide">
                <h2>Ce profil dans la profession</h2>
                <p class="stats-intro">${p.statsIntro}</p>
                <ul class="stats">${p.stats.map(statCard)}</ul>
                <p class="panel-note">Ces chiffres décrivent la profession, pas votre parcours personnel.
                  Sources : ${statSources(p.stats)}. <a class="text-link" href="#methode">Sources et méthode →</a></p>
              </section>
            </div>

            <button type="button" class="btn" data-action="restart">Refaire le questionnaire</button>
          </div>
        </article>
      </section>`;
  };
})(window.App = window.App || {});
