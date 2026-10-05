# Journal des modifications

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
