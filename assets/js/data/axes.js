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
        left: 'Vous tirez votre énergie de la séance, de l’observation et du contact direct avec vos élèves.',
        right: 'Vous êtes à l’aise pour faire vivre l’activité au-delà du court : organisation, projets, vie du club.',
        balanced: 'Vous combinez présence sur le terrain et contribution au projet du club.'
      }
    },
    {
      key: 'reperesExploration',
      label: 'Repères ↔ Exploration',
      left: 'Repères',
      right: 'Exploration',
      code: { left: 'R', right: 'X' },
      texts: {
        left: 'Vos méthodes éprouvées sont un socle solide : l’IA peut vous aider à les formaliser et à les partager.',
        right: 'Vous aimez essayer de nouvelles approches : l’IA peut vous aider à garder une trace de ce qui fonctionne.',
        balanced: 'Vous alternez méthodes éprouvées et nouvelles idées selon le contexte.'
      }
    },
    {
      key: 'groupeIndividuel',
      label: 'Groupe ↔ Individuel',
      left: 'Groupe',
      right: 'Individuel',
      code: { left: 'G', right: 'I' },
      texts: {
        left: 'Vous aimez faire vivre la dynamique du groupe et partager vos savoir-faire.',
        right: 'Vous aimez adapter votre accompagnement à chaque personne et à ses objectifs.',
        balanced: 'Vous passez volontiers de la dynamique de groupe au suivi individuel, selon les besoins.'
      }
    }
  ]);

  /** Seuils d'interprétation des axes (en % du pôle de gauche). */
  App.data.axisThresholds = Object.freeze({ strongLeft: 60, strongRight: 40 });
})(window.App = window.App || {});
