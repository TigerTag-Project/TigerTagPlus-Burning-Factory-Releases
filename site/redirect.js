/* TigerTag+ Burning Factory — permanent link of one system (download/<system>/).
   A factory bookmarks this page once; every visit downloads the latest
   installer of that system (resolved by latest.js) and says which version.
   GitHub unreachable or the installer missing: the latest release page opens. */
(function () {
  var L = window.TTBF_LATEST;
  var I = window.TTBF_I18N;
  var key = document.body.getAttribute('data-os');
  var $ = function (id) { return document.getElementById(id); };
  var target = null;   // { ver, url } once known

  function render() {
    var title = $('rTitle'), msg = $('rMsg');
    if (!target) { title.textContent = I.t('redir.wait'); msg.innerHTML = ''; return; }
    if (!target.ver) { title.textContent = I.t('redir.fail'); msg.innerHTML = ''; return; }
    title.textContent = I.t('redir.going', { ver: target.ver, os: L.FILES[key].name });
    msg.innerHTML = I.t('redir.manual', { url: target.url });
  }
  document.addEventListener('ttbf:lang', render);

  function go(next) {
    target = next;
    render();
    location.replace(next.url);
  }

  L.get()
    .then(function (rel) {
      var a = L.asset(rel, key);
      go(a ? { ver: L.version(rel), url: a.url } : { ver: null, url: L.RELEASE_PAGE });
    })
    .catch(function () { go({ ver: null, url: L.RELEASE_PAGE }); });
})();
