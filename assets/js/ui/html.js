/**
 * Gabarits HTML sûrs.
 *
 * Utilisation : html`<p>${texte}</p>`
 * Toute valeur insérée est échappée, sauf si elle provient elle-même de html``
 * (ou de raw()). Les tableaux sont concaténés, null/undefined/false ignorés.
 */
(function (App) {
  'use strict';

  var ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (c) { return ESCAPES[c]; });
  }

  /** Fragment HTML déjà sûr. */
  function SafeHtml(value) { this.value = value; }
  SafeHtml.prototype.toString = function () { return this.value; };

  function stringify(value) {
    if (value == null || value === false) return '';
    if (value instanceof SafeHtml) return value.value;
    if (Array.isArray(value)) return value.map(stringify).join('');
    return escapeHtml(value);
  }

  function html(strings) {
    var out = strings[0];
    for (var i = 1; i < strings.length; i++) {
      out += stringify(arguments[i]) + strings[i];
    }
    return new SafeHtml(out);
  }

  /** Marque une chaîne comme sûre. À réserver à du contenu de confiance. */
  function raw(value) { return new SafeHtml(String(value)); }

  App.ui = App.ui || {};
  App.ui.html = html;
  App.ui.raw = raw;
  App.ui.escapeHtml = escapeHtml;
})(window.App = window.App || {});
