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
 * Adresses des 6 photos fournies le 6 octobre 2026.
 * [À VALIDER : nom du photographe de chaque photo, à ajouter au crédit si souhaité (« FFT / Prénom Nom »).]
 */
(function (App) {
  'use strict';

  App.data = App.data || {};

  App.data.photoCredits = Object.freeze({
    // Aryna Sabalenka
    passeur: { credit: 'FFT', url: 'https://media.fft.fr/media/media-details/105207139?player=263117:Aryna%20Sabalenka' },
    // Novak Djokovic
    coach: { credit: 'FFT', url: 'https://media.fft.fr/media/media-details/104480426?player=263148:Novak%20Djokovic&tag=2839160:Roland-Garros' },
    // Amélie Mauresmo
    batisseur: { credit: 'FFT', url: 'https://media.fft.fr/media/media-details/119409284?player=292714:Am%C3%A9lie%20Mauresmo' },
    // Serena Williams
    entrepreneur: { credit: 'FFT', url: 'https://media.fft.fr/media/media-details/40172681?player=296347:Serena%20Williams' },
    // Carlos Alcaraz
    'jeune-pro': { credit: 'FFT', url: 'https://media.fft.fr/media/media-details/48095874?player=262985:Carlos%20Alcaraz' },
    // Roger Federer
    sage: { credit: 'FFT', url: 'https://media.fft.fr/media/media-details/77277202?player=296348:Roger%20Federer' }
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
