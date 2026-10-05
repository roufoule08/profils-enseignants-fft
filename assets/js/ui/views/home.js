/** Page d'accueil : présentation et galerie des six profils. */
(function (App) {
  'use strict';

  var html = App.ui.html;

  function profileCard(p) {
    return html`
      <article class="story">
        <img src="${p.image}" alt="Illustration du profil ${p.name}, esprit ${p.player}"
             loading="lazy" decoding="async">
        <div class="story-copy">
          <h3>${p.name}</h3>
          <b>Esprit ${p.player}</b>
          <p>${p.intro}</p>
        </div>
      </article>`;
  }

  App.views = App.views || {};
  App.views.home = function () {
    return html`
      <section>
        <div class="hero">
          <div class="hero-copy">
            <div class="kicker">Colloque des Enseignants</div>
            <h1 tabindex="-1">Quel profil <span>tennis</span> êtes-vous ?</h1>
            <p>Découvrez vos appuis, vos points de vigilance et des pistes concrètes adaptées à votre manière d’enseigner.</p>
            <button type="button" class="btn" data-action="go" data-route="quiz">Commencer</button>
          </div>
        </div>
        <div class="section">
          <div class="kicker">Les six portraits</div>
          <h2>Six façons de vivre le métier</h2>
          <div class="grid">${App.data.profiles.map(profileCard)}</div>
        </div>
      </section>`;
  };
})(window.App = window.App || {});
