/* Tests du site. Voir runner.js pour test / assert / assertEqual. */
(function (App) {
  'use strict';

  var questions = App.data.questions;

  /** Générateur pseudo-aléatoire déterministe (mêmes tirages à chaque exécution). */
  function seededRandom(seed) {
    return function () {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
  }

  function randomAnswers(rand) {
    return questions.map(function (q) { return Math.floor(rand() * q.answers.length); });
  }

  /** Sauvegarde puis restaure les clés de stockage du site autour d'un test. */
  function withCleanStorage(fn) {
    var keys = [App.storage._internal.KEYS.result, App.storage._internal.KEYS.room,
      App.storage._internal.LEGACY_KEYS.result, App.storage._internal.LEGACY_KEYS.room];
    var saved = keys.map(function (k) { return localStorage.getItem(k); });
    keys.forEach(function (k) { localStorage.removeItem(k); });
    function restore() {
      keys.forEach(function (k, i) {
        if (saved[i] == null) localStorage.removeItem(k); else localStorage.setItem(k, saved[i]);
      });
    }
    return Promise.resolve().then(fn).then(restore, function (err) { restore(); throw err; });
  }

  /* ---------- Données ---------- */

  test('Données : chaque point de question vise un profil existant', function () {
    questions.forEach(function (q) {
      q.answers.forEach(function (a) {
        Object.keys(a.points || {}).forEach(function (id) {
          assert(App.data.getProfile(id), 'Profil inconnu « ' + id + ' » dans « ' + q.text + ' »');
        });
      });
    });
  });

  test('Données : chaque profil a une position sur chaque axe et une image', function () {
    App.data.profiles.forEach(function (p) {
      App.data.axes.forEach(function (axis) {
        var v = p.axes[axis.key];
        assert(typeof v === 'number' && v >= -1 && v <= 1, p.id + ' : axe ' + axis.key + ' invalide');
      });
      assert(/^assets\/img\/profils\/.+\.jpg$/.test(p.image), p.id + ' : image manquante');
    });
  });

  test('Données : identifiants de profils et de questions uniques', function () {
    var ids = App.data.profiles.map(function (p) { return p.id; });
    assertEqual(new Set(ids).size, ids.length, 'Profils en double');
    var qids = questions.map(function (q) { return q.id; });
    assertEqual(new Set(qids).size, qids.length, 'Questions en double');
  });

  test('Contenu : chaque profil a 3 points forts, 3 pistes IA, un prompt et des chiffres sourcés', function () {
    App.data.profiles.forEach(function (p) {
      assertEqual(p.strengths.length, 3, p.id + ' : points forts');
      assertEqual(p.pistes.length, 3, p.id + ' : pistes');
      p.pistes.forEach(function (piste) {
        assert(piste.title && piste.text, p.id + ' : piste incomplète');
      });
      assert(p.prompt && p.prompt.length > 20, p.id + ' : prompt');
      assert(p.stats.length >= 1, p.id + ' : chiffres');
      p.stats.forEach(function (st) {
        assert(st.label && st.source, p.id + ' : chaque chiffre doit avoir un texte et une source');
      });
    });
  });

  test('Contenu : chaque question et chaque réponse a un texte', function () {
    questions.forEach(function (q) {
      assert(q.text && q.text.trim(), 'Question sans texte : ' + q.id);
      assert(q.answers.length >= 2, 'Pas assez de réponses : ' + q.id);
      q.answers.forEach(function (a) { assert(a.label && a.label.trim(), 'Réponse vide dans ' + q.id); });
    });
  });

  test('Contenu : 5 niveaux IA, chacun avec un nom et un message', function () {
    assertEqual(App.data.iaLevels.length, 5);
    App.data.iaLevels.forEach(function (l) { assert(l.name && l.message, 'Niveau IA incomplet'); });
  });

  /* ---------- Calcul : identique à la première version ---------- */

  test('Calcul : résultat identique à l’ancienne version sur 5 000 questionnaires aléatoires', function () {
    var rand = seededRandom(42);
    for (var n = 0; n < 5000; n++) {
      var answers = randomAnswers(rand);
      var expected = window.legacyCalc(answers);
      var actual = App.scoring.computeResult(answers);
      var label = 'Réponses ' + JSON.stringify(answers);
      assertEqual(actual.profile, window.LEGACY_IDS[expected.profile], label + ' — profil');
      assertEqual(actual.secondary, window.LEGACY_IDS[expected.second], label + ' — secondaire');
      assertEqual(actual.axes, { terrainClub: expected.t, reperesExploration: expected.x, groupeIndividuel: expected.g }, label + ' — axes');
      assertEqual(actual.code, expected.code, label + ' — code');
      assertEqual(actual.iaLevel, expected.ia, label + ' — niveau IA');
    }
  });

  test('Calcul : réponses « toutes identiques » pour chaque profil', function () {
    for (var i = 0; i < 6; i++) {
      var answers = questions.map(function (q) { return Math.min(i, q.answers.length - 1); });
      var expected = window.legacyCalc(answers);
      assertEqual(App.scoring.computeResult(answers).profile, window.LEGACY_IDS[expected.profile]);
    }
  });

  test('Calcul : refuse un questionnaire incomplet ou invalide', function () {
    var incomplete = questions.map(function () { return 0; });
    incomplete[3] = null;
    var threw = false;
    try { App.scoring.computeResult(incomplete); } catch (e) { threw = true; }
    assert(threw, 'Un questionnaire incomplet doit être refusé');
    assert(!App.scoring.isComplete([0, 1]), 'Nombre de réponses incorrect');
    assert(!App.scoring.isComplete(questions.map(function () { return 99; })), 'Index hors limites');
  });

  /* ---------- Bugs corrigés ---------- */

  test('Bug corrigé : afficher « La salle » ne modifie plus l’ordre des profils', function () {
    var before = App.data.profiles.map(function (p) { return p.id; });
    var entries = [{ profile: 'sage' }, { profile: 'sage' }, { profile: 'coach' }];
    var counted = App.views._countByProfile(entries);
    assertEqual(counted[0].profile.id, 'sage');
    assertEqual(counted[1].profile.id, 'coach');
    assertEqual(App.data.profiles.map(function (p) { return p.id; }), before, 'Ordre des profils modifié');
  });

  test('Bug corrigé : le calcul ne dépend pas de l’affichage de la salle', function () {
    var answers = [0, 0, 0, 0, 0, 1, 0, 0, 2, 2];
    var first = App.scoring.computeResult(answers);
    App.views._countByProfile([{ profile: 'sage' }, { profile: 'sage' }]);
    assertEqual(App.scoring.computeResult(answers), first);
  });

  test('Bug corrigé : axe Groupe/Individuel entre 41 et 59 % → texte « équilibré »', function () {
    var texts = App.scoring.interpretAxes({ terrainClub: 50, reperesExploration: 50, groupeIndividuel: 55 });
    var groupe = App.data.axes[2].texts;
    assertEqual(texts[2], groupe.balanced);
    assertEqual(App.scoring.interpretAxes({ terrainClub: 50, reperesExploration: 50, groupeIndividuel: 60 })[2], groupe.left);
    assertEqual(App.scoring.interpretAxes({ terrainClub: 50, reperesExploration: 50, groupeIndividuel: 40 })[2], groupe.right);
  });

  test('Bug corrigé : un même résultat n’est compté qu’une fois dans la salle', function () {
    return withCleanStorage(function () {
      var store = App.storage.roomStore;
      var record = App.storage.createRecord(App.scoring.computeResult(questions.map(function () { return 0; })));
      return store.add(record)
        .then(function () { return store.add(record); })
        .then(function () { return store.list(); })
        .then(function (rows) { assertEqual(rows.length, 1); });
    });
  });

  test('Bug corrigé : des données enregistrées corrompues ne font plus planter le site', function () {
    return withCleanStorage(function () {
      var KEYS = App.storage._internal.KEYS;
      localStorage.setItem(KEYS.result, '{pas du json');
      assertEqual(App.storage.loadResult(), null);
      localStorage.setItem(KEYS.result, JSON.stringify({ profile: 'inconnu' }));
      assertEqual(App.storage.loadResult(), null);
      localStorage.setItem(KEYS.room, JSON.stringify([{ id: 'x', profile: 'pas-un-profil' }, 'texte', null]));
      return App.storage.roomStore.list().then(function (rows) { assertEqual(rows, []); });
    });
  });

  test('Bug corrigé : la page Portrait reste utilisable sans portrait valide', function () {
    var out = App.views.result({ profile: 'inconnu' }).toString();
    assert(out.indexOf('data-route="quiz"') >= 0, 'Le bouton « Commencer » doit être proposé');
  });

  /* ---------- Stockage ---------- */

  test('Stockage : un portrait sauvegardé se relit à l’identique', function () {
    return withCleanStorage(function () {
      var record = App.storage.createRecord(App.scoring.computeResult([1, 1, 1, 1, 1, 1, 1, 1, 3, 3]));
      App.storage.saveResult(record);
      assertEqual(App.storage.loadResult(), record);
    });
  });

  test('Stockage : les résultats de l’ancienne version sont repris', function () {
    return withCleanStorage(function () {
      var L = App.storage._internal.LEGACY_KEYS;
      var old = window.legacyCalc([3, 3, 3, 3, 3, 2, 3, 3, 3, 2]);
      localStorage.setItem(L.result, JSON.stringify(old));
      localStorage.setItem(L.room, JSON.stringify([
        { profile: old.profile, second: old.second, t: old.t, x: old.x, g: old.g, ia: old.ia },
        { profile: 'Z', second: 'P', t: 1, x: 1, g: 1, ia: 0 } // invalide : ignoré
      ]));
      App.storage._internal.migrateLegacyData();
      var r = App.storage.loadResult();
      assert(r, 'Portrait repris');
      assertEqual(r.profile, 'entrepreneur');
      assertEqual(r.code, old.code);
      assertEqual(localStorage.getItem(L.result), null, 'Ancienne clé supprimée');
      return App.storage.roomStore.list().then(function (rows) {
        assertEqual(rows.length, 1);
        assertEqual(rows[0].profile, 'entrepreneur');
      });
    });
  });

  test('Stockage : la salle ne conserve que des données anonymes (jamais le choix « Vous êtes… »)', function () {
    return withCleanStorage(function () {
      var computed = App.scoring.computeResult(questions.map(function () { return 2; }));
      computed.gender = 'f';
      var record = App.storage.createRecord(computed);
      return App.storage.roomStore.add(record)
        .then(function () { return App.storage.roomStore.list(); })
        .then(function (rows) {
          assertEqual(Object.keys(rows[0]).sort(), ['axes', 'createdAt', 'iaLevel', 'id', 'profile', 'secondary']);
        });
    });
  });

  /* ---------- Affichage ---------- */

  test('Affichage : le texte inséré est échappé (protection contre l’injection de code)', function () {
    var out = App.ui.html`<p>${'<img src=x onerror=alert(1)>'}</p>`.toString();
    assertEqual(out, '<p>&lt;img src=x onerror=alert(1)&gt;</p>');
    var nested = App.ui.html`<ul>${['<a>', App.ui.html`<b>ok</b>`]}</ul>`.toString();
    assertEqual(nested, '<ul>&lt;a&gt;<b>ok</b></ul>');
  });

  test('Affichage : le questionnaire s’adapte au nombre de questions', function () {
    var out = App.views.quiz({ gender: 'n', index: questions.length - 1, answers: questions.map(function () { return 0; }) }).toString();
    assert(out.indexOf('Question ' + questions.length + '/' + questions.length) >= 0, 'Compteur de questions');
    assert(out.indexOf('Voir mon portrait') >= 0, 'Dernière question');
    assert(out.indexOf('100 %') >= 0, 'Progression à 100 %');
  });

  test('Affichage : boutons du questionnaire « Servir le prochain point » et « Rejouer le point d’avant »', function () {
    var out = App.views.quiz({ gender: 'n', index: 1, answers: questions.map(function () { return 0; }) }).toString();
    assert(out.indexOf('Servir le prochain point') >= 0, 'Bouton suivant');
    assert(out.indexOf('Rejouer le point d’avant') >= 0, 'Bouton précédent');
  });

  test('Affichage : le portrait montre les 3 pistes IA, le niveau IA, le prompt à copier et les sources', function () {
    var record = App.storage.createRecord(App.scoring.computeResult(questions.map(function () { return 0; })));
    var out = App.views.result(record).toString();
    var p = App.data.getProfile(record.profile);
    assertEqual((out.match(/class="piste"/g) || []).length, 3, 'Pistes');
    assert(out.indexOf(App.data.iaLevels[record.iaLevel].message) >= 0, 'Message du niveau IA');
    assert(out.indexOf('data-action="copy-prompt"') >= 0, 'Bouton copier');
    assert(out.indexOf(App.ui.escapeHtml(p.stats[0].source)) >= 0, 'Source des chiffres');
    assert(out.indexOf('vigilance') < 0, 'Plus de « points de vigilance »');
  });

  test('Affichage : chaque page a un titre principal unique', function () {
    var record = App.storage.createRecord(App.scoring.computeResult(questions.map(function () { return 0; })));
    var pages = [
      App.views.home(),
      App.views.quiz({ gender: 'n', index: 0, answers: questions.map(function () { return null; }) }),
      App.views.result(record),
      App.views.room({ status: 'ready', entries: [record] }, { isShared: false })
    ];
    pages.forEach(function (page, i) {
      assertEqual((page.toString().match(/<h1/g) || []).length, 1, 'Page ' + i);
    });
  });

  test('Affichage : toutes les images de l’accueil ont un texte alternatif', function () {
    var imgs = App.views.home().toString().match(/<img[^>]*>/g) || [];
    assertEqual(imgs.length, App.data.profiles.length);
    imgs.forEach(function (tag) { assert(/alt="[^"]+"/.test(tag), 'alt manquant : ' + tag); });
  });

  /* ---------- Choix « Vous êtes… » ---------- */

  test('Accord : nom du profil au féminin, au masculin ou sous les deux formes', function () {
    var p = App.data.getProfile('passeur');
    assertEqual(App.data.profileName(p, 'f'), 'La Passeuse');
    assertEqual(App.data.profileName(p, 'm'), 'Le Passeur');
    assertEqual(App.data.profileName(p, 'n'), 'Le Passeur · La Passeuse');
    assertEqual(App.data.profileName(p, undefined), 'Le Passeur · La Passeuse', 'Ancien portrait sans choix');
    App.data.profiles.forEach(function (pr) {
      assert(pr.names.m && pr.names.f && pr.names.both, pr.id + ' : noms incomplets');
    });
  });

  test('Accord : le questionnaire commence par l’écran « Vous êtes… »', function () {
    var out = App.views.quiz({ gender: null, index: 0, answers: questions.map(function () { return null; }) }).toString();
    assertEqual((out.match(/data-action="gender"/g) || []).length, 3);
    assert(out.indexOf('Question 1/') < 0, 'La question 1 ne doit pas encore s’afficher');
    var q1 = App.views.quiz({ gender: 'f', index: 0, answers: questions.map(function () { return null; }) }).toString();
    assert(q1.indexOf('Question 1/' + questions.length) >= 0, 'Question 1 après le choix');
  });

  test('Accord : le portrait s’affiche au féminin pour une enseignante', function () {
    var computed = App.scoring.computeResult(questions.map(function () { return 0; }));
    computed.gender = 'f';
    var out = App.views.result(App.storage.createRecord(computed)).toString();
    assert(out.indexOf('La Passeuse') >= 0, 'Nom au féminin');
    assert(out.indexOf('Le Passeur') < 0, 'Pas de nom au masculin');
  });

  test('Accord : un choix enregistré invalide est refusé', function () {
    var computed = App.scoring.computeResult(questions.map(function () { return 0; }));
    computed.gender = 'x';
    assert(!App.storage._internal.isValidResult(App.storage.createRecord(computed)));
  });

  /* ---------- Navigation ---------- */

  test('Navigation : adresses reconnues et adresse inconnue → accueil', function () {
    assertEqual(App.router.parse('#quiz'), 'quiz');
    assertEqual(App.router.parse('#room'), 'room');
    assertEqual(App.router.parse('#/result'), 'result');
    assertEqual(App.router.parse('#nimporte-quoi'), 'home');
    assertEqual(App.router.parse(''), 'home');
  });
})(window.App);
