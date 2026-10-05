/**
 * Stockage des résultats.
 *
 * - `App.storage.loadResult / saveResult` : le dernier portrait de l'appareil.
 * - `App.storage.roomStore` : les résultats anonymes de « La salle ».
 *
 * `roomStore` expose une interface asynchrone ({ list, add }) pour pouvoir
 * être remplacé par une base de données partagée sans toucher au reste du site.
 *
 * Toutes les données lues sont validées : une donnée corrompue ou obsolète
 * est ignorée au lieu de faire planter la page.
 */
(function (App) {
  'use strict';

  var SCHEMA_VERSION = 1;
  var KEYS = {
    result: 'fft-profils:v1:result',
    room: 'fft-profils:v1:room'
  };
  // Clés de la première version du site, reprises une seule fois.
  var LEGACY_KEYS = { result: 'fft-mobile-r', room: 'fft-mobile-room' };
  var LEGACY_PROFILE_IDS = {
    P: 'passeur', C: 'coach', B: 'batisseur', E: 'entrepreneur', J: 'jeune-pro', S: 'sage'
  };
  var MAX_ROOM_ENTRIES = 5000;

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
      isKnownProfile(r.profile) &&
      isKnownProfile(r.secondary) &&
      !!r.axes && App.data.axes.every(function (a) { return isPercent(r.axes[a.key]); }) &&
      Number.isInteger(r.iaLevel) && r.iaLevel >= 0 && r.iaLevel < App.data.iaLevels.length;
  }

  function isValidResult(r) {
    return hasValidCore(r) && typeof r.id === 'string' && typeof r.code === 'string';
  }

  function isValidRoomEntry(e) {
    return hasValidCore(e) && typeof e.id === 'string';
  }

  /* ---------- Reprise des données de l'ancienne version ---------- */

  function fromLegacy(old) {
    if (!old || typeof old !== 'object') return null;
    return {
      version: SCHEMA_VERSION,
      id: createId(),
      createdAt: null,
      profile: LEGACY_PROFILE_IDS[old.profile],
      secondary: LEGACY_PROFILE_IDS[old.second],
      axes: { terrainClub: old.t, reperesExploration: old.x, groupeIndividuel: old.g },
      code: typeof old.code === 'string' ? old.code : '',
      iaLevel: old.ia
    };
  }

  function migrateLegacyData() {
    var oldResult = readJson(LEGACY_KEYS.result);
    if (oldResult && readJson(KEYS.result) == null) {
      var r = fromLegacy(oldResult);
      if (r && r.code && isValidResult(r)) writeJson(KEYS.result, r);
    }
    var oldRoom = readJson(LEGACY_KEYS.room);
    if (Array.isArray(oldRoom) && readJson(KEYS.room) == null) {
      writeJson(KEYS.room, oldRoom.map(fromLegacy).filter(isValidRoomEntry).map(toRoomEntry));
    }
    removeKey(LEGACY_KEYS.result);
    removeKey(LEGACY_KEYS.room);
  }

  /* ---------- Utilitaires ---------- */

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
      axes: {
        terrainClub: r.axes.terrainClub,
        reperesExploration: r.axes.reperesExploration,
        groupeIndividuel: r.axes.groupeIndividuel
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

  migrateLegacyData();

  App.storage = {
    createRecord: createRecord,
    loadResult: loadResult,
    saveResult: saveResult,
    roomStore: localRoomStore,
    // exposés pour les tests
    _internal: {
      KEYS: KEYS,
      LEGACY_KEYS: LEGACY_KEYS,
      isValidResult: isValidResult,
      isValidRoomEntry: isValidRoomEntry,
      fromLegacy: fromLegacy,
      migrateLegacyData: migrateLegacyData
    }
  };
})(window.App = window.App || {});
