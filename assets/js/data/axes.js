/**
 * Les trois axes du portrait.
 *
 * Le score d'un axe est le pourcentage du pôle de gauche (0 à 100).
 * Au-dessus de 50 %, le pôle de gauche l'emporte et donne la lettre `code.left`.
 *
 * Textes d'interprétation :
 *   - `texts.left`     si le score est >= 60
 *   - `texts.right`    si le score est <= 40
 *   - `texts.balanced` entre les deux
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
      code: { left: 'T', right: 'K' },
      texts: {
        left: 'Votre résultat indique une forte orientation terrain : vous tirez votre énergie de la séance, de l’observation et du contact direct avec les pratiquants.',
        right: 'Votre résultat indique une orientation club : vous êtes à l’aise pour structurer l’activité au-delà du court.',
        balanced: 'Vous combinez de façon équilibrée présence sur le terrain et contribution au projet de club.'
      }
    },
    {
      key: 'reperesExploration',
      label: 'Repères ↔ Exploration',
      left: 'Repères',
      right: 'Exploration',
      code: { left: 'R', right: 'X' },
      texts: {
        left: 'Vous privilégiez les repères éprouvés. Cette stabilité sécurise votre pratique, à condition de garder un espace de test limité pour les nouveautés.',
        right: 'Vous aimez explorer. Cette curiosité stimule votre progression, à condition de transformer les essais concluants en routines.',
        balanced: 'Vous alternez repères et exploration selon le contexte.'
      }
    },
    {
      key: 'groupeIndividuel',
      label: 'Groupe ↔ Individuel',
      left: 'Groupe',
      right: 'Individuel',
      code: { left: 'G', right: 'I' },
      texts: {
        left: 'Votre approche est collective : vous cherchez la dynamique du groupe et la transmission partagée.',
        right: 'Votre approche est plus individualisée : vous adaptez volontiers le suivi à une personne ou à un objectif précis.',
        balanced: 'Vous passez volontiers de la dynamique de groupe au suivi individuel selon les besoins des pratiquants.'
      }
    }
  ]);

  /** Seuils d'interprétation des axes (en % du pôle de gauche). */
  App.data.axisThresholds = Object.freeze({ strongLeft: 60, strongRight: 40 });
})(window.App = window.App || {});
