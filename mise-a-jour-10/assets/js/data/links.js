/**
 * Liens externes du site.
 *
 * `promptLibrary` : page d'accueil de la bibliothèque de prompts
 * (référentiel v3, indicateurs > essai > paliers > lien).
 * [À VALIDER : un lien direct vers un cas d'usage précis pour chaque profil.
 *  Le référentiel ne le définit pas : on renvoie vers la bibliothèque.]
 */
(function (App) {
  'use strict';

  App.data = App.data || {};

  App.data.links = Object.freeze({
    promptLibrary: 'https://promptenseignantfft.netlify.app/'
  });
})(window.App = window.App || {});