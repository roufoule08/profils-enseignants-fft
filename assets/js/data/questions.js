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
        { label: 'Un joueur progresse', points: { passeur: 1 } },
        { label: 'Un résultat en match', points: { coach: 1 } },
        { label: 'Un projet avance', points: { batisseur: 1 } },
        { label: 'Une activité se remplit', points: { entrepreneur: 1 } },
        { label: 'Une nouvelle séance fonctionne', points: { 'jeune-pro': 1 } },
        { label: 'Un conseil est transmis', points: { sage: 1 } }
      ]
    },
    {
      id: 'temps-hors-court',
      text: 'Ce qui vous prend le plus de temps hors du court ?',
      answers: [
        { label: 'Préparer les séances', points: { passeur: 1 } },
        { label: 'Analyser les matchs', points: { coach: 1 } },
        { label: 'Gérer les projets', points: { batisseur: 1 } },
        { label: 'Communiquer', points: { entrepreneur: 1 } },
        { label: 'Me former', points: { 'jeune-pro': 1 } },
        { label: 'La paperasse', points: { sage: 1 } }
      ]
    },
    {
      id: 'legitimite',
      text: 'Votre légitimité vient d’abord de…',
      tiebreaker: true,
      answers: [
        { label: 'Ma pédagogie', points: { passeur: 1 } },
        { label: 'Mon niveau de jeu', points: { coach: 1 } },
        { label: 'Mon organisation', points: { batisseur: 1 } },
        { label: 'Ma clientèle', points: { entrepreneur: 1 } },
        { label: 'Mon envie d’apprendre', points: { 'jeune-pro': 1 } },
        { label: 'Mon expérience', points: { sage: 1 } }
      ]
    },
    {
      id: 'public-prefere',
      text: 'Votre public préféré ?',
      answers: [
        { label: 'Les jeunes', points: { passeur: 1 } },
        { label: 'Les compétiteurs', points: { coach: 1 } },
        { label: 'Tout le club', points: { batisseur: 1 } },
        { label: 'Les adultes', points: { entrepreneur: 1 } },
        { label: 'Tous les publics', points: { 'jeune-pro': 1 } },
        { label: 'Les fidèles', points: { sage: 1 } }
      ]
    },
    {
      id: 'deux-heures',
      text: 'Avec deux heures disponibles, vous…',
      answers: [
        { label: 'Inventez des jeux', points: { passeur: 1 } },
        { label: 'Analysez des matchs', points: { coach: 1 } },
        { label: 'Avancez un projet', points: { batisseur: 1 } },
        { label: 'Créez une offre', points: { entrepreneur: 1 } },
        { label: 'Testez un outil', points: { 'jeune-pro': 1 } },
        { label: 'Transmettez', points: { sage: 1 } }
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
        { label: 'Testez pour les élèves', points: { passeur: 1 } },
        { label: 'Demandez des preuves', points: { coach: 1 } },
        { label: 'Regardez le collectif', points: { batisseur: 1 } },
        { label: 'Mesurez la valeur', points: { entrepreneur: 1 } },
        { label: 'Foncez', points: { 'jeune-pro': 1 } },
        { label: 'Attendez une démonstration', points: { sage: 1 } }
      ]
    },
    {
      id: 'devise',
      text: 'Votre devise ?',
      answers: [
        { label: 'Chaque enfant progresse', points: { passeur: 1 } },
        { label: 'Le terrain ne ment pas', points: { coach: 1 } },
        { label: 'Ensemble on va loin', points: { batisseur: 1 } },
        { label: 'Mon créneau, ma valeur', points: { entrepreneur: 1 } },
        { label: 'Toujours en progrès', points: { 'jeune-pro': 1 } },
        { label: 'L’expérience avant tout', points: { sage: 1 } }
      ]
    },
    {
      id: 'ia-frequence',
      text: 'Aujourd’hui, l’IA et vous ?',
      answers: [
        { label: 'Jamais essayé', iaLevel: 0 },
        { label: 'Testé une fois', iaLevel: 1 },
        { label: 'De temps en temps', iaLevel: 2 },
        { label: 'Chaque semaine', iaLevel: 3 },
        { label: 'Tous les jours', iaLevel: 4 }
      ]
    },
    {
      id: 'ia-usages',
      text: 'Pour quoi l’avez-vous déjà utilisée ?',
      answers: [
        { label: 'Rien encore', iaLevel: 0 },
        { label: 'Questions générales', iaLevel: 1 },
        { label: 'Messages ou posts', iaLevel: 2, points: { entrepreneur: 0.5 } },
        { label: 'Séances ou plans', iaLevel: 3, points: { passeur: 0.5, coach: 0.5 } },
        { label: 'Données ou automatisation', iaLevel: 4, points: { coach: 0.5, batisseur: 0.5 } }
      ]
    }
  ]);

  /** Libellés des niveaux d'usage de l'IA, indexés de 0 à 4. */
  App.data.iaLevels = Object.freeze(['Découverte', 'Curieux', 'Utilisateur', 'Pratiquant', 'Moteur']);
})(window.App = window.App || {});
