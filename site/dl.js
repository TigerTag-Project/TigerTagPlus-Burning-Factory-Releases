/* TigerTag+ Burning Factory — download logic.
   The latest release comes from latest.js. This script puts the visitor's
   system on the big button, lists the two others, and fills the three
   platform cards (version, size, file name, direct link). Without JavaScript
   or offline, the hero buttons open the latest release page and each card's
   button its permanent link (download/<system>/). */
(function () {
  var L = window.TTBF_LATEST;
  var FILES = L.FILES;
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

  /* Direct download URL of the latest installer of `key`; the release page if absent. */
  function url(key) {
    var a = rel && L.asset(rel, key);
    return a ? a.url : L.RELEASE_PAGE;
  }

  function size(bytes) {
    try { return new Intl.NumberFormat(I.locale(), { maximumFractionDigits: 0 }).format(bytes / 1048576) + ' MB'; }
    catch (e) { return Math.round(bytes / 1048576) + ' MB'; }
  }

  /* The three platform cards: filled from the release, the visitor's system first. */
  function renderCards() {
    var cards = document.querySelectorAll('.platform');
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i], key = card.getAttribute('data-os');
      var a = rel && L.asset(rel, key);
      card.classList.toggle('is-mine', key === os);
      card.querySelector('.p-link input').value = L.permalink(key);
      if (!rel) continue;
      card.querySelector('.p-ver').textContent = L.version(rel);
      card.querySelector('.p-size').textContent = a ? size(a.size) : '—';
      card.querySelector('.p-file').textContent = a ? a.name : '';
      card.querySelector('.p-dl').href = a ? a.url : L.RELEASE_PAGE;
    }
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
      $('ver').textContent = L.version(rel);
      try { $('date').textContent = new Date(rel.published_at).toLocaleDateString(I.locale(), { year: 'numeric', month: 'long', day: 'numeric' }); } catch (e) {}
    }
    renderCards();
  }

  /* « Copy » next to each permanent link. */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.p-copy');
    if (!btn) return;
    var input = btn.parentNode.querySelector('input');
    var done = function () {
      btn.textContent = I.t('all.copied');
      setTimeout(function () { btn.textContent = I.t('all.copy'); }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(input.value).then(done, function () { input.select(); });
    else { input.select(); try { document.execCommand('copy'); done(); } catch (err) {} }
  });

  document.addEventListener('ttbf:lang', render);
  document.addEventListener('DOMContentLoaded', render);

  L.get()
    .then(function (data) { rel = data; render(); })
    .catch(function () {
      var d = $('date'); if (d) d.hidden = true;
      var v = $('ver'); if (v && v.textContent === '…') v.textContent = 'latest';
      var vs = document.querySelectorAll('.p-ver');
      for (var i = 0; i < vs.length; i++) vs[i].textContent = 'latest';
    });
})();
