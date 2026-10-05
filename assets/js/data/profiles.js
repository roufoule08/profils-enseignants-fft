/**
 * Les six profils.
 *
 * L'ordre de ce tableau est l'ordre d'affichage (accueil, salle) et sert
 * aussi de dernier critère pour départager deux profils à égalité.
 *
 * `axes` : position du profil sur chaque axe, de -1 à +1.
 *   -1 = pôle de gauche (Terrain, Repères, Groupe)
 *   +1 = pôle de droite (Club, Exploration, Individuel)
 * Voir data/axes.js pour la définition des axes.
 */
(function (App) {
  'use strict';

  App.data = App.data || {};

  App.data.profiles = Object.freeze([
    {
      id: 'passeur',
      name: 'Le Passeur',
      player: 'Yannick Noah',
      image: 'assets/img/profils/passeur.jpg',
      quote: 'Ma fierté, c’est de les voir progresser.',
      intro: 'Vous placez la progression et la relation pédagogique au centre de votre métier.',
      strengths: ['Pédagogie patiente', 'Animation du groupe', 'Lien avec les familles'],
      watchouts: [
        'Éviter de porter seul le suivi de chacun',
        'Garder du temps pour préparer sans vous disperser'
      ],
      nextSteps: [
        'Créer une trame de séance réutilisable',
        'Formaliser un bilan court après chaque cycle'
      ],
      aiUses: ['Différencier une séance', 'Créer des variantes', 'Rédiger un bilan'],
      prompt: 'Prépare une séance d’une heure pour huit enfants, niveau orange, objectif service.',
      stats: [
        { value: '87 %', label: 'encadrent l’école de tennis' },
        { value: '68 %', label: 'encadrent le mini-tennis' }
      ],
      axes: { terrainClub: -0.8, reperesExploration: 0.4, groupeIndividuel: -0.8 }
    },
    {
      id: 'coach',
      name: 'Le Coach de compétition',
      player: 'Novak Djokovic',
      image: 'assets/img/profils/coach.jpg',
      quote: 'Sur le court, c’est le résultat qui parle.',
      intro: 'Vous recherchez des repères précis pour transformer l’observation en progression mesurable.',
      strengths: ['Expertise technique', 'Analyse tactique', 'Exigence'],
      watchouts: [
        'Ne pas réduire la progression au résultat',
        'Préserver une charge soutenable'
      ],
      nextSteps: [
        'Définir trois indicateurs par cycle',
        'Partager un objectif simple avec le joueur'
      ],
      aiUses: ['Analyser des notes', 'Structurer un cycle', 'Préparer une routine mentale'],
      prompt: 'À partir de mes notes de match, identifie trois axes et propose un cycle de quatre semaines.',
      stats: [
        { value: '55 %', label: 'encadrent un centre jeunes' },
        { value: '19,5 %', label: 'citent la préparation mentale' }
      ],
      axes: { terrainClub: -0.6, reperesExploration: -0.4, groupeIndividuel: 0.8 }
    },
    {
      id: 'batisseur',
      name: 'Le Bâtisseur',
      player: 'Amélie Mauresmo',
      image: 'assets/img/profils/batisseur.jpg',
      quote: 'Je fais tourner le club.',
      intro: 'Vous reliez le terrain, l’équipe et le projet de club pour faire avancer le collectif.',
      strengths: ['Vision d’ensemble', 'Coordination', 'Organisation'],
      watchouts: [
        'Protéger du temps de terrain',
        'Ne pas absorber toutes les demandes'
      ],
      nextSteps: [
        'Clarifier les responsabilités',
        'Installer un tableau de bord mensuel'
      ],
      aiUses: ['Préparer un dossier', 'Résumer une réunion', 'Structurer un planning'],
      prompt: 'Rédige la partie projet sportif d’un dossier de subvention.',
      stats: [
        { value: '12', label: 'clubs étudiés pour les rôles projet' },
        { value: '9 %', label: 'des enseignants sont DES' }
      ],
      axes: { terrainClub: 0.9, reperesExploration: -0.2, groupeIndividuel: -0.6 }
    },
    {
      id: 'entrepreneur',
      name: 'L’Entrepreneur',
      player: 'Serena Williams',
      image: 'assets/img/profils/entrepreneur.jpg',
      quote: 'Mon planning, c’est mon chiffre d’affaires.',
      intro: 'Vous transformez les besoins des pratiquants en offres concrètes et lisibles.',
      strengths: ['Sens du service', 'Autonomie', 'Création d’offres'],
      watchouts: [
        'Ne pas multiplier les offres sans mesurer leur valeur',
        'Sécuriser le cadre club et indépendant'
      ],
      nextSteps: [
        'Suivre remplissage et fidélisation',
        'Créer une offre test avant généralisation'
      ],
      aiUses: ['Rédiger une offre', 'Préparer une relance', 'Comparer des scénarios'],
      prompt: 'Crée trois offres de stage pour adultes débutants.',
      stats: [
        { value: '45 %', label: 'ont une activité libérale' },
        { value: '26 %', label: 'travaillent dans plusieurs structures' },
        { value: '82 %', label: 'encadrent des adultes loisirs' }
      ],
      axes: { terrainClub: 0.7, reperesExploration: 0.7, groupeIndividuel: 0.7 }
    },
    {
      id: 'jeune-pro',
      name: 'Le Jeune Pro',
      player: 'Carlos Alcaraz',
      image: 'assets/img/profils/jeune-pro.jpg',
      quote: 'J’apprends tous les jours.',
      intro: 'Vous progressez par l’essai, l’observation et la recherche de nouvelles méthodes.',
      strengths: ['Énergie', 'Curiosité', 'Aisance numérique'],
      watchouts: [
        'Éviter de changer trop vite de méthode',
        'Transformer les essais en repères stables'
      ],
      nextSteps: [
        'Conserver un journal de séance',
        'Demander un retour ciblé à un pair'
      ],
      aiUses: ['Réviser', 'Créer des exercices', 'Simuler une situation'],
      prompt: 'Joue un parent mécontent afin que je m’entraîne à lui répondre.',
      stats: [
        { value: '30 %', label: 'ont entre 18 et 30 ans' },
        { value: '69 %', label: 'ont un projet diplômant' }
      ],
      axes: { terrainClub: -0.3, reperesExploration: 0.9, groupeIndividuel: -0.2 }
    },
    {
      id: 'sage',
      name: 'Le Sage',
      player: 'Roger Federer',
      image: 'assets/img/profils/sage.jpg',
      quote: 'Montrez-moi que ça marche.',
      intro: 'Vous vous appuyez sur l’expérience et retenez les nouveautés qui apportent une valeur claire.',
      strengths: ['Expérience', 'Recul', 'Transmission'],
      watchouts: [
        'Ne pas écarter une nouveauté avant un test court',
        'Rendre vos savoir-faire transmissibles'
      ],
      nextSteps: [
        'Formaliser une méthode qui fonctionne',
        'Tester un usage nouveau sur une tâche précise'
      ],
      aiUses: ['Mettre au propre', 'Dicter une trame', 'Capitaliser une méthode'],
      prompt: 'Mets au propre ma progression pédagogique en une fiche.',
      stats: [
        { value: '24 %', label: 'ont 51 ans et plus' },
        { value: '79 %', label: 'sont sans projet diplômant' }
      ],
      axes: { terrainClub: -0.4, reperesExploration: -0.9, groupeIndividuel: 0.1 }
    }
  ]);

  /** Retourne le profil correspondant à `id`, ou `undefined`. */
  App.data.getProfile = function (id) {
    return App.data.profiles.find(function (p) { return p.id === id; });
  };
})(window.App = window.App || {});
