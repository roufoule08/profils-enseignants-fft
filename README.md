# Colloque des Enseignants — Quel profil enseignant êtes-vous ?

Questionnaire ludique pour les enseignantes et enseignants de tennis, conçu pour l'atelier
« L'IA au service des enseignants ». 10 questions, un portrait
parmi six profils (Le ou la Pédagogue, Le ou la Coach de compétition,
Le Bâtisseur · La Bâtisseuse, L'Entrepreneur · L'Entrepreneuse, Le ou la Jeune Pro,
Le ou la Sage) et une vue « La salle » qui montre la
répartition anonyme des profils.

Le portrait propose 3 pistes concrètes où l'IA peut faciliter le travail, sans jamais
remplacer le savoir-faire de l'enseignant ou de l'enseignante.

> Outil d'animation : ce n'est ni un test psychométrique ni une évaluation professionnelle.

**Avant toute modification, lire `CLAUDE.md`** (règles de travail : le référentiel fait foi, rien n'est inventé)
**et `DECISIONS.md`** (chaque écart au référentiel, avec son statut de validation).

## Utiliser le site

- **En ligne** : publier le dépôt avec GitHub Pages (*Settings → Pages → Deploy from a branch → `main` / racine*).
- **En local** : double-cliquer sur `index.html`. Aucune installation n'est nécessaire.

Le site est en HTML, CSS et JavaScript « purs ». Il n'y a ni framework, ni étape de compilation, ni dépendance à installer.

## Organisation des fichiers

```
index.html                  Page unique du site
CLAUDE.md                   Règles de travail pour l'agent IA et pour l'équipe
referentiel/
  referentiel-profils-v3.json  RÉFÉRENTIEL : source de vérité (indicateurs, paliers, règles)
outils/
  generer-referentiel.ps1   Régénère assets/js/data/referentiel.js après une modification du JSON
DECISIONS.md                Écarts au référentiel et leur validation
assets/
  css/styles.css            Tout le style (mobile d'abord, grand écran en fin de fichier)
  img/profils/*.jpg         Photos des six profils (droits à l'image à valider : DECISIONS.md D-10)
  js/
    data/                   CONTENU : c'est ici qu'on modifie les textes
      referentiel.js        Copie du JSON pour le navigateur (GÉNÉRÉ : ne pas modifier à la main)
      indicators.js         Les 3 indicateurs, lus dans le référentiel (+ écarts tracés)
      profiles.js           Les six profils et leurs 3 familles (textes, photo)
      questions.js          Les questions, les réponses et les points qu'elles rapportent
      links.js              Liens externes (bibliothèque de prompts)
      methode.js            Contenu de la page « Sources et méthode »
    core/                   LOGIQUE, sans affichage
      scoring.js            Calcul du portrait
      storage.js            Enregistrement des résultats (avec validation)
      router.js             Navigation (#home, #quiz, #result, #room, #methode)
    ui/
      html.js               Gabarits HTML sûrs (le texte inséré est échappé)
      views/                Une page par fichier : home, quiz, result, room, methode
    app.js                  Point d'entrée : relie l'état, la navigation et les pages
tests/
  index.html                Tests automatiques (ouvrir dans un navigateur)
```

## Modifier le contenu

| Je veux…                               | Fichier à modifier             |
|----------------------------------------|--------------------------------|
| Changer un nom de profil               | `assets/js/data/profiles.js` (champ `names.both`, affiché partout) |
| Changer un point, un palier ou un texte d'indicateur | `referentiel/referentiel-profils-v3.json`, puis lancer `outils/generer-referentiel.ps1` |
| Changer un texte de profil, une piste IA ou un chiffre | `assets/js/data/profiles.js` |
| Changer une question ou une réponse    | `assets/js/data/questions.js`  |
| Changer les points d'une réponse       | `assets/js/data/questions.js` (champ `points`) |
| Changer une photo                      | Remplacer le fichier dans `assets/img/profils/` (même nom, JPG de 1400 px maximum) |
| Ajouter le lien de la bibliothèque     | `assets/js/data/links.js` (champ `promptLibrary`) |
| Changer la page Sources et méthode     | `assets/js/data/methode.js` |
| Changer un niveau IA                   | `assets/js/data/questions.js` (fin du fichier) |
| Changer les couleurs                   | Variables en haut de `assets/css/styles.css` |

On peut ajouter ou retirer des questions : le compteur, la barre de progression
et le calcul s'adaptent automatiquement.

**Règles d'écriture** : un verbe en tête de chaque réponse, des formulations valables pour
les femmes comme pour les hommes, un ton toujours valorisant et jamais critique.

Tout changement de texte ou de calcul par rapport au référentiel doit être ajouté dans `DECISIONS.md`.

**Après chaque modification, ouvrir `tests/index.html` : tout doit être vert.**

## Publier une nouvelle version

Dans `index.html`, augmenter le numéro `?v=` de tous les fichiers (rechercher-remplacer, par exemple `?v=8` → `?v=9`)
et le numéro « Version » du pied de page. Sans cela, certains téléphones peuvent garder une partie de
l'ancienne version en mémoire et afficher un portrait différent pour les mêmes réponses.

## Comment le portrait est calculé

1. Chaque réponse rapporte des points à un ou plusieurs profils (voir `questions.js`).
2. Le profil qui a le plus de points est le profil principal, et le suivant est le profil secondaire.
   En cas d'égalité, le profil choisi à la question « Votre principal atout dans le métier ? » passe devant.
   Si l'égalité persiste, c'est l'ordre des profils qui décide.
3. Les 3 indicateurs suivent le référentiel v3 (`regles.indicateurs`). La part de la gestion et l'envie
   d'essayer sont la somme des points des réponses, divisée par le maximum, en %. Le temps à gagner
   vaut arrondi((50 + gestion / 2) × (1 − niveau IA / 8)). Le palier affiché est le dernier atteint.
4. Le niveau IA (0 à 4) correspond directement à la réponse à la question 9 (fréquence d'usage).
   La question 10 (usage principal) ajoute +0,5 à deux profils, sauf « Je n'ai jamais utilisé l'IA ».

## Données et confidentialité

Les résultats sont enregistrés uniquement dans le navigateur de l'appareil (`localStorage`).
Aucune donnée n'est envoyée sur internet, et « La salle » ne conserve que des données anonymes :
profil, profil secondaire, 3 indicateurs, niveau IA et date.

Pour l'instant, « La salle » ne montre donc que les résultats de l'appareil utilisé. Le stockage
(`App.storage.roomStore` dans `storage.js`) est prévu pour être remplacé par une base de
données partagée sans toucher au reste du site.
