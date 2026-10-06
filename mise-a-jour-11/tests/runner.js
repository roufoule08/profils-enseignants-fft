/**
 * Mini-lanceur de tests, sans dépendance.
 *   test('nom', function () { ... })          test synchrone
 *   test('nom', function () { return promise }) test asynchrone
 *   assert(cond, message), assertEqual(actual, expected, message)
 */
(function () {
  'use strict';

  var tests = [];

  window.test = function (name, fn) { tests.push({ name: name, fn: fn }); };

  window.assert = function (condition, message) {
    if (!condition) throw new Error(message || 'Assertion échouée');
  };

  window.assertEqual = function (actual, expected, message) {
    var a = JSON.stringify(actual);
    var e = JSON.stringify(expected);
    if (a !== e) {
      throw new Error((message ? message + '\n' : '') + 'Obtenu :  ' + a + '\nAttendu : ' + e);
    }
  };

  function report(name, error) {
    var li = document.createElement('li');
    li.className = error ? 'fail' : 'pass';
    li.textContent = name;
    if (error) {
      var pre = document.createElement('pre');
      pre.textContent = error.message || String(error);
      li.appendChild(pre);
    }
    document.getElementById('results').appendChild(li);
  }

  window.addEventListener('load', function () {
    var failed = 0;
    tests.reduce(function (chain, t) {
      return chain.then(function () {
        return Promise.resolve().then(t.fn).then(
          function () { report(t.name); },
          function (err) { failed++; report(t.name, err); }
        );
      });
    }, Promise.resolve()).then(function () {
      var summary = document.getElementById('summary');
      summary.className = failed ? 'ko' : 'ok';
      summary.textContent = failed
        ? failed + ' test(s) en échec sur ' + tests.length
        : 'Les ' + tests.length + ' tests passent.';
      document.title = (failed ? '✘ ' : '✔ ') + document.title;
    });
  });
})();
