/**
 * Les trois axes du portrait.
 *
 * Le score d'un axe est le pourcentage du pôle de gauche (0 à 100).
 * À 50 % ou plus, le pôle de gauche l'emporte et donne la lettre `code.left`
 * (documentation de reprise, étapes 3 et 4). Le portrait affiche le pôle dominant
 * et son pourcentage, sans texte d'interprétation : le référentiel n'en définit pas.
 */
(function (App) {
  'use strict';

  App.data = App.data || {};

  App.data.axes = Object.freeze([
    {
      key: 'terrainClub',
      label: 'Terrain ↔ Club',
      left: 'Terrain',
      right: 'Club',
      code: { left: 'T', right: 'K' }
    },
    {
      key: 'reperesExploration',
      label: 'Repères ↔ Exploration',
      left: 'Repères',
      right: 'Exploration',
      code: { left: 'R', right: 'X' }
    },
    {
      key: 'groupeIndividuel',
      label: 'Groupe ↔ Individuel',
      left: 'Groupe',
      right: 'Individuel',
      code: { left: 'G', right: 'I' }
    }
  ]);
})(window.App = window.App || {});
