/**
 * Les questions du questionnaire.
 *
 * Chaque réponse déclare explicitement ce qu'elle rapporte :
 *   - `points`  : points ajoutés aux profils, ex. { passeur: 1 }
 *   - `iaLevel` : niveau d'usage de l'IA de 0 à 4 (questions IA uniquement)
 *
 * `tiebreaker: true` : en cas d'égalité de score, le profil désigné par la
 * réponse à cette question passe devant.
 *
 * Règles d'écriture :
 *   - chaque réponse commence par un verbe et se comprend sans relire la question ;
 *   - formulations valables pour les femmes comme pour les hommes ;
 *   - aucune réponse ne doit paraître moins valorisante qu'une autre.
 *
 * Pour ajouter, retirer ou modifier une question, il suffit d'éditer ce
 * fichier : le reste du site s'adapte automatiquement.
 */
(function (App) {
  'use strict';

  App.data = App.data || {};

  App.data.questions = Object.freeze([
    {
      id: 'meilleur-moment',
      text: 'Votre meilleur moment de la semaine ?',
      answers: [
        { label: 'Voir mes élèves progresser', points: { passeur: 1 } },
        { label: 'Fêter un bon résultat en match', points: { coach: 1 } },
        { label: 'Voir un projet du club avancer', points: { batisseur: 1 } },
        { label: 'Voir un stage ou un cours afficher complet', points: { entrepreneur: 1 } },
        { label: 'Réussir une nouvelle séance que je teste', points: { 'jeune-pro': 1 } },
        { label: 'Voir un conseil que j’ai transmis être appliqué', points: { sage: 1 } }
      ]
    },
    {
      id: 'temps-hors-court',
      text: 'Qu’est-ce qui vous prend le plus de temps hors du court ?',
      answers: [
        { label: 'Préparer les séances', points: { passeur: 1 } },
        { label: 'Analyser les matchs et planifier l’entraînement', points: { coach: 1 } },
        { label: 'Gérer les projets du club', points: { batisseur: 1 } },
        { label: 'Communiquer avec les licenciés', points: { entrepreneur: 1 } },
        { label: 'Me former et réviser', points: { 'jeune-pro': 1 } },
        { label: 'Remplir les papiers administratifs', points: { sage: 1 } }
      ]
    },
    {
      id: 'atout',
      text: 'Votre principal atout dans le métier ?',
      tiebreaker: true,
      answers: [
        { label: 'Savoir expliquer et faire progresser', points: { passeur: 1 } },
        { label: 'Apporter mon niveau de jeu et mon œil technique', points: { coach: 1 } },
        { label: 'Organiser et coordonner', points: { batisseur: 1 } },
        { label: 'Fidéliser mes élèves', points: { entrepreneur: 1 } },
        { label: 'Apprendre en continu', points: { 'jeune-pro': 1 } },
        { label: 'M’appuyer sur mon expérience', points: { sage: 1 } }
      ]
    },
    {
      id: 'public',
      text: 'Avec qui aimez-vous le plus travailler ?',
      answers: [
        { label: 'Faire découvrir le tennis aux enfants (école de tennis, mini-tennis)', points: { passeur: 1 } },
        { label: 'Entraîner des compétiteurs et compétitrices', points: { coach: 1 } },
        { label: 'Faire vivre tout le club (équipes, bénévoles, dirigeants)', points: { batisseur: 1 } },
        { label: 'Accompagner des adultes en cours particulier ou en stage', points: { entrepreneur: 1 } },
        { label: 'Essayer tous les publics pour trouver le mien', points: { 'jeune-pro': 1 } },
        { label: 'Suivre des membres fidèles depuis des années', points: { sage: 1 } }
      ]
    },
    {
      id: 'deux-heures',
      text: 'On vous offre deux heures de libre. Vous…',
      answers: [
        { label: 'Mettez en place de nouvelles activités pour vos groupes', points: { passeur: 1 } },
        { label: 'Analysez des vidéos de matchs', points: { coach: 1 } },
        { label: 'Avancez un projet du club', points: { batisseur: 1 } },
        { label: 'Préparez un nouveau stage ou un nouveau cours', points: { entrepreneur: 1 } },
        { label: 'Testez un nouvel outil', points: { 'jeune-pro': 1 } },
        { label: 'Partagez votre expérience avec de jeunes collègues', points: { sage: 1 } }
      ]
    },
    {
      id: 'anciennete',
      text: 'Où en êtes-vous dans le métier ?',
      answers: [
        { label: 'Moins de 3 ans', points: { 'jeune-pro': 2 } },
        { label: '3 à 10 ans', points: { passeur: 1, coach: 1 } },
        { label: '10 à 20 ans', points: { batisseur: 1, entrepreneur: 1 } },
        { label: 'Plus de 20 ans', points: { sage: 2 } }
      ]
    },
    {
      id: 'nouvel-outil',
      text: 'Face à un nouvel outil, vous…',
      answers: [
        { label: 'Testez vous-même pour les élèves', points: { passeur: 1 } },
        { label: 'Cherchez des preuves de son efficacité', points: { coach: 1 } },
        { label: 'Regardez comment le collectif réagit', points: { batisseur: 1 } },
        { label: 'Mesurez ce qu’il vous apporte concrètement', points: { entrepreneur: 1 } },
        { label: 'Foncez et l’essayez tout de suite', points: { 'jeune-pro': 1 } },
        { label: 'Attendez de le voir fonctionner sur le terrain', points: { sage: 1 } }
      ]
    },
    {
      id: 'devise',
      text: 'Votre devise ?',
      answers: [
        { label: 'Chaque enfant progresse à son rythme', points: { passeur: 1 } },
        { label: 'Le terrain ne ment pas', points: { coach: 1 } },
        { label: 'Seul on va vite, ensemble on va loin', points: { batisseur: 1 } },
        { label: 'Des élèves satisfaits reviennent toujours', points: { entrepreneur: 1 } },
        { label: 'J’apprends quelque chose à chaque séance', points: { 'jeune-pro': 1 } },
        { label: 'L’expérience avant tout', points: { sage: 1 } }
      ]
    },
    {
      // Question clé pour l'analyse : fréquence d'usage, du jamais au quotidien.
      id: 'ia-frequence',
      text: 'À quelle fréquence utilisez-vous l’IA (ChatGPT, Copilot, Gemini…) ?',
      answers: [
        { label: 'Je ne l’ai jamais utilisée', iaLevel: 0 },
        { label: 'Je l’ai testée une ou deux fois', iaLevel: 1 },
        { label: 'Je l’utilise quelques fois par mois', iaLevel: 2 },
        { label: 'Je l’utilise chaque semaine', iaLevel: 3 },
        { label: 'Je l’utilise tous les jours ou presque', iaLevel: 4 }
      ]
    },
    {
      // Question clé pour l'analyse : usage principal, du plus simple au plus avancé.
      id: 'ia-usages',
      text: 'Pour quel usage principal l’avez-vous déjà utilisée ?',
      answers: [
        { label: 'Pas encore utilisée pour l’instant', iaLevel: 0 },
        { label: 'Poser des questions générales', iaLevel: 1 },
        { label: 'Faciliter la communication dans le club', iaLevel: 2, points: { entrepreneur: 0.5 } },
        { label: 'Mettre en place des séances ou des plans d’action', iaLevel: 3, points: { passeur: 0.5, coach: 0.5 } },
        { label: 'Analyser des données ou automatiser une tâche', iaLevel: 4, points: { coach: 0.5, batisseur: 0.5 } }
      ]
    }
  ]);

  /**
   * Niveaux d'usage de l'IA, indexés de 0 à 4.
   * Les noms décrivent un usage (et non une personne) pour rester valables pour toutes et tous.
   */
  App.data.iaLevels = Object.freeze([
    { name: 'Découverte', message: 'Vous n’avez pas encore essayé : c’est le moment idéal. Cet atelier vous montre comment gagner du temps dès la semaine prochaine.' },
    { name: 'Premiers pas', message: 'Vous avez déjà fait un essai. Prochaine étape : l’utiliser régulièrement sur une tâche qui vous prend du temps.' },
    { name: 'Usage occasionnel', message: 'Vous l’utilisez de temps en temps. Des consignes adaptées à votre métier vous donneront des réponses plus précises et plus fiables.' },
    { name: 'Usage régulier', message: 'L’IA fait déjà partie de votre semaine. Vous pouvez aller plus loin : modèles de documents réutilisables, analyse de vos données.' },
    { name: 'Usage avancé', message: 'Vos usages peuvent inspirer vos collègues. Pourquoi ne pas devenir la personne référente IA de votre club ou de votre ligue ?' }
  ]);
})(window.App = window.App || {});
