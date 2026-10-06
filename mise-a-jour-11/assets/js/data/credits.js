/**
 * Crédits et sources des photos des joueurs et joueuses miroirs.
 *
 * Pour chaque photo :
 *   credit : texte affiché, ex. « FFT » ou « FFT / Prénom Nom »
 *   url    : adresse de la photo dans la médiathèque FFT (https://media.fft.fr/…)
 *
 * Le crédit s'affiche sur la photo (accueil et portrait). La page « Sources et
 * méthode » liste chaque crédit avec un lien vers la photo d'origine.
 * Un crédit vide (null) n'affiche rien.
 *
 * Source des photos : médiathèque de la FFT (https://media.fft.fr), indiquée le 6 octobre 2026.
 * [À VALIDER : adresse de chaque photo dans la médiathèque et nom du photographe (DECISIONS.md D-30).]
 */
(function (App) {
  'use strict';

  App.data = App.data || {};

  App.data.photoCredits = Object.freeze({
    passeur: { credit: 'FFT', url: null },      // Aryna Sabalenka
    coach: { credit: 'FFT', url: null },        // Novak Djokovic
    batisseur: { credit: 'FFT', url: null },    // Amélie Mauresmo
    entrepreneur: { credit: 'FFT', url: null }, // Serena Williams
    'jeune-pro': { credit: 'FFT', url: null },  // Carlos Alcaraz
    sage: { credit: 'FFT', url: null }          // Roger Federer
  });

  function entry(profile) {
    var e = App.data.photoCredits[profile.id];
    return e && typeof e.credit === 'string' && e.credit.trim() ? e : null;
  }

  /** Texte du crédit de la photo d'un profil, ou null s'il n'est pas renseigné. */
  App.data.photoCredit = function (profile) {
    var e = entry(profile);
    return e ? e.credit.trim() : null;
  };

  /** Adresse de la photo d'origine (médiathèque), ou null. Seules les adresses https sont acceptées. */
  App.data.photoSource = function (profile) {
    var e = entry(profile);
    return e && typeof e.url === 'string' && /^https:\/\//.test(e.url) ? e.url : null;
  };
})(window.App = window.App || {});
