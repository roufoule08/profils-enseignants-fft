# Colloque des Enseignants — Quel profil enseignant êtes-vous ?

Questionnaire ludique pour les enseignantes et enseignants de tennis, conçu pour l'atelier
« L'IA au service des enseignants ». 10 questions, un portrait
parmi six profils (Le Passeur · La Passeuse, Le ou la Coach de compétition,
Le Bâtisseur · La Bâtisseuse, L'Entrepreneur · L'Entrepreneuse, Le ou la Jeune Pro,
Le ou la Sage) et une vue « La salle » qui montre la
répartition anonyme des profils.

Le portrait propose 3 pistes concrètes où l'IA peut faciliter le travail, sans jamais
remplacer le savoir-faire de l'enseignant ou de l'enseignante.

> Outil d'animation : ce n'est ni un test psychométrique ni une évaluation professionnelle.

## Utiliser le site

- **En ligne** : publier le dépôt avec GitHub Pages (*Settings → Pages → Deploy from a branch → `main` / racine*).
- **En local** : double-cliquer sur `index.html`. Aucune installation n'est nécessaire.

Le site est en HTML, CSS et JavaScript « purs ». Il n'y a ni framework, ni étape de compilation, ni dépendance à installer.

## Organisation des fichiers

```
index.html                  Page unique du site
assets/
  css/styles.css            Tout le style (mobile d'abord, grand écran en fin de fichier)
  img/profils/*.jpg         Photos des six profils (optimisées, environ 100 Ko chacune)
  js/
    data/                   CONTENU : c'est ici qu'on modifie les textes
      profiles.js           Les six profils (textes, image, position sur les axes)
      questions.js          Les questions, les réponses et les points qu'elles rapportent
      axes.js               Les trois axes du portrait et leurs textes d'interprétation
    core/                   LOGIQUE, sans affichage
      scoring.js            Calcul du portrait
      storage.js            Enregistrement des résultats (avec validation)
      router.js             Navigation (#home, #quiz, #result, #room)
    ui/
      html.js               Gabarits HTML sûrs (le texte inséré est échappé)
      views/                Une page par fichier : home, quiz, result, room
    app.js                  Point d'entrée : relie l'état, la navigation et les pages
tests/
  index.html                Tests automatiques (ouvrir dans un navigateur)
```

## Modifier le contenu

| Je veux…                               | Fichier à modifier             |
|----------------------------------------|--------------------------------|
| Changer un nom de profil (féminin, masculin, double) | `assets/js/data/profiles.js` (champ `names`) |
| Changer un texte de profil, une piste IA ou un chiffre | `assets/js/data/profiles.js` |
| Changer une question ou une réponse    | `assets/js/data/questions.js`  |
| Changer les points d'une réponse       | `assets/js/data/questions.js` (champ `points`) |
| Changer un texte d'interprétation d'axe| `assets/js/data/axes.js`       |
| Changer une photo                      | Remplacer le fichier dans `assets/img/profils/` (même nom, JPG de 1400 px maximum) |
| Changer un niveau IA et son message    | `assets/js/data/questions.js` (fin du fichier) |
| Changer les couleurs                   | Variables en haut de `assets/css/styles.css` |

On peut ajouter ou retirer des questions : le compteur, la barre de progression
et le calcul s'adaptent automatiquement.

**Règles d'écriture** : un verbe en tête de chaque réponse, des formulations valables pour
les femmes comme pour les hommes, un ton toujours valorisant et jamais critique.

**Après chaque modification, ouvrir `tests/index.html` : tout doit être vert.**

## Comment le portrait est calculé

1. Chaque réponse rapporte des points à un ou plusieurs profils (voir `questions.js`).
2. Le profil qui a le plus de points est le profil principal, et le suivant est le profil secondaire.
   En cas d'égalité, le profil choisi à la question « Votre principal atout dans le métier ? » passe devant.
   Si l'égalité persiste, c'est l'ordre des profils qui décide.
3. Chaque axe (Terrain/Club, Repères/Exploration, Groupe/Individuel) est la moyenne
   des positions des profils, pondérée par leurs points.
4. Le niveau IA est la moyenne arrondie des deux questions sur l'IA.

## Données et confidentialité

Les résultats sont enregistrés uniquement dans le navigateur de l'appareil (`localStorage`).
Aucune donnée n'est envoyée sur internet, et « La salle » ne conserve que des données anonymes :
profil, profil secondaire, axes et niveau IA.

Pour l'instant, « La salle » ne montre donc que les résultats de l'appareil utilisé. Le stockage
(`App.storage.roomStore` dans `storage.js`) est prévu pour être remplacé par une base de
données partagée sans toucher au reste du site.
