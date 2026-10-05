/** La salle : répartition anonyme des profils. */
(function (App) {
  'use strict';

  var html = App.ui.html;

  function frame(body) {
    return html`
      <section class="page">
        <div class="room">
          <div class="kicker">Vue anonyme</div>
          <h1 tabindex="-1">La salle</h1>
          ${body}
        </div>
      </section>`;
  }

  /**
   * Nombre de résultats par profil, triés du plus fréquent au moins fréquent
   * (à égalité : ordre de déclaration des profils).
   * Ne modifie jamais App.data.profiles.
   */
  function countByProfile(entries) {
    return App.data.profiles
      .map(function (p, order) {
        var count = entries.filter(function (e) { return e.profile === p.id; }).length;
        return { profile: p, count: count, order: order };
      })
      .sort(function (a, b) { return (b.count - a.count) || (a.order - b.order); });
  }

  /**
   * @param {{status: 'idle'|'loading'|'ready'|'error', entries: Array}} room
   * @param {{isShared: boolean}} store
   */
  App.views = App.views || {};
  App.views.room = function (room, store) {
    if (room.status === 'loading' || room.status === 'idle') {
      return frame(html`<p aria-live="polite">Chargement des résultats…</p>`);
    }
    if (room.status === 'error') {
      return frame(html`
        <p role="alert">Impossible de charger les résultats pour le moment.</p>
        <button type="button" class="btn" data-action="reload-room">Réessayer</button>`);
    }

    var entries = room.entries;
    if (!entries.length) {
      return frame(html`<p>${store.isShared
        ? 'Aucun résultat pour le moment.'
        : 'Aucun résultat enregistré sur cet appareil.'}</p>`);
    }

    var rows = countByProfile(entries).map(function (row) {
      var pct = Math.round(row.count / entries.length * 100);
      return html`
        <div class="row">
          <span>${row.profile.name}</span>
          <span class="track" aria-hidden="true"><i style="width:${pct}%"></i></span>
          <b aria-label="${row.count} résultat(s), ${pct} %">${row.count}</b>
        </div>`;
    });

    return frame(html`
      <p>${entries.length} résultat(s) agrégé(s), sans nom ni identité${store.isShared ? '' : ' (cet appareil uniquement)'}.</p>
      ${rows}`);
  };

  App.views._countByProfile = countByProfile; // exposé pour les tests
})(window.App = window.App || {});
