/**
 * Navigation par l'adresse (#home, #quiz, #result, #room).
 *
 * Gère les boutons précédent / suivant du navigateur et les liens partagés.
 * Une adresse inconnue renvoie vers l'accueil.
 */
(function (App) {
  'use strict';

  var ROUTES = Object.freeze(['home', 'quiz', 'result', 'room']);
  var DEFAULT_ROUTE = 'home';

  function parse(hash) {
    var name = String(hash || '').replace(/^#\/?/, '');
    return ROUTES.indexOf(name) >= 0 ? name : DEFAULT_ROUTE;
  }

  /**
   * @param {function(string, {initial: boolean}):void} onChange appelé à chaque changement de page
   */
  function start(onChange) {
    function handle(initial) {
      var route = parse(window.location.hash);
      // Corrige une adresse inconnue sans ajouter d'entrée dans l'historique.
      if (window.location.hash !== '#' + route) {
        history.replaceState(null, '', '#' + route);
      }
      onChange(route, { initial: initial });
    }
    window.addEventListener('hashchange', function () { handle(false); });
    handle(true);
  }

  /** Va vers une page. Si on y est déjà, la page est simplement réaffichée. */
  function navigate(route, onSameRoute) {
    route = parse(route);
    if (window.location.hash === '#' + route) {
      if (onSameRoute) onSameRoute(route);
    } else {
      window.location.hash = route;
    }
  }

  App.router = { ROUTES: ROUTES, parse: parse, start: start, navigate: navigate };
})(window.App = window.App || {});
