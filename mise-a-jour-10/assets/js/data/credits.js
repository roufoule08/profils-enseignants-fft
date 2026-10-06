/**
 * Crédits des photos des joueurs et joueuses miroirs.
 *
 * Format conseillé : « Photographe / Agence » (ex. « Prénom Nom / Agence »).
 * Le crédit s'affiche sous la photo (accueil et portrait) et sur la page
 * « Sources et méthode ». Un crédit vide (null) n'affiche rien.
 *
 * Source des 6 photos : médiathèque de la FFT (https://media.fft.fr), indiquée le 6 octobre 2026.
 * [À VALIDER : ajouter le nom du photographe de chaque photo, visible dans la fiche de la photo
 *  sur la médiathèque, sous la forme « FFT / Prénom Nom » (DECISIONS.md D-30).]
 */
(function (App) {
  'use strict';

  App.data = App.data || {};

  App.data.photoCredits = Object.freeze({
    passeur: 'FFT',      // Yannick Noah
    coach: 'FFT',        // Novak Djokovic
    batisseur: 'FFT',    // Amélie Mauresmo
    entrepreneur: 'FFT', // Serena Williams
    'jeune-pro': 'FFT',  // Carlos Alcaraz
    sage: 'FFT'          // Roger Federer
  });

  /** Crédit de la photo d'un profil, ou null s'il n'est pas encore renseigné. */
  App.data.photoCredit = function (profile) {
    var credit = App.data.photoCredits[profile.id];
    return typeof credit === 'string' && credit.trim() ? credit.trim() : null;
  };
})(window.App = window.App || {});
