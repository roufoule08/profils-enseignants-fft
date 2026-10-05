/**
 * Les six profils.
 *
 * L'ordre de ce tableau est l'ordre d'affichage (accueil, salle) et sert
 * aussi de dernier critère pour départager deux profils à égalité.
 *
 * Ton à respecter dans tous les textes : valorisant, jamais critique.
 * L'IA est présentée comme une aide qui fait gagner du temps, pas comme
 * un remplacement du savoir-faire de l'enseignant ou de l'enseignante.
 *
 * Champs :
 *   family    : famille du profil (voir App.data.families)
 *   image     : photo du joueur ou de la joueuse miroir [À VALIDER : droits à l'image, voir DECISIONS.md D-10]
 *   names     : nom du profil au masculin (m), au féminin (f) et sous les deux formes (both)
 *   strengths : 3 points forts
 *   pistes    : 3 pistes concrètes où l'IA facilite le travail { title, text }
 *   prompt    : consigne prête à copier pour un premier essai
 *   statsIntro: phrase qui relie les chiffres au profil
 *   stats     : repères chiffrés issus des études { value, label, source }
 *   axes      : position du profil sur chaque axe, de -1 à +1
 *               (-1 = Terrain / Repères / Groupe, +1 = Club / Exploration / Individuel)
 */
(function (App) {
  'use strict';

  App.data = App.data || {};

  var NA_2024 = 'Enquête métier, Ligue de Nouvelle-Aquitaine de tennis, 2024 (729 éducateurs)';

  App.data.profiles = Object.freeze([
    {
      id: 'passeur',
      family: 'court',
      names: { m: 'Le Passeur', f: 'La Passeuse', both: 'Le Passeur · La Passeuse' },
      player: 'Yannick Noah',
      image: 'assets/img/profils/passeur.jpg',
      quote: 'Ma fierté, c’est de les voir progresser.',
      intro: 'Vous placez la progression des élèves et la relation pédagogique au cœur de votre métier.',
      strengths: ['Pédagogie et patience', 'Sens du jeu et de l’animation', 'Lien de confiance avec les familles'],
      pistes: [
        {
          title: 'Adapter une séance à chaque niveau',
          text: 'Décrivez votre groupe (âge, niveau, objectif) : l’IA vous propose une trame et des variantes adaptées à chaque niveau du groupe. Vous gardez la main sur le choix final.'
        },
        {
          title: 'Gagner du temps avec les familles',
          text: 'Messages d’information, réponses aux questions fréquentes, bilans de trimestre : l’IA prépare un premier jet, vous le relisez et y ajoutez votre regard.'
        },
        {
          title: 'Suivre la progression de chaque enfant',
          text: 'Notez quelques mots après la séance : l’IA les transforme en suivi clair et lisible, prêt à partager avec l’enfant et sa famille.'
        }
      ],
      prompt: 'Prépare une séance d’une heure pour 8 enfants de 7-8 ans, niveau orange, objectif : le service. Propose 3 exercices ludiques et une variante pour les plus avancés.',
      statsIntro: 'Votre profil est au cœur du métier : faire progresser les plus jeunes est le quotidien de la grande majorité de la profession.',
      stats: [
        { value: '87 %', label: 'des personnes interrogées encadrent l’école de tennis', source: NA_2024 },
        { value: '68 %', label: 'encadrent le mini-tennis', source: NA_2024 },
        { label: 'La transmission est décrite comme « la plus belle satisfaction » du métier', source: 'Rundstadler, 2025 (environ 40 entretiens, 12 clubs)' }
      ],
      axes: { terrainClub: -0.8, reperesExploration: 0.4, groupeIndividuel: -0.8 }
    },
    {
      id: 'coach',
      family: 'court',
      names: { m: 'Le Coach de compétition', f: 'La Coach de compétition', both: 'Le ou la Coach de compétition' },
      player: 'Novak Djokovic',
      image: 'assets/img/profils/coach.jpg',
      quote: 'Sur le court, c’est le résultat qui parle.',
      intro: 'Vous aimez transformer l’observation en progression mesurable, avec des repères précis.',
      strengths: ['Expertise technique et tactique', 'Exigence et sens de la performance', 'Crédibilité sportive'],
      pistes: [
        {
          title: 'Individualiser les plans d’entraînement',
          text: 'À partir du profil d’un joueur ou d’une joueuse (niveau, objectifs, calendrier), l’IA propose une base de plan que vous ajustez avec votre expertise.'
        },
        {
          title: 'Tirer davantage de vos notes de match',
          text: 'Collez vos observations ou vos statistiques : l’IA les organise et fait ressortir les axes de travail récurrents, en quelques secondes.'
        },
        {
          title: 'Planifier la saison et la charge',
          text: 'Tournois, périodes de travail, récupération : l’IA vous aide à bâtir un calendrier cohérent et à le réajuster quand le programme change.'
        }
      ],
      prompt: 'Voici mes notes sur le dernier match de mon élève de 15 ans : […]. Identifie 3 axes de travail et propose un cycle de 4 semaines.',
      statsIntro: 'La compétition fait partie du quotidien d’une grande partie de la profession, et vos envies de formation sont largement partagées.',
      stats: [
        { value: '55 %', label: 'des personnes interrogées encadrent un centre d’entraînement jeunes', source: NA_2024 },
        { value: '19,5 %', label: 'souhaitent se former à la préparation mentale, 16,6 % à la préparation physique', source: NA_2024 }
      ],
      axes: { terrainClub: -0.6, reperesExploration: -0.4, groupeIndividuel: 0.8 }
    },
    {
      id: 'batisseur',
      family: 'club',
      names: { m: 'Le Bâtisseur', f: 'La Bâtisseuse', both: 'Le Bâtisseur · La Bâtisseuse' },
      player: 'Amélie Mauresmo',
      image: 'assets/img/profils/batisseur.jpg',
      quote: 'Je fais tourner le club.',
      intro: 'Vous reliez le terrain, l’équipe et le projet de club pour faire avancer le collectif.',
      strengths: ['Vision d’ensemble', 'Organisation et coordination d’équipe', 'Relais entre bénévoles, fédération et collectivité'],
      pistes: [
        {
          title: 'Alléger les dossiers de subvention',
          text: 'Donnez vos chiffres et vos objectifs : l’IA rédige une première version du projet sportif, que vous complétez avec votre connaissance du club.'
        },
        {
          title: 'Garder une trace claire des réunions',
          text: 'Dictez ou collez vos notes : l’IA en fait un compte rendu structuré, avec les décisions et la liste des actions à suivre.'
        },
        {
          title: 'Piloter avec des outils simples',
          text: 'Plannings des courts, répartition des groupes, tableau de bord mensuel : l’IA vous aide à les construire et à les mettre à jour plus vite.'
        }
      ],
      prompt: 'À partir de ces chiffres d’effectifs : […], rédige en une page la partie « projet sportif » du dossier de subvention municipale.',
      statsIntro: 'Coordonner les projets et faire le lien avec la fédération sont des rôles reconnus et recherchés dans les clubs.',
      stats: [
        { value: '12 clubs', label: 'étudiés : coordonner les projets et faire le lien avec la fédération y sont des rôles clés', source: 'Rundstadler, 2025' },
        { value: '9 %', label: 'des personnes interrogées sont titulaires du DESJEPS', source: NA_2024 }
      ],
      axes: { terrainClub: 0.9, reperesExploration: -0.2, groupeIndividuel: -0.6 }
    },
    {
      id: 'entrepreneur',
      family: 'club',
      names: { m: 'L’Entrepreneur', f: 'L’Entrepreneuse', both: 'L’Entrepreneur · L’Entrepreneuse' },
      player: 'Serena Williams',
      image: 'assets/img/profils/entrepreneur.jpg',
      quote: 'Chaque créneau compte.',
      intro: 'Vous construisez des cours et des stages qui répondent aux attentes de vos élèves.',
      strengths: ['Sens du service', 'Autonomie', 'Capacité à proposer de nouveaux cours et stages'],
      pistes: [
        {
          title: 'Faire connaître vos stages et vos cours',
          text: 'Décrivez votre stage : l’IA rédige l’annonce pour le site du club, les réseaux sociaux ou un message aux familles, dans le ton que vous choisissez.'
        },
        {
          title: 'Simplifier les rappels et les relances',
          text: 'Confirmations d’inscription, rappels de paiement, messages de rentrée : l’IA vous prépare des modèles réutilisables en quelques minutes.'
        },
        {
          title: 'Organiser votre planning sur plusieurs structures',
          text: 'Listez vos créneaux et vos contraintes : l’IA vous aide à comparer plusieurs organisations possibles de votre semaine.'
        }
      ],
      prompt: 'Propose 3 stages de vacances pour adultes débutants, avec pour chacun un texte d’annonce court et un message à envoyer aux membres du club.',
      statsIntro: 'Votre façon de travailler, entre plusieurs structures et une activité indépendante, est celle d’une large part de la profession.',
      stats: [
        { value: '45 %', label: 'des personnes interrogées ont une part d’activité libérale', source: NA_2024 },
        { value: '26 %', label: 'travaillent dans plusieurs structures', source: NA_2024 },
        { value: '82 %', label: 'encadrent des adultes en tennis loisir', source: NA_2024 }
      ],
      axes: { terrainClub: 0.7, reperesExploration: 0.7, groupeIndividuel: 0.7 }
    },
    {
      id: 'jeune-pro',
      family: 'traj',
      names: { m: 'Le Jeune Pro', f: 'La Jeune Pro', both: 'Le ou la Jeune Pro' },
      player: 'Carlos Alcaraz',
      image: 'assets/img/profils/jeune-pro.jpg',
      quote: 'J’apprends tous les jours.',
      intro: 'Vous progressez par l’essai, l’observation et la recherche de nouvelles méthodes.',
      strengths: ['Énergie et curiosité', 'Aisance avec le numérique', 'Envie de se former'],
      pistes: [
        {
          title: 'Réviser et préparer vos examens',
          text: 'L’IA peut vous interroger sur le programme de votre diplôme, vous expliquer une notion autrement ou corriger un écrit d’entraînement.'
        },
        {
          title: 'Construire votre banque d’exercices',
          text: 'Pour chaque objectif (service, déplacement, jeu au filet), l’IA vous propose des exercices commentés que vous testez et classez au fil des séances.'
        },
        {
          title: 'Vous préparer aux situations délicates',
          text: 'Entraînez-vous à répondre à un parent mécontent ou à gérer un groupe agité : l’IA joue le rôle, vous testez vos réponses en toute tranquillité.'
        }
      ],
      prompt: 'Joue le rôle d’un parent mécontent que son enfant ne passe pas en groupe compétition. Je m’entraîne à lui répondre.',
      statsIntro: 'Vous faites partie d’une génération nombreuse, qui se forme activement.',
      stats: [
        { value: '30 %', label: 'des personnes interrogées ont entre 18 et 30 ans', source: NA_2024 },
        { value: '69 %', label: 'des 18-30 ans ont un projet de formation diplômante', source: NA_2024 }
      ],
      axes: { terrainClub: -0.3, reperesExploration: 0.9, groupeIndividuel: -0.2 }
    },
    {
      id: 'sage',
      family: 'traj',
      names: { m: 'Le Sage', f: 'La Sage', both: 'Le ou la Sage' },
      player: 'Roger Federer',
      image: 'assets/img/profils/sage.jpg',
      quote: 'J’ai tout vu passer. Montrez-moi que ça marche.',
      intro: 'Vous vous appuyez sur l’expérience et retenez les nouveautés qui apportent une vraie valeur.',
      strengths: ['Expérience et recul', 'Fidélité des membres du club', 'Transmission aux jeunes collègues'],
      pistes: [
        {
          title: 'Mettre votre savoir-faire au propre',
          text: 'Vos progressions et vos méthodes qui fonctionnent depuis des années : l’IA vous aide à les mettre en forme en fiches claires.'
        },
        {
          title: 'Parler au lieu d’écrire',
          text: 'Pas besoin de tout réapprendre : vous dictez à voix haute, l’IA rédige le texte. Idéal pour la paperasse et les comptes rendus.'
        },
        {
          title: 'Transmettre à l’équipe',
          text: 'Transformez votre expérience en supports simples pour les jeunes collègues : fiches de séance, conseils, repères de progression.'
        }
      ],
      prompt: 'Je te dicte ma progression pour enseigner le revers à une main : […]. Mets-la au propre en une fiche d’une page pour mes jeunes collègues.',
      statsIntro: 'Votre expérience est une ressource précieuse pour le club : près d’un quart de la profession a 51 ans et plus.',
      stats: [
        { value: '24 %', label: 'des personnes interrogées ont 51 ans et plus', source: NA_2024 },
        { label: 'Avec l’expérience, on apprend d’abord par la pratique, sur le terrain', source: 'Cortela et al., 2022 ; Anderson et al., 2021' }
      ],
      axes: { terrainClub: -0.4, reperesExploration: -0.9, groupeIndividuel: 0.1 }
    }
  ]);

  /** Retourne le profil correspondant à `id`, ou `undefined`. */
  App.data.getProfile = function (id) {
    return App.data.profiles.find(function (p) { return p.id === id; });
  };

  /**
   * Les 3 familles de profils (documentation de reprise, « Les 3 familles »).
   * La couleur reprend la surface de court associée à chaque famille.
   */
  App.data.families = Object.freeze({
    court: { name: 'Sur le court', surface: 'Terre battue' },
    club: { name: 'Autour du court', surface: 'Surface dure' },
    traj: { name: 'Trajectoires', surface: 'Gazon' }
  });

  /**
   * Nom affiché du profil : toujours les deux formes (« Le Passeur · La Passeuse »),
   * pour que chacune et chacun s'y reconnaisse sans qu'on demande le genre
   * (aucune donnée nouvelle : voir DECISIONS.md, D-09).
   */
  App.data.profileName = function (profile) {
    return profile.names.both;
  };
})(window.App = window.App || {});
