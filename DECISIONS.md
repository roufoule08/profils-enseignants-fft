# Décisions et écarts au référentiel

Ce fichier trace chaque écart entre le site et ses sources de vérité :
le référentiel `referentiel-profils-v3.json`, puis la documentation de reprise.
Voir `CLAUDE.md`, section 2.

Un écart n'est **définitif qu'une fois validé par écrit par Soukaïna Benaddou (Pôle Innovation)**.
Il faut alors remplir la colonne « Validation » avec la date, puis reporter l'écart dans le JSON.

Les statuts possibles :
- **Appliqué, à valider** : demandé pendant le travail sur le site et déjà en ligne. Il faut le confirmer ou le refuser.
- **À arbitrer** : il faut d'abord choisir.
- **Validé** : confirmé par écrit.

> Le JSON v3 n'était pas disponible pour cette version. Les écarts sont donc mesurés
> par rapport à la documentation de reprise (version 2) et à l'audit du 5 octobre 2026.

| N° | Élément | Référentiel / documentation | Site | Raison | Statut | Validation |
|---|---|---|---|---|---|---|
| D-01 | Textes des questions 1 à 8 | Textes de la v2 (ex. Q1 A « Le mercredi avec l'école de tennis ») | Textes réécrits : un verbe en tête de chaque réponse, formulations valables pour les femmes comme pour les hommes, moins de termes « marketing ». Q8 A : « Chaque enfant progresse à son rythme ». | Compréhension et inclusion (CLAUDE.md §5) | Appliqué, à valider | |
| D-02 | Q3, Q5, Q7 (retours de la réunion) | Textes de la v2 | Q3 : « Apporter mon expertise technique et ma lecture du jeu », « Faire évoluer mes méthodes en permanence ». Q5 : « Testez un nouvel outil digital ou une nouvelle méthode pédagogique ». Q7 : « Face à un nouvel outil digital, vous… », « Cherchez des témoignages sur son efficacité » | Retours de la réunion du 5 octobre 2026 | Appliqué, à valider | |
| D-03 | Boutons du questionnaire | Non définis | « Servir le prochain point » et « Rejouer le point d'avant » | Ton ludique | Appliqué, à valider | |
| D-04 | Titre de l'accueil | Non défini | « Quel profil enseignant êtes-vous ? » | Message simple, centré sur le métier | Appliqué, à valider | |
| D-05 | Joueur miroir du Jeune Pro | Moïse Kouamé | Carlos Alcaraz | Moïse Kouamé est mineur (droit à l'image, voir l'état d'avancement de la documentation) | Appliqué, à valider | |
| D-06 | Noms des niveaux IA | Découverte, Curieux, Utilisateur, Pratiquant, Moteur | Découverte, Premiers pas, Usage occasionnel, Usage régulier, Usage avancé | Les noms décrivent un usage et non une personne, ils restent donc neutres pour le genre (CLAUDE.md §5) | Appliqué, à valider | |
| D-07 | Question 10 : réponses et points | 5 réponses, dont 2 qui donnent des points au Coach | 6 réponses (retours de la réunion). Chacune donne +0,5 à deux profils : séances → Passeur, Coach ; rédiger → Entrepreneur, Sage ; exercices → Passeur, Jeune Pro ; rechercher → Jeune Pro, Coach ; organiser le club → Bâtisseur, Entrepreneur ; jamais → aucun point | Les usages de la réunion. Répartition plus équilibrée : le biais vers le Coach relevé dans la documentation est réduit. | Appliqué, à valider | |
| D-08 | Calcul du niveau IA | Moyenne de Q9 et Q10, arrondie (étape 5) | Niveau = réponse à Q9 seule (0 à 4) | Les nouveaux usages de Q10 ne sont pas ordonnés du plus simple au plus avancé. Les 5 réponses de Q9 correspondent aux 5 niveaux. Effet : dans l'exemple chiffré de la documentation, le niveau passe de 3 à 2. | Appliqué, à valider | |
| D-09 | Accord des noms de profils | Noms au masculin | Les deux formes sont toujours affichées (« Le Passeur · La Passeuse », « Le ou la Sage »), sans poser de question sur le genre. L'écran « Vous êtes… » de la mise à jour 3 est retiré, et le genre déjà enregistré est effacé des appareils. | Inclusion sans nouvelle donnée personnelle, donc sans passer par le DPO (CLAUDE.md §6, audit écart n° 9) | Appliqué, à valider | |
| D-10 | Images | Pictogramme dans l'en-tête de la fiche. CLAUDE.md §6 : aucune photo de joueur ou de joueuse sans droits écrits. | Les 6 photos des joueurs et joueuses miroirs sont **conservées** (accueil, cartes, portrait). Une étiquette de famille à la couleur de sa surface est ajoutée : ocre #C75227, bleu #374BC4, vert #2F7D4F. | Maintien demandé explicitement lors des échanges du 5 octobre 2026. **Risque signalé par l'audit : KO bloquant.** Photos de presse sans droits à l'image ni droits photographe, logos de sponsors visibles. | **À arbitrer, en priorité** : obtenir les droits écrits ou décider du retrait (TICKET-01) | |
| D-11 | Devises | Entrepreneur : « Mon planning, c'est mon chiffre d'affaires. » ; Sage : « J'ai tout vu passer. Montrez-moi que ça marche. » | Entrepreneur : « Chaque créneau compte. » ; Sage : texte du référentiel rétabli | « Chiffre d'affaires » a été jugé trop marketing pour le public | Entrepreneur : à arbitrer ; Sage : conforme | |
| D-12 | Forces | Coach : « crédibilité de joueur » ; Entrepreneur : « sens du service et de la relation client », « capacité à créer de nouvelles offres » ; Sage : « fidélité des adhérents » | Coach : « Crédibilité sportive » ; Entrepreneur : « Sens du service », « Autonomie », « Capacité à proposer de nouveaux cours et stages » ; Sage : « Fidélité des membres du club ». Les autres forces sont celles du référentiel. | Inclusion, termes moins marketing | Appliqué, à valider | |
| D-13 | 3 pistes IA par profil | « Ce que l'IA apporte » : 3 éléments courts | Les 3 éléments sont développés en 3 pistes, avec un titre et une phrase concrète | Demande d'un portrait plus concret et constructif | Appliqué, à valider : textes rédigés à partir de la documentation | |
| D-14 | Prompts signature | Textes de la documentation | Ajout de passages […] à compléter. Formulations inclusives (« mon élève de 15 ans »). Entrepreneur sans nom de réseau social. | Prompt directement utilisable, inclusion | Appliqué, à valider | |
| D-15 | Repères chiffrés | Données d'ancrage | Libellés reformulés (« des personnes interrogées »). Chaque chiffre est suivi de sa source exacte. Une phrase relie les chiffres au profil (`statsIntro`). Passeur et Sage : un repère tiré des études qualitatives (Rundstadler 2025 ; Cortela 2022 et Anderson 2021), sans pourcentage. | Retour de la cheffe de projet : relier les chiffres au résultat | Appliqué, à valider : `statsIntro` est un texte nouveau | |
| D-16 | Structure du portrait | Fiche : forces, ce qui pèse, ce que l'IA apporte, prompt, dimensions, maturité IA, profil secondaire, source | Retirés : « ce qui pèse » (perçu comme une critique), « Votre rapport à l'IA » (il répète la réponse à Q9) et les textes d'interprétation des axes (seuils 60/40 inventés). Ajoutés : « Votre cas d'usage pour démarrer », « Pourquoi ce profil vous ressemble » et la page « Sources et méthode » (textes repris de la documentation). | Retours de la cheffe de projet et audit (écart n° 2) | Appliqué, à valider | |
| D-17 | Textes d'introduction | Portraits de la documentation | Accroche de l'accueil (« L'IA ne remplace pas votre savoir-faire… »). Introductions des profils au « vous ». Entrepreneur : « Vous construisez des cours et des stages… » | Ton valorisant, IA présentée comme une aide | Appliqué, à valider | |
| D-18 | Indicateurs du portrait | v3 : part de la gestion, envie d'essayer, temps encore à gagner | Les 3 axes et le code de la v2 sont conservés, sans texte d'interprétation | Le JSON v3 n'est pas disponible et les calculs ne doivent pas être inventés | **Provisoire** : à remplacer dès réception du JSON v3 (TICKET-03) | |

## Questions ouvertes

1. [À VALIDER : envoyer `referentiel-profils-v3.json` et `calcul-profil.js`. Sans eux, impossible de faire les TICKET-02 et 03 (indicateurs v3) ni le test de parité.]
2. [À VALIDER : adresse de la bibliothèque de prompts et cas d'usage existant à proposer pour chaque profil. Elle se règle dans `assets/js/data/links.js`.]
3. [À VALIDER : mode de collecte de la vue salle, import Microsoft Forms ou service FFT (DSI). Pour l'import Forms, il faut construire le Forms à partir des textes **finaux** des questions, une fois D-01, D-02 et D-07 validés.]
4. [À VALIDER : transfert du dépôt vers un espace FFT (DSI).]
7. [À VALIDER, priorité haute : droits à l'image des 6 photos (joueurs, photographes, marques visibles). Sans droits écrits, l'audit demande de les retirer de la version publique (D-10).]
5. [À VALIDER : autorisation de télécharger les polices Barlow Condensed et Roboto Flex, pour les héberger sur le site et ne plus appeler Google Fonts.]
6. [À VALIDER : ajouter une politique de sécurité du contenu (CSP) dans les en-têtes. Le code est prêt : aucun style ni script n'est écrit dans le HTML, et les tests le vérifient.]
