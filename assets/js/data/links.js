/**
 * Liens externes du site.
 *
 * `promptLibrary` : adresse de la bibliothèque de prompts.
 *   [À VALIDER : adresse de la bibliothèque et cas d'usage à proposer pour chaque profil]
 *   Tant qu'elle vaut null, aucun lien n'est affiché (on n'invente pas d'adresse).
 */
(function (App) {
  'use strict';

  App.data = App.data || {};

  App.data.links = Object.freeze({
    promptLibrary: null
  });
})(window.App = window.App || {});
