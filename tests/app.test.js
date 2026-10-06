/* Tests du site. Voir runner.js pour test / assert / assertEqual. */
(function (App) {
  'use strict';

  var questions = App.data.questions;
  var REF = App.referentiel;
  var CODE_TO_ID = { P: 'passeur', C: 'coach', B: 'batisseur', E: 'entrepreneur', J: 'jeune-pro', S: 'sage' };
  var LETTERS = 'ABCDEFGHIJ';

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

  function newRecord(answers) {
    return App.storage.createRecord(App.scoring.computeResult(answers || questions.map(function () { return 0; })));
  }

  /** Sauvegarde puis restaure les clés de stockage du site autour d'un test. */
  function withCleanStorage(fn) {
    var I = App.storage._internal;
    var keys = [I.KEYS.result, I.KEYS.room].concat(I.OBSOLETE_KEYS);
    var saved = keys.map(function (k) { return localStorage.getItem(k); });
    keys.forEach(function (k) { localStorage.removeItem(k); });
    function restore() {
      keys.forEach(function (k, i) {
        if (saved[i] == null) localStorage.removeItem(k); else localStorage.setItem(k, saved[i]);
      });
    }
    return Promise.resolve().then(fn).then(restore, function (err) { restore(); throw err; });
  }

  /** HTML de toutes les pages du site, pour les vérifications transversales. */
  function allPages(record) {
    return [
      App.views.home(),
      App.views.quiz({ index: 0, answers: questions.map(function () { return null; }) }),
      App.views.result(record),
      App.views.room({ status: 'ready', entries: [record] }, { isShared: false }),
      App.views.methode()
    ].map(String);
  }

  /**
   * Calcul de contrôle des indicateurs, écrit indépendamment du site,
   * en lisant directement le JSON du référentiel (« regles.indicateurs »).
   */
  function referenceIndicators(answers, iaLevel) {
    function byPoints(cle) {
      var ind = REF.indicateurs.find(function (i) { return i.cle === cle; });
      var sum = 0;
      Object.keys(ind.points).forEach(function (qid) {
        var index = Number(qid.slice(1)) - 1;
        sum += ind.points[qid][LETTERS[answers[index]]] || 0;
      });
      return Math.round(sum / ind.maximum * 100);
    }
    var gestion = byPoints('gestion');
    return {
      gestion: gestion,
      essai: byPoints('essai'),
      gain: Math.round((50 + gestion / 2) * (1 - iaLevel / 8))
    };
  }

  /* ---------- Référentiel ---------- */

  test('Référentiel : la version 3 est chargée', function () {
    assert(REF, 'App.referentiel absent : lancer outils/generer-referentiel.ps1');
    assertEqual(REF.version, '3.0');
    assertEqual(REF.indicateurs.map(function (i) { return i.cle; }), ['gestion', 'essai', 'gain']);
  });

  test('Référentiel : les questions 1 à 9 donnent les mêmes points de profil que le référentiel, lettre par lettre', function () {
    // Garantit que l'ordre des réponses du site suit les lettres A, B, C… du référentiel,
    // ce dont dépendent les points des indicateurs.
    for (var qi = 0; qi < 9; qi++) {
      var refQ = REF.questions[qi];
      assertEqual(questions[qi].ref, refQ.id, 'Identifiant de la question ' + (qi + 1));
      assertEqual(questions[qi].answers.length, refQ.reponses.length, refQ.id + ' : nombre de réponses');
      refQ.reponses.forEach(function (rep, ai) {
        var expected = {};
        Object.keys(rep.points).forEach(function (code) { expected[CODE_TO_ID[code]] = rep.points[code]; });
        assertEqual(questions[qi].answers[ai].points || {}, expected, refQ.id + ' ' + rep.lettre + ' : points');
      });
    }
  });

  test('Référentiel : la question 9 donne les mêmes niveaux IA', function () {
    REF.questions[8].reponses.forEach(function (rep, i) {
      assertEqual(questions[8].answers[i].iaLevel, rep.niveau_ia, 'Q9 ' + rep.lettre);
    });
  });

  test('Référentiel : 6 profils dans l’ordre P, C, B, E, J, S, avec leur famille', function () {
    assertEqual(App.data.profiles.map(function (p) { return p.id; }), REF.profils.map(function (p) { return CODE_TO_ID[p.code]; }));
    REF.profils.forEach(function (rp) {
      assertEqual(App.data.getProfile(CODE_TO_ID[rp.code]).family, rp.famille, rp.code + ' : famille');
    });
    REF.familles.forEach(function (f) { assertEqual(App.data.families[f.code].name, f.nom, 'Famille ' + f.code); });
  });

  test('Référentiel : chaque écart de texte des indicateurs vise un champ existant (DECISIONS.md D-19)', function () {
    Object.keys(App.data.indicatorOverrides).forEach(function (key) {
      var parts = key.split('/');
      var ind = REF.indicateurs.find(function (i) { return i.cle === parts[0]; });
      assert(ind, 'Indicateur inconnu : ' + key);
      var palier = ind.paliers.find(function (p) { return String(p.a_partir_de) === parts[1]; });
      assert(palier && parts[2] in palier, 'Champ inconnu : ' + key);
      assert(palier[parts[2]] !== App.data.indicatorOverrides[key], 'Écart inutile (identique au référentiel) : ' + key);
    });
  });

  test('Référentiel : les autres textes, seuils et liens des indicateurs sont ceux du référentiel', function () {
    REF.indicateurs.forEach(function (ri) {
      var ind = App.data.getIndicator(ri.cle);
      assertEqual(ind.name, ri.nom);
      assertEqual(ind.levels.length, ri.paliers.length);
      ri.paliers.forEach(function (rp, i) {
        var site = ind.levels[i];
        assertEqual(site.a_partir_de, rp.a_partir_de, ri.cle + ' : seuil');
        assertEqual(site.lien, rp.lien, ri.cle + ' : lien');
        ['libelle', 'texte', 'action'].forEach(function (field) {
          var key = ri.cle + '/' + rp.a_partir_de + '/' + field;
          if (!(key in App.data.indicatorOverrides)) assertEqual(site[field], rp[field], key);
        });
      });
    });
  });

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

  test('Données : chaque profil a une famille, une photo et une phrase de lien avec les chiffres', function () {
    App.data.profiles.forEach(function (p) {
      assert(App.data.families[p.family], p.id + ' : famille inconnue');
      assert(/^assets\/img\/profils\/.+\.jpg$/.test(p.image), p.id + ' : photo manquante');
      assert(p.statsIntro, p.id + ' : phrase de lien avec les chiffres');
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
      p.pistes.forEach(function (piste) { assert(piste.title && piste.text, p.id + ' : piste incomplète'); });
      assert(p.prompt && p.prompt.length > 20, p.id + ' : prompt');
      assert(p.stats.length >= 1, p.id + ' : chiffres');
      p.stats.forEach(function (st) { assert(st.label && st.source, p.id + ' : chaque chiffre doit avoir un texte et une source'); });
    });
  });

  test('Contenu : chaque profil propose un cas d’usage de la bibliothèque (DECISIONS.md D-22)', function () {
    var ids = [];
    App.data.profiles.forEach(function (p) {
      assert(p.useCase, p.id + ' : cas d’usage manquant');
      assert(/^[A-Z]{3}-\d{2}$/.test(p.useCase.id), p.id + ' : identifiant de cas d’usage invalide');
      assert(p.useCase.title, p.id + ' : titre du cas d’usage');
      assert(/^p-[a-z-]+$/.test(p.useCase.libraryPage), p.id + ' : page du profil dans la bibliothèque');
      ids.push(p.useCase.id);
    });
    assertEqual(new Set(ids).size, ids.length, 'Un cas d’usage différent par profil');
  });

  test('Contenu : chaque question et chaque réponse a un texte', function () {
    questions.forEach(function (q) {
      assert(q.text && q.text.trim(), 'Question sans texte : ' + q.id);
      assert(q.answers.length >= 2, 'Pas assez de réponses : ' + q.id);
      q.answers.forEach(function (a) { assert(a.label && a.label.trim(), 'Réponse vide dans ' + q.id); });
    });
  });

  /* ---------- Calcul ---------- */

  test('Calcul : cas de test du référentiel v3 (regles.test)', function () {
    // Q1 A, Q2 A, Q3 A, Q4 E, Q5 A, Q6 B, Q7 E, Q8 A, Q9 C, Q10 D.
    // Q10 D du référentiel = « Préparer ou enrichir des séances » sur le site (mêmes points : P +0,5, C +0,5).
    var expected = REF.regles.test.attendu;
    var r = App.scoring.computeResult([0, 0, 0, 4, 0, 1, 4, 0, 2, 0]);
    assertEqual(r.profile, CODE_TO_ID[expected.profil], 'Profil');
    assertEqual(r.secondary, CODE_TO_ID[expected.secondaire], 'Secondaire');
    assertEqual(r.indicators.gestion, expected.gestion, 'Gestion');
    assertEqual(r.indicators.essai, expected.essai, 'Essai');
    // La formule du gain donne le résultat du référentiel pour son niveau IA (3)…
    assertEqual(App.scoring.gainIndicator(expected.gestion, expected.ia), expected.gain, 'Formule du gain');
    // … mais, depuis D-08, le niveau IA vient de Q9 seule (C = 2), donc le gain du site diffère.
    assertEqual(r.iaLevel, 2, 'Niveau IA (D-08)');
    assertEqual(r.indicators.gain, App.scoring.gainIndicator(expected.gestion, 2), 'Gain (D-08)');
  });

  test('Calcul : indicateurs identiques au calcul de contrôle sur 5 000 questionnaires aléatoires', function () {
    var rand = seededRandom(7);
    for (var n = 0; n < 5000; n++) {
      var answers = randomAnswers(rand);
      var r = App.scoring.computeResult(answers);
      assertEqual(r.indicators, referenceIndicators(answers, r.iaLevel), 'Réponses ' + JSON.stringify(answers));
    }
  });

  test('Calcul : profils identiques au calcul de référence sur 5 000 questionnaires aléatoires', function () {
    var rand = seededRandom(42);
    for (var n = 0; n < 5000; n++) {
      var answers = randomAnswers(rand);
      var expected = window.legacyCalc(answers);
      var actual = App.scoring.computeResult(answers);
      var label = 'Réponses ' + JSON.stringify(answers);
      assertEqual(actual.profile, window.LEGACY_IDS[expected.profile], label + ' — profil');
      assertEqual(actual.secondary, window.LEGACY_IDS[expected.second], label + ' — secondaire');
      assertEqual(actual.iaLevel, expected.ia, label + ' — niveau IA');
    }
  });

  test('Calcul : les mêmes réponses donnent toujours le même portrait (2 × 5 000 questionnaires)', function () {
    var rand = seededRandom(2026);
    for (var n = 0; n < 5000; n++) {
      var answers = randomAnswers(rand);
      var first = App.scoring.computeResult(answers.slice());
      var second = App.scoring.computeResult(answers.slice());
      assertEqual(second, first, 'Réponses ' + JSON.stringify(answers));
      var r1 = App.storage.createRecord(first), r2 = App.storage.createRecord(second);
      assertEqual(App.views.result(r2).toString(), App.views.result(r1).toString(), 'Affichage ' + JSON.stringify(answers));
    }
  });

  test('Calcul : bornes des indicateurs (0 et 100 %)', function () {
    var gestion = App.data.getIndicator('gestion');
    var essai = App.data.getIndicator('essai');
    function maxAnswers(ind) {
      return questions.map(function (q) {
        var table = ind.points[q.ref] || {};
        var best = 0;
        q.answers.forEach(function (a, i) { if ((table[LETTERS[i]] || 0) > (table[LETTERS[best]] || 0)) best = i; });
        return best;
      });
    }
    assertEqual(App.scoring.computeResult(maxAnswers(gestion)).indicators.gestion, 100, 'Gestion maximale');
    assertEqual(App.scoring.computeResult(maxAnswers(essai)).indicators.essai, 100, 'Essai maximal');
    var none = questions.map(function (q) { return q.answers.length - 1; });
    none[0] = 0; none[1] = 1; none[2] = 0; none[3] = 0; none[4] = 1; none[5] = 0; none[6] = 5; none[7] = 0;
    var r = App.scoring.computeResult(none);
    assertEqual(r.indicators.gestion, 0, 'Gestion nulle');
    assertEqual(r.indicators.essai, 0, 'Essai nul');
  });

  test('Calcul : paliers (le dernier dont le seuil est atteint)', function () {
    var essai = App.data.getIndicator('essai');
    assertEqual(App.data.indicatorLevel(essai, 0).a_partir_de, 0);
    assertEqual(App.data.indicatorLevel(essai, 32).a_partir_de, 0);
    assertEqual(App.data.indicatorLevel(essai, 33).a_partir_de, 33);
    assertEqual(App.data.indicatorLevel(essai, 66).a_partir_de, 66);
    var gain = App.data.getIndicator('gain');
    assertEqual(App.data.indicatorLevel(gain, 39).libelle, 'Modéré');
    assertEqual(App.data.indicatorLevel(gain, 40).libelle, 'Réel');
    assertEqual(App.data.indicatorLevel(gain, 70).libelle, 'Élevé');
  });

  test('Calcul : le niveau IA vient de la question sur la fréquence d’usage (D-08)', function () {
    var freq = questions.findIndex(function (q) { return q.id === 'ia-frequence'; });
    for (var level = 0; level < 5; level++) {
      var answers = questions.map(function () { return 0; });
      answers[freq] = level;
      assertEqual(App.scoring.computeResult(answers).iaLevel, level, 'Fréquence ' + level);
    }
  });

  test('Calcul : « Je n’ai jamais utilisé l’IA » ne rapporte aucun point', function () {
    var usages = questions.find(function (q) { return q.id === 'ia-usages'; });
    var jamais = usages.answers.find(function (a) { return a.id === 'jamais'; });
    assert(jamais && !jamais.points, 'Aucun point attendu');
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

  test('Calcul : plus d’axes ni de code à 3 lettres (supprimés en v3)', function () {
    var r = App.scoring.computeResult(questions.map(function () { return 0; }));
    assert(!('axes' in r) && !('code' in r), 'Axes ou code encore calculés');
    assert(!App.data.axes, 'Données des axes encore chargées');
  });

  /* ---------- Bugs corrigés ---------- */

  test('Bug corrigé : afficher « La salle » ne modifie plus l’ordre des profils', function () {
    var before = App.data.profiles.map(function (p) { return p.id; });
    var counted = App.views._countByProfile([{ profile: 'sage' }, { profile: 'sage' }, { profile: 'coach' }]);
    assertEqual(counted[0].profile.id, 'sage');
    assertEqual(counted[1].profile.id, 'coach');
    assertEqual(App.data.profiles.map(function (p) { return p.id; }), before, 'Ordre des profils modifié');
  });

  test('Bug corrigé : un même résultat n’est compté qu’une fois dans la salle', function () {
    return withCleanStorage(function () {
      var store = App.storage.roomStore;
      var record = newRecord();
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
      var record = newRecord([1, 1, 1, 1, 1, 1, 1, 1, 3, 3]);
      App.storage.saveResult(record);
      assertEqual(App.storage.loadResult(), record);
    });
  });

  test('Stockage : les résultats des versions précédentes (axes, genre) sont effacés', function () {
    return withCleanStorage(function () {
      var I = App.storage._internal;
      I.OBSOLETE_KEYS.forEach(function (k) { localStorage.setItem(k, JSON.stringify({ gender: 'f', axes: {} })); });
      I.removeObsoleteData();
      I.OBSOLETE_KEYS.forEach(function (k) { assertEqual(localStorage.getItem(k), null, k); });
    });
  });

  test('Stockage : la salle ne conserve que le résultat anonyme et l’horodatage', function () {
    return withCleanStorage(function () {
      return App.storage.roomStore.add(newRecord())
        .then(function () { return App.storage.roomStore.list(); })
        .then(function (rows) {
          assertEqual(Object.keys(rows[0]).sort(), ['createdAt', 'iaLevel', 'id', 'indicators', 'profile', 'secondary']);
          assertEqual(Object.keys(rows[0].indicators).sort(), ['essai', 'gain', 'gestion']);
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
    var out = App.views.quiz({ index: questions.length - 1, answers: questions.map(function () { return 0; }) }).toString();
    assert(out.indexOf('Question ' + questions.length + '/' + questions.length) >= 0, 'Compteur de questions');
    assert(out.indexOf('Voir mon portrait') >= 0, 'Dernière question');
    assert(out.indexOf('100 %') >= 0, 'Progression à 100 %');
  });

  test('Affichage : boutons « Servir le prochain point » et « Rejouer le point d’avant »', function () {
    var out = App.views.quiz({ index: 1, answers: questions.map(function () { return 0; }) }).toString();
    assert(out.indexOf('Servir le prochain point') >= 0, 'Bouton suivant');
    assert(out.indexOf('Rejouer le point d’avant') >= 0, 'Bouton précédent');
  });

  test('Affichage : le portrait montre les 3 indicateurs, leur palier et leur texte', function () {
    var record = newRecord([0, 0, 0, 4, 0, 1, 4, 0, 2, 0]);
    var out = App.views.result(record).toString();
    assert(out.indexOf('Vos 3 indicateurs') >= 0, 'Titre du bloc');
    App.data.indicators.forEach(function (ind) {
      var value = record.indicators[ind.key];
      var level = App.data.indicatorLevel(ind, value);
      assert(out.indexOf(App.ui.escapeHtml(ind.name)) >= 0, ind.key + ' : nom');
      assert(out.indexOf(App.ui.escapeHtml(level.texte)) >= 0, ind.key + ' : texte du palier');
      assert(out.indexOf(ind.showPercent ? value + ' %' : App.ui.escapeHtml(level.libelle)) >= 0, ind.key + ' : valeur affichée');
    });
  });

  test('Affichage : le portrait montre les pistes IA, le cas d’usage à copier et les chiffres reliés au profil', function () {
    var record = newRecord();
    var out = App.views.result(record).toString();
    var p = App.data.getProfile(record.profile);
    assertEqual((out.match(/class="piste"/g) || []).length, 3, 'Pistes');
    assert(out.indexOf('Votre cas d’usage pour démarrer') >= 0, 'Titre du cas d’usage');
    assert(out.indexOf('data-action="copy-prompt"') >= 0, 'Bouton copier');
    assert(out.indexOf('href="' + App.data.links.promptLibrary + '#' + p.useCase.libraryPage + '"') >= 0, 'Lien vers la page du profil dans la bibliothèque');
    assert(out.indexOf(App.ui.escapeHtml(p.statsIntro)) >= 0, 'Phrase de lien avec le profil');
    assert(out.indexOf('Sources : ' + App.ui.escapeHtml(p.stats[0].source)) >= 0, 'Sources réunies en une ligne');
    assert(out.indexOf('href="#methode"') >= 0, 'Lien vers Sources et méthode');
  });

  test('Affichage : retraits demandés (axes, code, rapport à l’IA, vigilance)', function () {
    var out = App.views.result(newRecord()).toString();
    assert(out.indexOf('Terrain ↔ Club') < 0, 'Axes retirés');
    assert(!/[TK]-[RX]-[GI]/.test(out), 'Code à 3 lettres retiré');
    assert(out.indexOf('Votre rapport à l’IA') < 0, 'Bloc « Votre rapport à l’IA » retiré');
    assert(out.indexOf('vigilance') < 0, 'Plus de « points de vigilance »');
  });

  test('Affichage : le portrait ne contient que 2 liens (bibliothèque et sources) (D-23)', function () {
    App.data.profiles.forEach(function (p) {
      var computed = App.scoring.computeResult(questions.map(function () { return 0; }));
      computed.profile = p.id;
      var out = App.views.result(App.storage.createRecord(computed)).toString();
      var links = out.match(/<a [^>]*href="[^"]+"/g) || [];
      assertEqual(links.length, 2, p.id + ' : ' + links.join(' | '));
    });
  });

  test('Affichage : plus de familles, de code de cas d’usage ni de liens d’indicateurs (D-24)', function () {
    var record = newRecord([0, 0, 0, 4, 0, 1, 4, 0, 2, 0]);
    var p = App.data.getProfile(record.profile);
    var pages = [App.views.home().toString(), App.views.result(record).toString()];
    Object.keys(App.data.families).forEach(function (code) {
      var fam = App.ui.escapeHtml(App.data.families[code].name);
      pages.forEach(function (page) { assert(page.indexOf(fam) < 0, 'Famille affichée : ' + fam); });
    });
    assert(pages[1].indexOf(p.useCase.id) < 0, 'Code du cas d’usage affiché');
    App.data.indicators.forEach(function (ind) {
      ind.levels.forEach(function (l) { if (l.lien) assert(pages[1].indexOf(l.lien + '"') < 0, 'Lien d’indicateur : ' + l.lien); });
    });
  });

  test('Contenu : les phrases « Ce profil dans la profession » parlent du profil, pas de la personne (D-25)', function () {
    App.data.profiles.forEach(function (p) {
      assert(!/\b(vous|votre|vos)\b/i.test(p.statsIntro), p.id + ' : ' + p.statsIntro);
    });
  });

  test('Affichage : la bibliothèque de prompts est celle du référentiel', function () {
    var essai = REF.indicateurs.find(function (i) { return i.cle === 'essai'; });
    assertEqual(App.data.links.promptLibrary, essai.paliers[0].lien);
  });

  test('Affichage : la salle montre la maturité IA moyenne et la moyenne des 3 indicateurs', function () {
    var a = newRecord([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    var b = newRecord([2, 2, 2, 2, 2, 2, 2, 2, 4, 4]);
    var out = App.views.room({ status: 'ready', entries: [a, b] }, { isShared: false }).toString();
    assert(out.indexOf('Maturité IA moyenne') >= 0, 'Maturité moyenne');
    App.data.indicators.forEach(function (ind) {
      assert(out.indexOf(App.ui.escapeHtml(ind.roomName)) >= 0, ind.key + ' : nom vue salle');
    });
    var meanGestion = Math.round((a.indicators.gestion + b.indicators.gestion) / 2);
    assert(out.indexOf(meanGestion + ' %') >= 0, 'Moyenne de la gestion');
  });

  test('Affichage : chaque page a un titre principal unique', function () {
    allPages(newRecord()).forEach(function (page, i) {
      assertEqual((page.match(/<h1/g) || []).length, 1, 'Page ' + i);
    });
  });

  /* ---------- Images, inclusion, sécurité ---------- */

  test('Images : chaque photo a un texte alternatif et se charge', function () {
    allPages(newRecord()).forEach(function (page) {
      (page.match(/<img[^>]*>/g) || []).forEach(function (tag) {
        assert(/alt="[^"]+"/.test(tag), 'alt manquant : ' + tag);
      });
    });
    return Promise.all(App.data.profiles.map(function (p) {
      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.onload = resolve;
        img.onerror = function () { reject(new Error('Photo introuvable : ' + p.image)); };
        img.src = '../' + p.image;
      });
    }));
  });

  test('Inclusion : les noms des profils s’affichent toujours sous les deux formes', function () {
    var p = App.data.getProfile('passeur');
    assertEqual(App.data.profileName(p), 'Le ou la Pédagogue');
    assert(App.views.result(newRecord()).toString().indexOf('Le ou la Pédagogue') >= 0, 'Portrait');
    assert(App.views.home().toString().indexOf('Le ou la Pédagogue') >= 0, 'Accueil');
  });

  test('Inclusion : plus aucune question sur le genre', function () {
    var out = App.views.quiz({ index: 0, answers: questions.map(function () { return null; }) }).toString();
    assert(out.indexOf('data-action="gender"') < 0, 'Écran « Vous êtes… » retiré');
    assert(out.indexOf('Question 1/' + questions.length) >= 0, 'Le questionnaire commence à la question 1');
  });

  test('Inclusion : textes des indicateurs sans masculin générique (D-19)', function () {
    App.data.indicators.forEach(function (ind) {
      ind.levels.forEach(function (l) {
        assert(!/vos joueurs|Curieux|Explorateur/.test(l.libelle + ' ' + l.texte), ind.key + ' : ' + l.libelle);
      });
    });
  });

  test('Sécurité : aucun style ni script écrit dans le HTML des pages (CSP stricte)', function () {
    allPages(newRecord()).forEach(function (page, i) {
      assert(!/\sstyle=/.test(page), 'Attribut style dans la page ' + i);
      assert(!/\son[a-z]+=/.test(page), 'Gestionnaire onclick… dans la page ' + i);
      assert(page.indexOf('<script') < 0, 'Script dans la page ' + i);
    });
  });

  test('Sources et méthode : 11 sources, la méthode et les limites', function () {
    var out = App.views.methode().toString();
    var sourcesHtml = (out.match(/<ul class="sources">[\s\S]*?<\/ul>/g) || []).join('');
    assertEqual((sourcesHtml.match(/<li>/g) || []).length, 11, '11 sources');
    assertEqual((out.match(/<h3>/g) || []).length, 3, '3 groupes de sources par sujet');
    assert(out.indexOf('Les limites') >= 0 && out.indexOf('La méthode') >= 0);
    assert(out.indexOf('dimensions') < 0, 'Plus de mention des dimensions supprimées');
  });

  /* ---------- Navigation ---------- */

  test('Navigation : adresses reconnues et adresse inconnue → accueil', function () {
    assertEqual(App.router.parse('#quiz'), 'quiz');
    assertEqual(App.router.parse('#room'), 'room');
    assertEqual(App.router.parse('#methode'), 'methode');
    assertEqual(App.router.parse('#/result'), 'result');
    assertEqual(App.router.parse('#nimporte-quoi'), 'home');
    assertEqual(App.router.parse(''), 'home');
  });
})(window.App);
