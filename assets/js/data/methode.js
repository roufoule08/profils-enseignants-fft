/**
 * Contenu de la page « Sources et méthode ».
 * Source : documentation de reprise (« Sources et données exploitées »,
 * « Règles de calcul », « Limites connues du modèle »), plus les décisions
 * de DECISIONS.md pour la question 10 et le niveau IA (D-07, D-08), et le référentiel v3
 * (« regles.indicateurs ») pour les indicateurs.
 */
(function (App) {
  'use strict';

  App.data = App.data || {};

  App.data.methode = Object.freeze({
    intro: 'Les profils croisent des données chiffrées et des études qualitatives : plus de 1 000 enseignants et enseignantes de tennis dans 6 études, complétées par 5 sources de cadrage.',

    sources: [
      { name: 'Enquête métier, Ligue de Nouvelle-Aquitaine, 2024', type: 'Quantitative', volume: '729 éducateurs, 394 clubs', apport: 'Âge, sexe, diplômes, statuts, publics encadrés, besoins de formation' },
      { name: 'Rundstadler, 2025', type: 'Qualitative', volume: 'Environ 40 entretiens, 12 clubs', apport: '3 rôles (relais fédéral, gestionnaire de projets, animateur associatif) et 3 stratégies d’identité' },
      { name: 'Rundstadler, 1999', type: 'Qualitative', volume: '5 clubs', apport: '3 logiques d’action : professionnelle, associative, fédérale' },
      { name: 'Cortela et al., 2022', type: 'Quantitative', volume: '104 enseignants', apport: 'Rapport à la formation selon l’expérience' },
      { name: 'Kiamouri et al., 2024', type: 'Quantitative', volume: '106 enseignants', apport: 'Motivation, engagement, bien-être' },
      { name: 'Hewitt et Edwards', type: 'Qualitative', volume: '12 enseignants observés', apport: 'Styles pédagogiques dominants' },
      { name: 'Anderson et al., 2021', type: 'Qualitative', volume: '10 entraîneurs', apport: 'Conception des séances, apprentissage par l’expérience' },
      { name: 'UK Coaching, 2022', type: 'Quantitative', volume: 'Enquête nationale', apport: 'Motivations, freins, usage du numérique' },
      { name: 'INSEE, 2022', type: 'Cadrage', volume: '141 000 éducateurs sportifs', apport: '5 trajectoires d’emploi' },
      { name: 'Observatoire des métiers du sport, 2024', type: 'Cadrage', volume: '155 945 salariés', apport: 'Temps partiel, multi-employeurs, horaires' },
      { name: 'FFT et CDES, 2025', type: 'Cadrage', volume: 'Filière tennis', apport: 'Emplois salariés et indépendants' }
    ],

    steps: [
      'Vous répondez à 10 questions, une réponse par question : 8 sur le métier, puis 2 sur l’usage de l’IA.',
      'Chaque réponse donne des points à un ou deux profils. La question sur l’ancienneté compte double pour le Jeune Pro et le Sage, car leur identité tient à la place dans la carrière.',
      'Le profil qui obtient le plus de points est votre profil principal, le suivant votre profil secondaire. En cas d’égalité, la réponse à la question « Votre principal atout dans le métier ? » départage.',
      'Vos 3 indicateurs viennent directement de vos réponses. La part de la gestion et l’envie d’essayer additionnent les points de certaines réponses, rapportés à un maximum (12 et 9), en pourcentage. Le temps encore à gagner croise la part de la gestion avec votre niveau IA.',
      'Votre niveau IA correspond à votre fréquence d’usage de l’IA (question 9).',
      'Aucune donnée personnelle n’entre dans le calcul. Seul le résultat est gardé, dans votre navigateur.'
    ],

    limits: [
      'C’est un outil d’animation ludique, appuyé sur des études : ce n’est ni un test psychométrique validé ni une évaluation professionnelle.',
      'Les points de chaque réponse ont été fixés à dire d’expert : ils n’ont pas encore été ajustés sur de vraies réponses.',
      'La question sur l’ancienneté fait ressortir plus facilement le Jeune Pro et le Sage.',
      'Les pourcentages des indicateurs sont indicatifs : ce sont des tendances, pas des mesures.',
      'L’enquête chiffrée principale est régionale (Nouvelle-Aquitaine) : sa représentativité nationale n’est pas démontrée.',
      'Les profils ont été pensés pour les enseignants diplômés : les bénévoles peuvent moins s’y reconnaître.'
    ]
  });
})(window.App = window.App || {});
