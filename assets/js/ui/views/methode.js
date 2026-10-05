/** Sources et méthode : d'où viennent les profils et comment le portrait est calculé. */
(function (App) {
  'use strict';

  var html = App.ui.html;

  function sourceRow(s) {
    return html`
      <tr>
        <th scope="row">${s.name}</th>
        <td>${s.type}</td>
        <td>${s.volume}</td>
        <td>${s.apport}</td>
      </tr>`;
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

          <h2>Les sources</h2>
          <div class="table-scroll">
            <table class="sources">
              <thead><tr><th scope="col">Source</th><th scope="col">Type</th><th scope="col">Volume</th><th scope="col">Ce qu’elle apporte</th></tr></thead>
              <tbody>${m.sources.map(sourceRow)}</tbody>
            </table>
          </div>

          <h2>La méthode</h2>
          <ol>${m.steps.map(function (s) { return html`<li>${s}</li>`; })}</ol>

          <h2>Les limites</h2>
          <ul>${m.limits.map(function (l) { return html`<li>${l}</li>`; })}</ul>

          <button type="button" class="btn" data-action="go" data-route="result">Revenir à mon portrait</button>
        </article>
      </section>`;
  };
})(window.App = window.App || {});
