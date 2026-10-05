/**
 * Stockage des résultats.
 *
 * - `App.storage.loadResult / saveResult` : le dernier portrait de l'appareil.
 * - `App.storage.roomStore` : les résultats anonymes de « La salle ».
 *
 * `roomStore` expose une interface asynchrone ({ list, add }) pour pouvoir
 * être remplacé par une base de données partagée sans toucher au reste du site.
 *
 * Aucune donnée personnelle n'est enregistrée. La salle ne garde que le résultat
 * calculé et l'horodatage (référentiel, « regles.enregistrement_vue_salle »).
 *
 * Toutes les données lues sont validées : une donnée corrompue ou obsolète
 * est ignorée au lieu de faire planter la page.
 */
(function (App) {
  'use strict';

  var SCHEMA_VERSION = 2;
  var KEYS = {
    result: 'fft-profils:v2:result',
    room: 'fft-profils:v2:room'
  };
  // Clés des versions précédentes (axes v2, choix du genre, première version).
  // Ces résultats ne peuvent pas être convertis en indicateurs v3 : ils sont effacés.
  var OBSOLETE_KEYS = ['fft-mobile-r', 'fft-mobile-room', 'fft-profils:v1:result', 'fft-profils:v1:room'];
  var MAX_ROOM_ENTRIES = 5000;
  var INDICATOR_KEYS = ['gestion', 'essai', 'gain'];

  /* ---------- Accès sûr à localStorage ---------- */

  function readJson(key) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw == null ? null : JSON.parse(raw);
    } catch (e) {
      return null; // stockage indisponible (navigation privée) ou JSON invalide
    }
  }

  function writeJson(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false; // quota dépassé ou stockage bloqué : le site continue sans
    }
  }

  function removeKey(key) {
    try { window.localStorage.removeItem(key); } catch (e) { /* ignoré */ }
  }

  /* ---------- Validation ---------- */

  function isKnownProfile(id) {
    return typeof id === 'string' && !!App.data.getProfile(id);
  }

  function isPercent(n) {
    return Number.isInteger(n) && n >= 0 && n <= 100;
  }

  function hasValidCore(r) {
    return !!r && typeof r === 'object' &&
      typeof r.id === 'string' &&
      isKnownProfile(r.profile) &&
      isKnownProfile(r.secondary) &&
      !!r.indicators && INDICATOR_KEYS.every(function (k) { return isPercent(r.indicators[k]); }) &&
      Number.isInteger(r.iaLevel) && r.iaLevel >= 0 && r.iaLevel < App.data.iaLevels.length;
  }

  var isValidResult = hasValidCore;
  var isValidRoomEntry = hasValidCore;

  function removeObsoleteData() {
    OBSOLETE_KEYS.forEach(removeKey);
  }

  /* ---------- Utilitaires ---------- */

  /** Identifiant aléatoire du résultat (pas de la personne) : évite de compter deux fois un résultat. */
  function createId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return window.crypto.randomUUID();
    }
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  /** Ne garde que les champs anonymes utiles à « La salle ». */
  function toRoomEntry(r) {
    return {
      id: r.id,
      createdAt: r.createdAt,
      profile: r.profile,
      secondary: r.secondary,
      indicators: {
        gestion: r.indicators.gestion,
        essai: r.indicators.essai,
        gain: r.indicators.gain
      },
      iaLevel: r.iaLevel
    };
  }

  /* ---------- Dernier portrait ---------- */

  /** Enrichit un résultat calculé (id, date, version) avant sauvegarde. */
  function createRecord(computed) {
    return Object.assign({ version: SCHEMA_VERSION, id: createId(), createdAt: new Date().toISOString() }, computed);
  }

  function loadResult() {
    var r = readJson(KEYS.result);
    return isValidResult(r) ? r : null;
  }

  function saveResult(record) {
    return writeJson(KEYS.result, record);
  }

  /* ---------- « La salle » : stockage local à l'appareil ---------- */

  var localRoomStore = {
    /** Indique que les résultats ne viennent que de cet appareil. */
    isShared: false,

    /** @returns {Promise<Array>} */
    list: function () {
      var rows = readJson(KEYS.room);
      return Promise.resolve(Array.isArray(rows) ? rows.filter(isValidRoomEntry) : []);
    },

    /**
     * Ajoute un résultat. Un même résultat (même id) n'est jamais compté deux fois.
     * @returns {Promise<void>}
     */
    add: function (record) {
      return this.list().then(function (rows) {
        if (rows.some(function (row) { return row.id === record.id; })) return;
        rows.push(toRoomEntry(record));
        writeJson(KEYS.room, rows.slice(-MAX_ROOM_ENTRIES));
      });
    }
  };

  removeObsoleteData();

  App.storage = {
    createRecord: createRecord,
    loadResult: loadResult,
    saveResult: saveResult,
    roomStore: localRoomStore,
    // exposés pour les tests
    _internal: {
      KEYS: KEYS,
      OBSOLETE_KEYS: OBSOLETE_KEYS,
      isValidResult: isValidResult,
      isValidRoomEntry: isValidRoomEntry,
      removeObsoleteData: removeObsoleteData
    }
  };
})(window.App = window.App || {});
