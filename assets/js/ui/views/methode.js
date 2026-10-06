/** Sources et méthode : comment le portrait est calculé et d'où viennent les profils. */
(function (App) {
  'use strict';

  var html = App.ui.html;

  function sourceItem(s) {
    return html`<li><strong>${s.name}</strong> <span class="source-meta">(${s.type.toLowerCase()}, ${s.volume})</span> : ${s.apport}</li>`;
  }

  function sourceGroup(group) {
    return html`
      <h3>${group.title}</h3>
      <ul class="sources">${group.sources.map(sourceItem)}</ul>`;
  }

  App.views = App.views || {};
  App.views.methode = function () {
    var m = App.data.methode;
    return html`
      <section class="page">
        <article class="room methode">
          <div class="kicker">Transparence</div>
          <h1 tabindex="-1">Sources et méthode</h1>
          <p>${m.intro}</p>

          <h2>La méthode</h2>
          <ol>${m.steps.map(function (s) { return html`<li>${s}</li>`; })}</ol>

          <h2>Les sources</h2>
          ${m.sourceGroups.map(sourceGroup)}

          <h2>Les limites</h2>
          <ul>${m.limits.map(function (l) { return html`<li>${l}</li>`; })}</ul>

          <button type="button" class="btn" data-action="go" data-route="result">Revenir à mon portrait</button>
        </article>
      </section>`;
  };
})(window.App = window.App || {});
