# Journal des modifications

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
