/* TigerTag+ Burning Factory — download logic.
   The installers have stable "latest" links (version-less file names), so the
   buttons work without JavaScript. This script only (1) puts the visitor's
   system on the big button and lists the two others, and (2) shows the latest
   version and its date, asked from GitHub (offline: left as is). */
(function () {
  var REPO = 'TigerTag-Project/TigerTagPlus-Burning-Factory-Releases';
  var BASE = 'https://github.com/' + REPO + '/releases/latest/download/';
  var FILES = {
    win: { name: 'Windows', file: 'TigerTagPlus-Burning-Factory-win-x64-setup.exe' },
    mac: { name: 'macOS', file: 'TigerTagPlus-Burning-Factory-mac-universal.dmg' },
    linux: { name: 'Linux', file: 'TigerTagPlus-Burning-Factory-linux-x86_64.AppImage' }
  };
  var I = window.TTBF_I18N;
  var $ = function (id) { return document.getElementById(id); };
  var rel = null;

  function detect() {
    var ua = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || navigator.userAgent || '';
    ua = String(ua).toLowerCase();
    if (ua.indexOf('mac') !== -1 || ua.indexOf('iphone') !== -1 || ua.indexOf('ipad') !== -1) return 'mac';
    if (ua.indexOf('win') !== -1) return 'win';
    if (ua.indexOf('linux') !== -1 || ua.indexOf('x11') !== -1) return 'linux';
    return null;
  }
  var os = detect();

  function render() {
    var main = $('dlMain'), label = $('dlMainLabel');
    if (os && main && label) {
      main.href = BASE + FILES[os].file;
      label.removeAttribute('data-i18n');   // live text: i18n.js must not overwrite it
      label.textContent = I.t('dl.for', { os: FILES[os].name });
      var links = document.querySelectorAll('.dl-os');
      for (var i = 0; i < links.length; i++) links[i].hidden = links[i].getAttribute('data-os') === os;
    }
    if (rel) {
      $('ver').textContent = String(rel.tag_name || '').replace(/^v/, '');
      try { $('date').textContent = new Date(rel.published_at).toLocaleDateString(I.locale(), { year: 'numeric', month: 'long', day: 'numeric' }); } catch (e) {}
    }
  }
  document.addEventListener('ttbf:lang', render);
  document.addEventListener('DOMContentLoaded', render);

  fetch('https://api.github.com/repos/' + REPO + '/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (data) { rel = data; render(); })
    .catch(function () { var d = $('date'); if (d) d.hidden = true; var v = $('ver'); if (v && v.textContent === '…') v.textContent = 'latest'; });
})();
