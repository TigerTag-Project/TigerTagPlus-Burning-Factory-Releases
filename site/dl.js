/* TigerTag+ Burning Factory — download logic.
   The installers carry their version in the file name
   (TigerTagPlus-Burning-Factory-2.7.0-mac-universal.dmg), so the links are
   resolved from the latest release, asked from GitHub. Without JavaScript or
   offline, every button opens the latest release page. This script also puts
   the visitor's system on the big button and lists the two others. */
(function () {
  var REPO = 'TigerTag-Project/TigerTagPlus-Burning-Factory-Releases';
  var LATEST = 'https://github.com/' + REPO + '/releases/latest';
  var FILES = {
    win: { name: 'Windows', suffix: '-win-x64-setup.exe' },
    mac: { name: 'macOS', suffix: '-mac-universal.dmg' },
    linux: { name: 'Linux', suffix: '-linux-x86_64.AppImage' }
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

  /* Download URL of the versioned installer of `key` in the latest release
     (TigerTagPlus-Burning-Factory-<version><suffix>); the release page if absent. */
  function url(key) {
    if (!rel) return LATEST;
    var ver = String(rel.tag_name || '').replace(/^v/, '');
    var want = 'TigerTagPlus-Burning-Factory-' + ver + FILES[key].suffix;
    var assets = rel.assets || [];
    for (var i = 0; i < assets.length; i++) if (assets[i].name === want) return assets[i].browser_download_url;
    return LATEST;
  }

  function render() {
    var main = $('dlMain'), label = $('dlMainLabel');
    var others = document.querySelectorAll('.dl-os');
    for (var j = 0; j < others.length; j++) others[j].href = url(others[j].getAttribute('data-os'));
    if (os && main && label) {
      main.href = url(os);
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
