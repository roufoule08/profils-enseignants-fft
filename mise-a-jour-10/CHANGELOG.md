# Journal des modifications

## Mise à jour 10 : crédits photos FFT

- « © FFT » s'affiche sur les 6 photos et sur la photo de fond de l'accueil. Une liste « Crédits photos » est ajoutée sur la page Sources et méthode.
  Source : médiathèque de la FFT (media.fft.fr). Les noms des photographes pourront être ajoutés dans `assets/js/data/credits.js`. (D-30)
- Numéro de version : 10.

## Mise à jour 9 : bandeau du bas, crédits photos, pertinence des données

- **Bandeau du bas** : les liens vers les mentions légales et la politique de confidentialité de fft.fr sont retirés,
  car le site est hors environnement FFT. « Version 8 » est retiré aussi. Il reste le lien « Sources et méthode ». (D-28, D-29)
- **Le numéro de version reste dans le code**, invisible, pour éviter les mélanges d'anciennes et de nouvelles versions.
- **Crédits photos** : un crédit « © … » s'affiche sur chaque photo et dans « Sources et méthode » dès qu'il est renseigné
  dans `assets/js/data/credits.js`. Les crédits restent à fournir, car les photos n'en contiennent aucun. (D-30)
- **Pertinence des données** : chaque chiffre et chaque phrase du portrait a été relu par rapport au référentiel,
  et 8 formulations qui allaient plus loin que les sources sont corrigées. Un test vérifie désormais
  que chaque chiffre affiché figure dans le référentiel. (D-31)
- **Données personnelles** : un rappel indique de ne jamais saisir de nom ni d'information personnelle sur les élèves dans l'IA. (D-32)
- 3 tests ont été ajoutés, pour un total de 51.

## Mise à jour 8 : un portrait plus clair, plus court, toujours identique

- **Test « mêmes réponses, même portrait »** :
  - 2 × 5 000 calculs et 2 × 150 parcours réels au clic (avec retours en arrière) donnent toujours exactement le même portrait ;
  - l'écart constaté venait de deux versions différentes du site ;
  - chaque fichier porte désormais un numéro de version (« Version 8 » en bas de page), pour qu'un navigateur ne puisse plus mélanger ancienne et nouvelle version. (D-27)
- **« Le Passeur · La Passeuse » devient « Le ou la Pédagogue »**, un nom plus parlant. (D-26)
- **Familles retirées de l'affichage** (« Sur le court », « Autour du court », « Trajectoires »). (D-24)
- **« Votre cas d'usage pour démarrer »** : la ligne technique « Cas d'usage COM-01 de la bibliothèque… » est retirée. Il reste le prompt, « Copier le prompt » et un seul lien. (D-24)
- **Moins de liens dans le portrait** : il n'y en a plus que 2, la bibliothèque et Sources et méthode.
  Les liens des indicateurs sont retirés, et les sources des chiffres sont réunies en une ligne. (D-23)
- **« Ce profil dans la profession »** remplace « Pourquoi ce profil vous ressemble ».
  Les phrases parlent du profil et plus de la personne, ce qui évite qu'une personne qui débute lise des chiffres sur les plus de 51 ans comme s'ils la concernaient. (D-25)
- **Sources et méthode** : la méthode vient en premier, puis les sources regroupées en 3 sujets, puis les limites.
- 4 tests ont été ajoutés, pour un total de 48.

## Mise à jour 7 : un vrai cas d'usage de la bibliothèque pour chaque profil

- « Votre cas d'usage pour démarrer » affiche le cas d'usage de la bibliothèque de prompts qui correspond au profil,
  par exemple « Cas d'usage COM-01 de la bibliothèque : Tirer 3 axes de travail d'un match ».
- Le bouton « Copier le prompt » est conservé.
- Le lien « Voir les cas d'usage pour mon profil → » ouvre la page du profil dans la bibliothèque, où figure ce cas d'usage.
- Les correspondances sont tracées dans DECISIONS.md (D-22).
- 1 test a été ajouté, pour un total de 44.

## Mise à jour 6 : les 3 indicateurs du référentiel v3

- **Référentiel v3 intégré** : `referentiel/referentiel-profils-v3.json`. Le site le lit via
  `assets/js/data/referentiel.js`, un fichier généré par `outils/generer-referentiel.ps1`. Rien n'est recopié à la main.
- **« Vos 3 indicateurs »** remplacent les 3 axes et le code à 3 lettres dans le portrait. Comme sur la maquette de la cheffe de projet :
  - **Part de la gestion dans votre métier** : un %, un palier, un texte et un lien vers les prompts du bon thème ;
  - **Envie d'essayer** : un %, un palier, un texte et un lien vers la bibliothèque ;
  - **Temps encore à gagner avec l'IA** : le palier en toutes lettres (Modéré, Réel ou Élevé) et un conseil.
- Les points, les maximums, les formules, les paliers, les textes et les liens sont **exactement ceux du référentiel**.
  Seuls 4 textes sont adaptés pour l'inclusion. (D-19)
- **Lien vers la bibliothèque de prompts** (https://promptenseignantfft.netlify.app/) dans « Votre cas d'usage pour démarrer ».
- **La salle** affiche la maturité IA moyenne et la moyenne des 3 indicateurs.
- **Stockage** : les portraits enregistrent les 3 indicateurs. La salle ne garde que les champs prévus par le référentiel.
  Les résultats des versions précédentes (axes, genre) sont effacés des appareils : il suffit de refaire le questionnaire.
- La page **Sources et méthode** explique le calcul des indicateurs.
- **Tests** : 43 au total. Ils comprennent :
  - le cas de test officiel du référentiel v3 ;
  - la comparaison, sur 5 000 questionnaires, avec un calcul de contrôle écrit à partir du JSON ;
  - la vérification, lettre par lettre, des points des questions 1 à 9.
- **À arbitrer** : la maturité IA utilisée dans le calcul du « temps à gagner ». (D-20)

## Mise à jour 5 : conformité (audit du 5 octobre 2026) et retours de la cheffe de projet

Chaque écart au référentiel est tracé dans `DECISIONS.md`. Les règles de travail sont dans `CLAUDE.md`.

### Sécurité et conformité
- **Photos conservées, à la demande du porteur du projet.** Une étiquette de famille est ajoutée sur chaque carte et dans le portrait (Sur le court, Autour du court, Trajectoires). Le risque lié aux droits à l'image, signalé par l'audit, est tracé dans D-10, en attente d'arbitrage.
- **TICKET-06, plus de question sur le genre** : l'écran « Vous êtes… » est retiré. Les noms s'affichent toujours sous les deux formes, et le genre déjà enregistré sur les téléphones est effacé. (D-09)
- **TICKET-07, en partie** :
  - balise `noindex` ;
  - liens vers les mentions légales et la politique de confidentialité FFT ;
  - plus aucun style écrit dans le HTML, pour être compatible avec une CSP stricte.
- Les seuils 60/40 et les textes d'interprétation des axes, inventés, sont supprimés. (Audit, écart n° 2)
- La devise complète du Sage est rétablie. Les forces sont alignées sur le référentiel. (D-11, D-12)

### Portrait (retours de la cheffe de projet)
- Le bloc « Votre rapport à l'IA » est supprimé, car il répétait la réponse à la question 9. Le niveau reste affiché dans l'en-tête.
- « Votre prompt pour démarrer » devient « Votre cas d'usage pour démarrer ». Le bouton « Copier le prompt » est conservé. Le lien vers la bibliothèque s'affichera dès que son adresse sera connue.
- « Repères chiffrés » devient « Pourquoi ce profil vous ressemble » : une phrase relie les chiffres au profil.
- Nouvelle page **Sources et méthode** : les 11 sources, la méthode de calcul et les limites, avec des liens depuis le portrait et le pied de page.

### Pas encore fait (en attente)
- Les 3 indicateurs v3 (gestion, envie d'essayer, temps à gagner) attendent `referentiel-profils-v3.json`. (D-18)
- La vue salle partagée attend le choix entre l'import Microsoft Forms et un service FFT, à faire avec la DSI.
- Les polices sont toujours chargées depuis Google Fonts, en attendant l'autorisation de les télécharger.

6 tests ont été ajoutés ou remplacés, pour un total de 35. L'exemple chiffré de la documentation de reprise en fait partie.

## Mise à jour 4 : retours de la réunion sur le questionnaire

- **Question 3** : les réponses sont recentrées sur le métier.
  - « Apprendre en continu » devient « Faire évoluer mes méthodes en permanence ».
  - « Apporter mon niveau de jeu et mon œil technique » devient « Apporter mon expertise technique et ma lecture du jeu ».
- **Question 5** : « Testez un nouvel outil » devient « Testez un nouvel outil digital ou une nouvelle méthode pédagogique ».
- **Question 7** :
  - la question devient « Face à un nouvel outil digital, vous… » ;
  - « Cherchez des preuves de son efficacité » devient « Cherchez des témoignages sur son efficacité ». Elle se distingue ainsi de « Mesurez ce qu'il vous apporte concrètement ».
- **Question 10** : 6 nouvelles réponses d'usage, dont « Je n'ai jamais utilisé l'IA ».
  - Chaque usage donne +0,5 aux deux profils dont il est le plus proche.
  - « Jamais » ne donne aucun point.
- **Niveau IA** : il vient désormais de la seule question 9, la fréquence d'usage, dont les 5 réponses
  correspondent aux 5 niveaux. Les nouveaux usages de la question 10 ne se classent pas
  du plus simple au plus avancé, ils ne servent donc plus au calcul du niveau.
- 2 tests ont été ajoutés, pour un total de 31.

## Mise à jour 3 : portrait au féminin ou au masculin

- Nouvel écran « Vous êtes… » avant la question 1, avec trois choix :
  une enseignante, un enseignant, ou je préfère ne pas préciser.
- Le portrait s'affiche au bon genre : La Passeuse, La Bâtisseuse, L'Entrepreneuse…
  Avec « ne pas préciser », les deux formes sont affichées.
- L'accueil et « La salle » montrent toujours les deux formes, par exemple
  « Le Passeur · La Passeuse » ou « Le ou la Sage ».
- Ce choix n'est gardé que sur l'appareil, pour réafficher le portrait.
  Il n'est jamais enregistré dans « La salle ».
- Le bouton « Rejouer le point d'avant » ramène de la question 1 à l'écran « Vous êtes… ».
- La devise du Passeur devient « Chaque enfant progresse à son rythme ».
- 4 tests ont été ajoutés, pour un total de 29.

## Mise à jour 2 : textes, questions et portrait

Les points de chaque réponse sont inchangés : le calcul du profil reste identique,
ce qui est vérifié par les tests.

### Accueil
- La photo de Yannick Noah est cadrée à droite sur grand écran : le joueur n'est plus caché par le dégradé.
- Le logo texte « FFT · PROFILS » est retiré de l'en-tête.
- Le titre devient « Quel profil enseignant êtes-vous ? ».
- L'accroche est recentrée sur l'IA comme aide, et non comme remplacement. « Points de vigilance » disparaît.
- Le pied de page ajoute la mention obligatoire sur les joueurs et joueuses cités.

### Questionnaire
- Les boutons deviennent « Servir le prochain point » et « Rejouer le point d'avant ».
- Les 10 questions sont réécrites :
  - un verbe en tête de chaque réponse ;
  - des formulations valables pour les femmes comme pour les hommes ;
  - plus de termes « marketing » ;
  - des réponses mieux différenciées à la question 4.
- Les questions 9 et 10 sur l'IA sont plus précises, pour mieux exploiter les réponses :
  - la question 9 mesure une fréquence (jamais, une ou deux fois, quelques fois par mois, chaque semaine, tous les jours) ;
  - la question 10 porte sur l'usage principal.

### Portrait
- Le bloc « Points de vigilance » est supprimé, car il pouvait être perçu comme une critique.
- Nouveau bloc « 3 pistes où l'IA peut vous faciliter le travail » : trois propositions concrètes par profil.
- Nouveau bloc « Votre rapport à l'IA » : une échelle en 5 cases et un message encourageant.
  Les niveaux sont renommés pour décrire un usage plutôt qu'une personne :
  Découverte, Premiers pas, Usage occasionnel, Usage régulier, Usage avancé.
- Le prompt de démarrage est plus concret, avec un bouton « Copier le prompt ».
- Nouveau bloc « Repères chiffrés sur le métier » : chaque chiffre a sa source (enquête Nouvelle-Aquitaine 2024, Rundstadler 2025…).
- Les textes des axes sont réécrits dans un ton valorisant.
- 5 tests ont été ajoutés, pour un total de 25.

## Étape 1 : refonte du code et correction des bugs

Le site garde le même aspect et le même contenu, et calcule le même portrait
pour les mêmes réponses. C'est vérifié automatiquement sur 5 000 questionnaires aléatoires.

### Bugs corrigés

- **Mauvais profil après l'ouverture de « La salle »** : l'affichage de la salle
  modifiait l'ordre interne des profils. Les questionnaires suivants donnaient alors
  un profil faux, et l'ordre de l'accueil changeait.
- **Résultats comptés plusieurs fois** : revenir sur « Questionnaire » après avoir
  terminé rouvrait la dernière question. Chaque nouveau clic sur « Voir mon portrait »
  ajoutait alors un résultat de plus dans la salle. Désormais, le questionnaire repart
  de zéro et chaque résultat n'est compté qu'une fois.
- **Axe Groupe/Individuel incohérent** : entre 50 et 59 %, la barre affichait
  « Groupe » alors que le texte disait « plus individualisée ». Un texte « équilibré »
  existe maintenant pour cet axe, comme pour les deux autres.
- **Boutons précédent et suivant du navigateur** : ils changeaient l'adresse
  sans changer la page affichée.
- **Plantage sur des données abîmées** : un résultat enregistré corrompu ou
  ancien faisait planter la page Portrait. Toutes les données lues sont maintenant validées.
- **Titre trop large sur mobile** : « L'Entrepreneur » débordait de l'écran sur la page Portrait.
- **Petit titre illisible dans « La salle »** : il était jaune sur fond blanc. Il passe en orange.

### Améliorations

- **Poids du site divisé par plus de 20** : on passe de 14,9 Mo à environ 700 Ko.
  Les photos sont redimensionnées et compressées dans des fichiers séparés, et celles de l'accueil se chargent au fil du défilement.
- **Code lisible et organisé** : un fichier par rôle (données, calcul, stockage, navigation, pages),
  avec des noms explicites et des commentaires.
- **Contenu séparé du code** : textes, questions et points se modifient dans `assets/js/data/`.
  Chaque réponse déclare ses points, alors qu'avant ils dépendaient de la position de la réponse.
- **Nombre de questions libre** : il n'est plus fixé à 10 dans le code.
- **Sécurité** : tout texte inséré dans la page est échappé, ce qui protège contre
  l'injection de code. C'est indispensable avant de partager « La salle » entre plusieurs appareils.
- **Accessibilité** :
  - texte alternatif sur toutes les images ;
  - page en cours signalée dans le menu ;
  - focus placé sur le titre à chaque changement de page ;
  - réponses annoncées comme sélectionnées ;
  - contour visible pour la navigation au clavier ;
  - lien « Aller au contenu ».
- **Stockage robuste** : il tient compte de la navigation privée et du stockage plein.
  Les résultats enregistrés par l'ancienne version sont repris automatiquement.
- **Prêt pour une salle partagée** : le stockage de la salle a une interface
  asynchrone, remplaçable par une base de données.
- **Tests automatiques** : 20 tests dans `tests/index.html`.
