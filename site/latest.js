/* TigerTag+ Burning Factory — the latest release, shared by the download page
   (dl.js) and the permanent per-system links (download/<system>/, redirect.js).
   The installers carry their version in the file name
   (TigerTagPlus-Burning-Factory-2.8.0-win-x64-setup.exe), so no fixed URL can
   point at "the latest Windows installer": it is resolved here from the latest
   published release, asked from GitHub. Drafts and pre-releases are never
   returned by /releases/latest. */
(function () {
  var REPO = 'TigerTag-Project/TigerTagPlus-Burning-Factory-Releases';
  var PAGE = 'https://tigertag-project.github.io/TigerTagPlus-Burning-Factory-Releases/';
  var FILES = {
    win: { name: 'Windows', slug: 'windows', suffix: '-win-x64-setup.exe' },
    mac: { name: 'macOS', slug: 'macos', suffix: '-mac-universal.dmg' },
    linux: { name: 'Linux', slug: 'linux', suffix: '-linux-x86_64.AppImage' }
  };
  var pending = null;

  /* The latest release (GitHub's JSON), fetched once per page. */
  function get() {
    if (!pending) {
      pending = fetch('https://api.github.com/repos/' + REPO + '/releases/latest', { headers: { Accept: 'application/vnd.github+json' } })
        .then(function (r) { if (!r.ok) throw new Error('GitHub ' + r.status); return r.json(); });
    }
    return pending;
  }

  function version(rel) { return String((rel && rel.tag_name) || '').replace(/^v/, ''); }

  /* The installer of `key` in `rel` — { name, url, size } — or null when the release lacks it. */
  function asset(rel, key) {
    var want = 'TigerTagPlus-Burning-Factory-' + version(rel) + FILES[key].suffix;
    var list = (rel && rel.assets) || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].name === want) return { name: want, url: list[i].browser_download_url, size: list[i].size };
    }
    return null;
  }

  window.TTBF_LATEST = {
    REPO: REPO,
    FILES: FILES,
    RELEASE_PAGE: 'https://github.com/' + REPO + '/releases/latest',
    /* Permanent link of a system: always downloads its latest installer. */
    permalink: function (key) { return PAGE + 'download/' + FILES[key].slug + '/'; },
    get: get,
    version: version,
    asset: asset
  };
})();
